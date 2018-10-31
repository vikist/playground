package com.vikist.playserver.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class DefaultComputeService implements ComputeService {

  @Override
  public long startWorkingSync(int threads, long iterations) {
    long start = System.currentTimeMillis();
    List<Thread> allThreads = new ArrayList<>(threads);
    long workForEachThread = iterations / threads;
    for (int i = 0; i < threads; i++) {
      Thread thread = new Thread(new WorkerThread("Thread: " + i, workForEachThread));
      thread.start();
      allThreads.add(thread);
    }

    for (Thread runningThread : allThreads) {
      try {
        runningThread.join();
      } catch (InterruptedException e) {
        e.printStackTrace();
      }
    }
    long durrationInMs = System.currentTimeMillis() - start;
    return durrationInMs;
  }

  @Override
  @Async
  public CompletableFuture<String> startAsyncJob(String jobId, long iterations) {
    System.out.println("Start async job");
    long counter = 0;
    while (counter < iterations) {
      counter += 1;
    }
    return CompletableFuture.completedFuture(jobId);
  }
}
