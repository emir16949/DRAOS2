package com.eventpage.Security;

public interface Constants {

  long ACCESS_TOKEN_VALIDITY_SECONDS = 5 * 60 * 60; // 5 hours
  String SIGNING_KEY = "EventPageBestApp";
  String TOKEN_PREFIX = "Bearer ";
  String HEADER_STRING = "Authorization";
}
