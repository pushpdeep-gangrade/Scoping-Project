package com.example.model;

public class Scores {
    private String teamname;
    private double score;

    public Scores(String teamname, double score) {
        this.teamname = teamname;
        this.score = score;
    }

    public String getTeamname() {
        return teamname;
    }

    public void setTeamname(String teamname) {
        this.teamname = teamname;
    }

    public double getScore() {
        return score;
    }

    public void setScore(double score) {
        this.score = score;
    }
}
