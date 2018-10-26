package com.vikist.playserver.service;

public class WorkerThread implements Runnable{

  private Thread t;
  private final long workToDo;
  private final String threadName;

  public WorkerThread(String threadName, long workToDo) {
    this.threadName = threadName;
    this.workToDo = workToDo;
  }

  @Override
  public void run() {
    long counter = 0;
    while (counter < this.workToDo) {
      counter += 1;
    }
  }
}
