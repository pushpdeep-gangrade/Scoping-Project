package com.example.api;

import com.example.model.Examiner;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Header;

public interface GetDataService {


    @GET("/v1/examiner")
    Call<List<Examiner>> getExaminer(@Header("authorizationkey") String auth);
}
