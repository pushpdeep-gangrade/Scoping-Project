package com.example.scopping;

import android.content.Context;
import android.content.SharedPreferences;
import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.navigation.Navigation;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.Toast;

import com.example.api.GetDataService;
import com.example.model.Examiner;
import com.example.model.Score;
import com.example.model.Scores;
import com.example.network.RetrofitClientInstance;
import com.example.scopping.databinding.Fragment1Binding;
import com.example.scopping.databinding.FragmentLoginBinding;
import com.google.zxing.integration.android.IntentIntegrator;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class Fragment1 extends Fragment {
    private int index = 0;
    private Fragment1Binding binding;

    private List<Double> individualScore;

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setHasOptionsMenu(true);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        binding = Fragment1Binding.inflate(inflater, container, false);
        return binding.getRoot();
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        binding.btnSubmit.setVisibility(View.INVISIBLE);
        individualScore = new ArrayList<>();
        List<String> questions = Arrays.asList(getResources().getStringArray(R.array.questionsArray));

        binding.question.setText(questions.get(0));

        if (index == 0)
            binding.btnPrev.setVisibility(View.INVISIBLE);

        binding.btnNext.setClickable(false);
        binding.btnNext.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                int i = binding.radioGroup.getCheckedRadioButtonId();
                if(i!= -1){
                binding.radioGroup.clearCheck();

                if (index < questions.size() - 1) {
                    index++;
                    binding.btnPrev.setVisibility(View.VISIBLE);
                    binding.question.setText(questions.get(index));
                }

                if (index == questions.size() - 1) {
                    binding.btnSubmit.setVisibility(View.VISIBLE);
                    binding.btnNext.setVisibility(View.INVISIBLE);
                    binding.btnPrev.setVisibility(View.VISIBLE);
                }
            }}
        });

        binding.btnPrev.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if (index != 0) {
                    index--;
                    binding.question.setText(questions.get(index));
                }

                if (index == 0)
                    binding.btnPrev.setVisibility(View.INVISIBLE);
            }
        });

        binding.btnSubmit.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                double sum = 0.0;
                for(int i=0;i<individualScore.size();i++){
                    sum += individualScore.get(i);
                    Log.d("score", individualScore.get(i).toString());
                }
                double score = sum / individualScore.size();
                Scores s = new Scores(getArguments().getString("teamid"), score);
                Log.d("F1", s.getTeamname() +" " + s.getScore());
                callApi(s);
            }
        });

        binding.radioGroup.setOnCheckedChangeListener(new RadioGroup.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(RadioGroup radioGroup, int i) {
                switch(i) {
                    case R.id.poor:
                            individualScore.add(index,1.0);
                        break;
                    case R.id.fair:
                            individualScore.add(index,2.0);
                        break;
                    case R.id.good:
                            individualScore.add(index,3.0);
                        break;
                    case R.id.verygood:
                            individualScore.add(index,4.0);
                        break;
                    case R.id.superior:
                            individualScore.add(index,5.0);
                        break;
                }
            }
        });

    }

    public void callApi(Scores s1){
        SharedPreferences sharedPref = getActivity().getSharedPreferences(Login.AuthExaminer, Context.MODE_PRIVATE);
        String authToken = sharedPref.getString(getString(R.string.auth), "");
        GetDataService service = RetrofitClientInstance.getRetrofitInstance().create(GetDataService.class);
    Log.d("F1",authToken);
        Call<String> call = service.postScores(authToken, s1);
        call.enqueue(new Callback<String>() {
            @Override
            public void onResponse(Call<String> call, Response<String> response) {
                Log.d("F1", response.toString());
                Navigation.findNavController(getView()).navigate(R.id.action_fragment1_to_scoreboard);
            }

            @Override
            public void onFailure(Call<String> call, Throwable t) {
                Log.d("fragment1", t.toString());
                Navigation.findNavController(getView()).navigate(R.id.action_fragment1_to_scoreboard);

            }
        });
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // handle item selection
        switch (item.getItemId()) {
            case R.id.logout:
                SharedPreferences preferences = getActivity().getSharedPreferences(Login.AuthExaminer, Context.MODE_PRIVATE);
                preferences.edit().clear();
                Navigation.findNavController(getView()).navigate(R.id.action_fragment1_to_login);
                Toast.makeText(getContext(), "logout", Toast.LENGTH_SHORT).show();
                return true;
            default:
                return super.onOptionsItemSelected(item);
        }
    }
    @Override
    public void onCreateOptionsMenu(
            Menu menu, MenuInflater inflater) {
        inflater.inflate(R.menu.main, menu);
    }
}