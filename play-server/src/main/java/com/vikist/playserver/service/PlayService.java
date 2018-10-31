package com.vikist.playserver.service;

import com.vikist.playserver.model.AsyncJob;
import com.vikist.playserver.model.Greeting;

public interface PlayService {

  public void publishEvent(Greeting greeting);

  void publishJobFinishedEvent(AsyncJob jobId);
}
