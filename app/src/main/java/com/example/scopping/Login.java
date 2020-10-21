package com.example.scopping;

import android.content.Intent;
import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.navigation.NavController;
import androidx.navigation.Navigation;
import androidx.navigation.fragment.NavHostFragment;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import com.example.api.GetDataService;
import com.example.model.Examiner;
import com.example.network.RetrofitClientInstance;
import com.example.scopping.databinding.FragmentLoginBinding;
import com.google.zxing.integration.android.IntentIntegrator;
import com.google.zxing.integration.android.IntentResult;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;


public class Login extends Fragment {
    private FragmentLoginBinding binding;
    private IntentIntegrator qrScan;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (getArguments() != null) {
        }
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        qrScan = new IntentIntegrator(getActivity());
        qrScan.setBeepEnabled(false);
        binding = FragmentLoginBinding.inflate(inflater, container, false);
        return binding.getRoot();

    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        NavHostFragment navHostFragment = (NavHostFragment) getActivity().getSupportFragmentManager().findFragmentById(R.id.nav_host_fragment);
        NavController navController = navHostFragment.getNavController();

        binding.buttonLogin.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                GetDataService service = RetrofitClientInstance.getRetrofitInstance().create(GetDataService.class);
                Call<List<Examiner>> call = service.getExaminer("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1X2lkIjoiNWY4ZmI0YWZkNTNkYTZjM2JjYzExNTgwIiwiaWF0IjoxNjAzMjU1NTM0LCJleHAiOjE2MDMyNTkxMzR9.v4_Bppob6b2S5A00jvz08uPd2Rco9X9qH4D6ri4eAec");
                call.enqueue(new Callback<List<Examiner>>() {
                    @Override
                    public void onResponse(Call<List<Examiner>> call, Response<List<Examiner>> response) {
                        Log.d("demo", response.body().toString());
                        List<Examiner> e1 = response.body();
                        Log.d("demo",e1.get(0).getFirstname());

                    }

                    @Override
                    public void onFailure(Call<List<Examiner>> call, Throwable t) {
                        Log.d("demo", t.toString());
                        Toast.makeText(getContext(), "Something went wrong...Please try later!" + t, Toast.LENGTH_SHORT).show();
                    }
                });

            }
        });



        binding.qrLogin.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                qrScan.forSupportFragment(Login.this).initiateScan();
            }
        });
    }


    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        IntentResult result = IntentIntegrator.parseActivityResult(requestCode, resultCode, data);
        if (result != null) {
            if (result.getContents() == null) {
                Toast.makeText(getContext(), "Result Not Found", Toast.LENGTH_LONG).show();
            } else {
                Log.d("demoo", result.getContents());
                //Toast.makeText(getContext(), result.getContents(), Toast.LENGTH_LONG).show();
                GetDataService service = RetrofitClientInstance.getRetrofitInstance().create(GetDataService.class);
                Call<Examiner> call = service.exmainerQRLogin(result.getContents());
                call.enqueue(new Callback<Examiner>() {
                    @Override
                    public void onResponse(Call<Examiner> call, Response<Examiner> response) {
                       Log.d("demo", response.toString());
                        Examiner e1 = response.body();
                        Toast.makeText(getContext(), "Welcome "  + e1.getFirstname(), Toast.LENGTH_SHORT).show();
                       // Log.d("demo",e1.getFirstname());
                        Navigation.findNavController(getView()).navigate(R.id.action_login_to_scoreboard);
                    }

                    @Override
                    public void onFailure(Call<Examiner> call, Throwable t) {
                        Log.d("demo", t.toString());
                        Toast.makeText(getContext(), "Something went wrong...Please try later!" + t, Toast.LENGTH_SHORT).show();
                    }
                });

            }
        }

    }
}