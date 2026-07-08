package com.app.demo.dto;

public class ActionEvent {

    private String actionType;

    public ActionEvent() {}

    public ActionEvent(String actionType) {
        this.actionType = actionType;
    }

    public String getActionType() {
        return actionType;
    }

    public void setActionType(String actionType) {
        this.actionType = actionType;
    }
}
