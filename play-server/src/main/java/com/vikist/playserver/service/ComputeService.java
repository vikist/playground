package com.vikist.playserver.service;

import java.util.concurrent.CompletableFuture;

public interface ComputeService {

  public long startWorkingSync(int threads, long iterations);

  public CompletableFuture<String> startAsyncJob(String jobId, long iterations);
}
