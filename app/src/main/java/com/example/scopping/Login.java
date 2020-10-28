package com.example.scopping;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
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
    public static final String AuthExaminer = "MyPrefs";


    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
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
                GetDataService service = RetrofitClientInstance.getRetrofitInstance().create(GetDataService.class);
                Call<Examiner> call = service.exmainerQRLogin(result.getContents());
                call.enqueue(new Callback<Examiner>() {
                    @Override
                    public void onResponse(Call<Examiner> call, Response<Examiner> response) {
                        Log.d("demo", response.toString());
                        if (response.code() == 200) {
                            SharedPreferences sharedPreferences = getActivity().getSharedPreferences(AuthExaminer, Context.MODE_PRIVATE);
                            SharedPreferences.Editor editor = sharedPreferences.edit();
                            editor.putString(getString(R.string.auth), response.headers().get("AuthorizationKey"));
                            editor.apply();

                            Log.d("demo", response.toString());
                            Examiner e1 = response.body();

                            Toast.makeText(getContext(), "Welcome " + e1.getFirstname(), Toast.LENGTH_SHORT).show();
                            Navigation.findNavController(getView()).navigate(R.id.action_login_to_scoreboard);
                        } else if (response.code() == 401) {
                            Toast.makeText(getContext(), response.message(), Toast.LENGTH_SHORT).show();
                        } else if (response.code() == 400) {
                            Toast.makeText(getContext(), "Token expired", Toast.LENGTH_SHORT).show();
                        } else
                            Toast.makeText(getContext(), "Invalid QR", Toast.LENGTH_SHORT).show();
                    }

                    @Override
                    public void onFailure(Call<Examiner> call, Throwable t) {
                        Log.d("demo", t.toString());
                        Toast.makeText(getContext(), "Server is Down", Toast.LENGTH_SHORT).show();
                    }
                });

            }
        }

    }
}