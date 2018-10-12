package com.vikist.playserver.service;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.io.File;

@Service
public class AWSFileService implements FileService {

  @Value("${play.s3.bucket.name}")
  private String bucket_name;

  @Override
  public void upload(String file_path) {
    final AmazonS3 s3 = AmazonS3ClientBuilder.defaultClient();
    try {
      s3.putObject(bucket_name, RandomStringUtils.randomAlphabetic(10), new File(file_path));
    } catch (AmazonServiceException e) {
      System.err.println(e.getErrorMessage());
      System.exit(1);
    }
  }
}
