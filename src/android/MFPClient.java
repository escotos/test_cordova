package com.ibm.mobilefirstplatform.clientsdk.cordovaplugins.core;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;

import com.ibm.mobilefirstplatform.clientsdk.android.core.api.BMSClient;
import com.ibm.mobilefirstplatform.clientsdk.android.core.api.FailResponse;
import com.ibm.mobilefirstplatform.clientsdk.android.core.api.MFPRequest;
import com.ibm.mobilefirstplatform.clientsdk.android.core.api.ResourceRequest;
import com.ibm.mobilefirstplatform.clientsdk.android.core.api.Response;
import com.ibm.mobilefirstplatform.clientsdk.android.core.api.ResponseListener;
import com.ibm.mobilefirstplatform.clientsdk.android.security.api.AuthenticationContext;
import com.ibm.mobilefirstplatform.clientsdk.android.security.api.AuthenticationListener;
import com.ibm.mobilefirstplatform.clientsdk.android.security.api.AuthorizationManager;

import android.util.Log;
import android.app.Activity;
import android.content.Context;
import android.os.Bundle;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.net.MalformedURLException;

public class MFPClient extends CordovaPlugin {
    private static final String TAG = "NATIVE-MFPClient";

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        Log.d(TAG, "In execute()");
        String backendRoute = args.getString(0);
        String backendGuid = args.getString(1);
        Log.d(TAG, "Arg1: " + backendRoute);
        Log.d(TAG, "Arg2: " + backendGuid);
        return true;
    }

    public static void initialize(JSONArray args, CallbackContext callbackContext) throws JSONException {
        String backendRoute = args.getString(0);
        String backendGuid = args.getString(1);
        if (backendRoute != null && backendRoute.length() > 0) {
            Log.d(TAG, "Called initialize");
            Log.d(TAG, "Arg1: " + backendRoute);
            Log.d(TAG, "Arg2: " + backendGuid);

//             try {
//                 BMSClient.getInstance().initialize(this.cordova.getActivity().getApplicationContext(), "http://9.148.225.106:9080", "vit1");
//             } catch (MalformedURLException e) {
//                 e.printStackTrace();
//             }

            Log.d(TAG, "[initialize()]: Successfully set up BMSClient!");
            callbackContext.success(backendRoute);
        } else {
            callbackContext.error("Expected one non-empty string argument.");
        }
    }

    public static void registerAuthenticationListener(JSONArray args, CallbackContext callbackContext) throws JSONException {
        String realm                  = args.getString(0);
        String authenticationListener = args.getString(1);
        if (realm != null && realm.length() > 0) {
            Log.d(TAG, "Called registerAuthenticationListener");

            Log.d(TAG, "Arg1: " + realm);
            Log.d(TAG, "Arg2: " + authenticationListener);
            callbackContext.success(realm);
        } else {
            callbackContext.error("Expected one non-empty string argument.");
        }
    }

    public static void unregisterAuthenticationListener(JSONArray args, CallbackContext callbackContext) throws JSONException {
        String authenticationListener = args.getString(0);
        if (authenticationListener != null && authenticationListener.length() > 0) {
            Log.d(TAG, "Called unregisterAuthenticationListener");
            Log.d(TAG, "Arg1: " + authenticationListener);
            callbackContext.success(authenticationListener);
        } else {
            callbackContext.error("Expected one non-empty string argument.");
        }
    }
}
