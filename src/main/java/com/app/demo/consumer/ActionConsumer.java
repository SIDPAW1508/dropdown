package com.app.demo.consumer;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;
import com.app.demo.service.*;
import com.app.demo.dto.*;
@Service
public class ActionConsumer {

    private final ActionService actionService;

    public ActionConsumer(ActionService actionService) {
        this.actionService = actionService;
    }

    @KafkaListener(
        topics = "dropdown-events",
        groupId = "dropdown-group"
    )
    public void consume(ActionEvent event) {

        switch(event.getActionType()) {
            case "INSERT_TABLE1":
                actionService.insertIntoTable1();
                break;
            case "UPDATE_TABLE2":
                actionService.updateTable2();
                break;
            case "DELETE_TABLE3":
                actionService.deleteLastRowTable3();
                break;
        }
    }
}