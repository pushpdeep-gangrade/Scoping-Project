package com.example.scopping;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.camera.core.Camera;
import androidx.camera.core.CameraSelector;
import androidx.camera.core.ImageAnalysis;
import androidx.camera.core.Preview;
import androidx.camera.lifecycle.ProcessCameraProvider;
import androidx.camera.view.PreviewView;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import androidx.lifecycle.LifecycleOwner;
import androidx.navigation.fragment.NavHostFragment;

import android.Manifest;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.util.Log;
import android.util.Size;
import android.view.SurfaceView;
import android.view.View;
import android.widget.Toast;

import com.google.common.util.concurrent.ListenableFuture;
import com.google.zxing.integration.android.IntentIntegrator;
import com.google.zxing.integration.android.IntentResult;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.concurrent.ExecutionException;

public class MainActivity extends AppCompatActivity {
   // private IntentIntegrator qrScan;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
     //   qrScan = new IntentIntegrator(this);


//        findViewById(R.id.button).setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View view) {
//                qrScan.initiateScan();
//            }
//        });
    }


//    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
//        super.onActivityResult(requestCode, resultCode, data);
//        IntentResult result = IntentIntegrator.parseActivityResult(requestCode, resultCode, data);
//        if (result != null) {
//            //if qrcode has nothing in it
//            if (result.getContents() == null) {
//                Toast.makeText(this, "Result Not Found", Toast.LENGTH_LONG).show();
//            } else {
//                Toast.makeText(this, result.getContents(), Toast.LENGTH_LONG).show();
////                //if qr contains data
////                try {
////                    //converting the data to json
////                    JSONObject obj = new JSONObject(result.getContents());
////                } catch (JSONException e) {
////                    e.printStackTrace();
////                    //if control comes here
////                    //that means the encoded format not matches
////                    //in this case you can display whatever data is available on the qrcode
////                    //to a toast
////
////                }
////            }
//            }
//        } else {
//            super.onActivityResult(requestCode, resultCode, data);
//        }
//
//    }
}