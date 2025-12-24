package com.powercalc;

import java.util.HashMap;
import java.util.Map;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class PowerCalcApplication {

  public static void main(String[] args) {
    SpringApplication app = new SpringApplication(PowerCalcApplication.class);
    Map<String, Object> props = new HashMap<>();
    // set default port (overridable by application.properties or CLI)
    props.put("server.port", "8081");
    app.setDefaultProperties(props);
    app.run(args);
    System.out.println("Application started at http://localhost:8081");
  }

}