package com.app.demo.controller;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.demo.dto.ActionEvent;
import com.app.demo.producer.ActionProducer;

@RestController
@RequestMapping("/actions")
public class ActionController {

    private final ActionProducer producer;

    public ActionController(ActionProducer producer) {
        this.producer = producer;
    }

    @PostMapping("/{option}")
    public String executeAction(@PathVariable Integer option) {

        switch(option) {

            case 1:
                producer.sendEvent(
                    new ActionEvent("INSERT_TABLE1")
                );
                break;

            case 2:
                producer.sendEvent(
                    new ActionEvent("UPDATE_TABLE2")
                );
                break;

            case 3:
                producer.sendEvent(
                    new ActionEvent("DELETE_TABLE3")
                );
                break;

            default:
                return "Invalid option";
        }

        return "Event Published";
    }
}