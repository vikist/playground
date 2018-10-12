package com.vikist.playserver;

import com.vikist.playserver.model.Greeting;
import com.vikist.playserver.repository.GreetingRepository;
import com.vikist.playserver.service.FileService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@CrossOrigin
@Controller
public class PlayController {

  @Autowired
  private GreetingRepository greetingRepository;

  @Autowired
  private FileService fileService;

  @GetMapping("/greet")
  @ResponseBody
  public Greeting sayHello(@RequestParam(name = "name", required = false , defaultValue = "Stranger") String name) {
    return greetingRepository.save(new Greeting(name));
  }

  @GetMapping("/list")
  @ResponseBody
  public List<Greeting> getGreetings(@RequestParam(name = "name", required = false , defaultValue = "Stranger") String name) {
    return greetingRepository.findAll();
  }

  @PostMapping("/upload")
  @ResponseBody
  public void upload(@RequestParam(name = "path", required = true) String path) {
    fileService.upload(path);
  }
}
