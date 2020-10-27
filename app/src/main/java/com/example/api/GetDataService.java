package com.example.api;

import com.example.model.Examiner;
import com.example.model.Scores;
import com.example.model.Teams;

import java.util.List;
import java.util.Map;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.Header;
import retrofit2.http.HeaderMap;
import retrofit2.http.POST;

public interface GetDataService {


    @GET("/v1/examiner")
    Call<List<Examiner>> getExaminer(@Header("authorizationkey") String auth);

    @GET("v1/teams")
    Call<List<Teams>> getTeams(@Header("authorizationkey") String auth);

    @POST("/v1/examiner/login/qr")
    Call<Examiner> exmainerQRLogin(@Header("authorizationkey") String auth);

    @POST("/v1/teams/update/scores")
    Call<String> postScores(@Header("authorizationkey") String auth, @Body Scores score);

    @GET("/v1/teams/qr")
    Call<String> getTeam(@HeaderMap Map<String, String> headers);

}
