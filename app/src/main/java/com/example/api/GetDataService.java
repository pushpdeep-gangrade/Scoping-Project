package com.example.api;

import com.example.model.Examiner;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Header;
import retrofit2.http.POST;

public interface GetDataService {


    @GET("/v1/examiner")
    Call<List<Examiner>> getExaminer(@Header("authorizationkey") String auth);

    @POST("/v1/examiner/login/qr")
    Call<Examiner> exmainerQRLogin(@Header("authorizationkey") String auth);

}
