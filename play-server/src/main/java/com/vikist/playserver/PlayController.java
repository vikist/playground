package com.vikist.playserver;

import com.vikist.playserver.model.AsyncJob;
import com.vikist.playserver.model.Greeting;
import com.vikist.playserver.repository.GreetingRepository;
import com.vikist.playserver.service.ComputeService;
import com.vikist.playserver.service.FileService;
import com.vikist.playserver.service.PlayService;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ConcurrentHashMap;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import sun.security.krb5.Asn1Exception;

@Configuration
@EnableScheduling
@CrossOrigin
@Controller
public class PlayController {

  private final List<SseEmitter> emitters = new ArrayList<>();
  Map<String, CompletableFuture> runningJobs = new ConcurrentHashMap();

  @Autowired
  private GreetingRepository greetingRepository;

  @Autowired
  private FileService fileService;

  @Autowired
  private ComputeService computeService;

  @Autowired
  private PlayService playService;

  @GetMapping("/greet")
  @ResponseBody
  public Greeting sayHello(
      @RequestParam(name = "name", required = false, defaultValue = "Stranger") String name) {
    Greeting greeting = greetingRepository.save(new Greeting(name));
    playService.publishEvent(greeting);
    return greeting;
  }

  @GetMapping("/list")
  @ResponseBody
  public List<Greeting> getGreetings() {
    return greetingRepository.findAll();
  }

  @PostMapping("/upload")
  @ResponseBody
  public void upload(@RequestParam(name = "path", required = true) String path) {
    fileService.upload(path);
  }

  @GetMapping("work")
  @ResponseBody
  public long work(@RequestParam(name = "threads", required = true) int threads,
      @RequestParam(name = "workload", required = true) long workload) {
    return computeService.startWorkingSync(threads, workload);
  }

  @GetMapping("workAsync")
  @ResponseBody
  public AsyncJob workAsync(@RequestParam(name = "workload", required = true) long workload) {
    System.out.println("Work async request");
    String jobId = RandomStringUtils.randomAlphabetic(8);
    CompletableFuture<String> completableFuture = computeService
        .startAsyncJob(jobId, workload);
    this.runningJobs.put(jobId, completableFuture);
    System.out.println("Work async response: " + jobId);
    return new AsyncJob(jobId);
  }

  @GetMapping("register")
  public SseEmitter register() {
    SseEmitter emitter = new SseEmitter();
    this.emitters.add(emitter);

    emitter.onCompletion(() -> this.emitters.remove(emitter));
    emitter.onTimeout(() -> this.emitters.remove(emitter));

    return emitter;
  }

  @EventListener
  public void onGreetingEvent(Greeting greeting) {
    List<SseEmitter> deadEmitters = new ArrayList<>();
    this.emitters.forEach(emitter -> {
      try {
        emitter.send(greeting);
      } catch (Exception e) {
        deadEmitters.add(emitter);
      }
    });

    this.emitters.removeAll(deadEmitters);
  }

  @EventListener
  public void onFinishedJob(AsyncJob job) {
    List<SseEmitter> deadEmitters = new ArrayList<>();
    this.emitters.forEach(emitter -> {
      try {
        emitter.send(job);
      } catch (Exception e) {
        deadEmitters.add(emitter);
      }
    });

    this.emitters.removeAll(deadEmitters);
  }

  @Scheduled(fixedRate = 5000, initialDelay = 5000)
  public void checkForJobs() {
    System.out.println("Start checking jobs");
    List<String> finishedJobs = new ArrayList<>();
    for (Map.Entry<String, CompletableFuture> entry : this.runningJobs.entrySet()) {
      if (entry.getValue().isDone()) {
        this.playService.publishJobFinishedEvent(new AsyncJob(entry.getKey()));
        finishedJobs.add(entry.getKey());
      }
    }
    for (String job : finishedJobs) {
      System.out.println("remove finished job: " + job);
      this.runningJobs.remove(job);
    }
  }
}
