package com.example.model;

import java.util.ArrayList;

public class Teams {
    private String teamId;
    private String name;
    private ArrayList<Score> scores;

    public ArrayList<Score> getScores() {
        return scores;
    }

    public void setScores(ArrayList<Score> scores) {
        this.scores = scores;
    }

    public String getTeamId() {
        return teamId;
    }

    public void setTeamId(String teamId) {
        this.teamId = teamId;
    }

    @Override
    public String toString() {
        return "Teams{" +
                "teamId='" + teamId + '\'' +
                ", name='" + name + '\'' +
                ", scores=" + scores +
                '}';
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


}
