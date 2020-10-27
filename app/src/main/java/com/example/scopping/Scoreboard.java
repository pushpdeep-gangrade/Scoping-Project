package com.example.scopping;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.navigation.Navigation;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import com.example.adapter.ScoreboardAdapter;
import com.example.api.GetDataService;
import com.example.model.Score;
import com.example.model.Scores;
import com.example.model.Teams;
import com.example.network.RetrofitClientInstance;
import com.example.scopping.databinding.FragmentScoreboardBinding;
import com.google.zxing.integration.android.IntentIntegrator;
import com.google.zxing.integration.android.IntentResult;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

import static android.content.Context.MODE_PRIVATE;

public class Scoreboard extends Fragment {
    private FragmentScoreboardBinding binding;
    RecyclerView scoreborad;
    private IntentIntegrator qrScan;
    ScoreboardAdapter scoreboardAdapter;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment

        binding = FragmentScoreboardBinding.inflate(inflater, container, false);
        return binding.getRoot();
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        scoreborad = binding.rcScoreboard;

        SharedPreferences sharedPreferences = getActivity().getSharedPreferences(Login.AuthExaminer, MODE_PRIVATE);
        String authToken = sharedPreferences.getString(getString(R.string.auth), "");
        Log.d("Scoreboard", authToken);
        if(authToken != null && authToken != "")
            populate(authToken);



        binding.button3.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                qrScan.forSupportFragment(Scoreboard.this).initiateScan();
              //  Navigation.findNavController(getView()).navigate(R.id.action_scoreboard_to_fragment1);
            }
        });

    }

    public void populate(String token) {

        GetDataService service = RetrofitClientInstance.getRetrofitInstance().create(GetDataService.class);
        Call<List<Teams>> call = service.getTeams(token);
        Log.d("Scoreboard", token);
        call.enqueue(new Callback<List<Teams>>() {
            @Override
            public void onResponse(Call<List<Teams>> call, Response<List<Teams>> response) {
               Log.d("Scoreboard", response.body().toString());
                List<Teams> teams = response.body();
                List<Scores> scoresList = new ArrayList<>();
                for (int i = 0; i < teams.size(); i++) {
                    ArrayList<Score> score = teams.get(i).getScores();
                    double totalScore = 0.0;
                    for (int j = 0; j < score.size(); j++) {

                        totalScore += score.get(j).getScore();

                    }

                    Scores s = new Scores(teams.get(i).getName(), totalScore/score.size());
                    scoresList.add(s);

                }

                Collections.sort(scoresList, new Comparator<Scores>() {
                    @Override
                    public int compare(Scores scores, Scores t1) {
                        return (int) (t1.getScore() - scores.getScore());
                    }
                });
                Collections.reverse(scoresList);
                scoreboardAdapter = new ScoreboardAdapter(scoresList);
                scoreborad.setAdapter(scoreboardAdapter);
                // Set layout manager to position the items
                scoreborad.setLayoutManager(new LinearLayoutManager(getContext()));
            }

            @Override
            public void onFailure(Call<List<Teams>> call, Throwable t) {
                Log.d("Scoreboard", t.toString());
            }

        });
    }

    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
//        Bundle bundle = new Bundle();
//        //  bundle.putString("teamid", response.body());
//        bundle.putString("teamid", "5f8f2ded82ab5212fc6e307c");

        //Navigation.findNavController(getView()).navigate(R.id.action_scoreboard_to_fragment1, bundle);

        IntentResult result = IntentIntegrator.parseActivityResult(requestCode, resultCode, data);

        if (result != null) {

            if (result.getContents() == null) {
                Toast.makeText(getContext(), "Result Not Found", Toast.LENGTH_LONG).show();

            } else {
                Log.d("demo", "result " + result.getContents());

                GetDataService service = RetrofitClientInstance.getRetrofitInstance().create(GetDataService.class);

                SharedPreferences sharedPreferences = getActivity().getSharedPreferences(Login.AuthExaminer, MODE_PRIVATE);
                String authToken = sharedPreferences.getString(getString(R.string.auth), "");

                Map<String, String> map = new HashMap<>();

                map.put("authorizationkey", authToken);
                map.put("teamId", result.getContents());
                Call<String> call = service.getTeam(map);
                call.enqueue(new Callback<String>() {
                    @Override
                    public void onResponse(Call<String> call, Response<String> response) {
                        Log.d("demo", response.toString());
                        Log.d("demo", response.body().toString());
                        Bundle bundle = new Bundle();
                        // bundle.putString("teamid", response.body());
                       // bundle.putString("teamid", "5f8f2ded82ab5212fc6e307c");
                        Navigation.findNavController(getView()).navigate(R.id.action_login_to_scoreboard, bundle);

                    }

                    @Override
                    public void onFailure(Call<String> call, Throwable t) {
                        Log.d("demo", t.toString());
                        Toast.makeText(getContext(), "Something went wrong...Please try later!" + t, Toast.LENGTH_SHORT).show();
                    }
                });

            }
        }

    }
}