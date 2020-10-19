package com.example.scopping;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.util.Log;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Log.i("MainActivity", "oncreate");
    }

    @Override
    protected void onRestart() {
        super.onRestart();
        Log.i("MainActivity", "restart");
    }

    @Override
    protected void onPause() {
        super.onPause();
        Log.i("MainActivity", "pause");
    }

    @Override
    protected void onStart() {
        super.onStart();
        Log.i("MainActivity", "start");
    }

    @Override
    protected void onPostResume() {
        super.onPostResume();
        Log.i("MainActivity", "postresume");
    }

    @Override
    protected void onStop() {
        super.onStop();
        Log.i("MainActivity", "onStop");
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        Log.i("MainActivity", "OnDestroy");
    }
}