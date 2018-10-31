package com.vikist.playserver.service;

import com.vikist.playserver.model.AsyncJob;
import com.vikist.playserver.model.Greeting;
import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
public class DefaultPlayService implements PlayService {

  public final ApplicationEventPublisher eventPublisher;

  public DefaultPlayService(ApplicationEventPublisher eventPublisher) {
    this.eventPublisher = eventPublisher;
  }

  @Override
  public void publishEvent(Greeting greeting) {
    this.eventPublisher
        .publishEvent(greeting);
  }

  @Override
  public void publishJobFinishedEvent(AsyncJob job) {
    System.out.println("Publish finished job");
    this.eventPublisher
        .publishEvent(job);
  }
}
