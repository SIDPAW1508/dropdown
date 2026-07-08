package com.app.demo.producer;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class ActionProducer {

    private final KafkaTemplate<String, String> kafkaTemplate;

    public ActionProducer(KafkaTemplate<String, String> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void sendEvent(String message) {
        kafkaTemplate.send("dropdown-events", message);
    }
}