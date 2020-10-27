package com.example.model;

public class Score {
    private String examinerName;
    private double score;

    public String getExaminerName() {
        return examinerName;
    }

    public void setExaminerName(String examinerName) {
        this.examinerName = examinerName;
    }

    @Override
    public String toString() {
        return "Score{" +
                "examinerName='" + examinerName + '\'' +
                ", score=" + score +
                '}';
    }

    public double getScore() {
        return score;
    }

    public void setScore(double score) {
        this.score = score;
    }
}
