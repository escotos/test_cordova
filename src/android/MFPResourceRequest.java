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
import com.ibm.mobilefirstplatform.clientsdk.android.logger.api.Logger;

import android.util.Log;
import android.app.Activity;
import android.content.Context;
import android.os.Bundle;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.net.MalformedURLException;

//         Method[] list = this.getClass().getMethods();
public class MFPResourceRequest extends CordovaPlugin {
    private static final String TAG = "NATIVE-MFPResourceRequest";

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        Log.d(TAG, "In execute()");

        if("send".equals(action)) {
            this.send(args, callbackContext);
            return true;
        }
        return false;
    }

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

    public static void setHeader(JSONArray args, CallbackContext callbackContext) throws JSONException {
        Log.d(TAG, "setHeader");
        String name = args.getString(0);
        String value = args.getString(0);
        if (name != null && name.length() > 0) {
            callbackContext.success(name);
        } else {
            callbackContext.error("Invalid arguments");
        }
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

    public static void getHeaders(JSONArray args, CallbackContext callbackContext) {
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

    public static void getQueryParameters(JSONArray args, CallbackContext callbackContext) {}

    public static void setQueryParameter(JSONArray args, CallbackContext callbackContext) {}

    public static void setQueryParameters(JSONArray args, CallbackContext callbackContext) {}

    public void send(JSONArray args, CallbackContext callbackContext) throws JSONException {
        Log.d(TAG, "In send()");
        JSONObject myrequest = args.getJSONObject(0);

        String url = myrequest.getString("url");
        String method = myrequest.getString("method");
        Log.d(TAG, "The passed dictionary: " + myrequest);
        Log.d(TAG, "The passed url : " + url);

        try {
            final MFPRequest req = new MFPRequest(url, method);

            Log.d(TAG, "Testing the request");
            Log.d(TAG, " req.getUrl: " + req.getUrl());
            Log.d(TAG, " req.getMethod: " + req.getMethod());

            req.addHeader("SEHeaderName1", "SEHeaderValue1");
            req.setQueryParameter("SEQP1", "SEQP1value");

            cordova.getThreadPool().execute(new Runnable() {
                public void run() {
                    req.send("SE Hello", new ResponseListener() {
                        @Override
                        public void onSuccess(Response response) {
                            Log.d(TAG, "Success: " + response.getResponseText());
                        }
                        @Override
                        public void onFailure(FailResponse failResponse, Throwable throwable) {
                            Log.d(TAG, "Failure: " + failResponse.getStatus());
                        }
                    });
                }
            });

        } catch (MalformedURLException e) { e.printStackTrace(); }
    }
    public static void sendFormParameters(JSONArray args, CallbackContext callbackContext) {}

}