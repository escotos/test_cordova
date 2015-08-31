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

public class MFPResourceRequest {
    private static final String TAG = "NATIVE-MFPResourceRequest";

    public static void addHeader(JSONArray args, CallbackContext callbackContext) throws JSONException {
        Log.d(TAG, "addHeader");
        String name = args.getString(0);
        String value = args.getString(1);
        if (name != null && name.length() > 0) {
            callbackContext.success(name);
        } else {
            callbackContext.error("Invalid arguments");
        }
    }

    public static void setHeader(JSONArray args, CallbackContext callbackContext) {
        Log.d(TAG, "setHeader");
    }

    public static void removeHeaders(JSONArray args, CallbackContext callbackContext) {
        Log.d(TAG, "removeHeaders");
    }

    public static void getHeaderNames(JSONArray args, CallbackContext callbackContext) {
        Log.d(TAG, "getHeaderNames");
    }

    public static void getHeader(JSONArray args, CallbackContext callbackContext) {
        Log.d(TAG, "getHeader");
    }

    public static void getAllHeaders(JSONArray args, CallbackContext callbackContext) {
        Log.d(TAG, "getAllHeaders");
    }

    public static void getUrl(JSONArray args, CallbackContext callbackContext) {
        Log.d(TAG, "getUrl");
    }

    public static void getMethod(JSONArray args, CallbackContext callbackContext) {
        Log.d(TAG, "getMethod");
    }

    public static void setTimeout(JSONArray args, CallbackContext callbackContext) {}

    public static void getTimeout(JSONArray args, CallbackContext callbackContext) {}

    public static void getQueryParemeters(JSONArray args, CallbackContext callbackContext) {}

    public static void setQueryParemeters(JSONArray args, CallbackContext callbackContext) {}

    public static void send(JSONArray args, CallbackContext callbackContext) {}

    public static void sendFormParameters(JSONArray args, CallbackContext callbackContext) {}

}