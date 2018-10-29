package com.vikist.playserver.service;

import com.vikist.playserver.model.Greeting;

public interface PlayService {

  public void publishEvent(Greeting greeting);
}
