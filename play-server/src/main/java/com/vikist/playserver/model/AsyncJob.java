package com.vikist.playserver.model;

public class AsyncJob {

  public AsyncJob(String jobId) {
    this.jobId = jobId;
  }

  public String getJobId() {
    return jobId;
  }

  public void setJobId(String jobId) {
    this.jobId = jobId;
  }

  public String jobId;

  @Override
  public String toString() {
    return "AsyncJob{" +
        "jobId='" + jobId + '\'' +
        '}';
  }
}
