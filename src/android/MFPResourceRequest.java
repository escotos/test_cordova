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
import java.net.URL;
import java.util.Map;
import java.util.HashMap;
import java.util.List;
import java.util.ArrayList;
import java.util.Iterator;

public class MFPResourceRequest extends CordovaPlugin {
    private static final String TAG = "NATIVE-MFPResourceRequest";

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if("send".equals(action)) {
            this.send(args, callbackContext);
            return true;
        }
        return false;
    }

    private MFPRequest unpackRequest(JSONObject jsRequest) throws JSONException {
        //Parse the request from Javascript
        String url = jsRequest.getString("url");
        String method = jsRequest.getString("method");
        int timeout = jsRequest.getInt("timeout");

        Map<String, List<String>> headers   = toNativeMap(jsRequest.getJSONObject("headers"));
        Map<String, String> queryParameters = toNativeMap(jsRequest.getJSONObject("queryParameters"));

        //Build the request for the native Android SDK
        MFPRequest nativeRequest = null;
        try {
            nativeRequest = new MFPRequest(url, method);
            nativeRequest.setTimeout(timeout);
            nativeRequest.setHeaders(headers);
            nativeRequest.setQueryParameters(queryParameters);
        } catch (MalformedURLException e) { e.printStackTrace(); }
        return nativeRequest;
    }

    private static Map toNativeMap(JSONObject originalJSON) throws JSONException {
        Map<String, Object> convertedMap = new HashMap<String, Object>();

        Iterator<?> keys = originalJSON.keys();
        while(keys.hasNext()) {
            String key = (String)keys.next();
            // Handle Header data
            if(originalJSON.get(key) instanceof JSONArray) {
                JSONArray headerValues = originalJSON.getJSONArray(key);
                ArrayList<String> listedHeaderValues = new ArrayList<String>();
                for(int i=0; i < headerValues.length(); i++) {
                    listedHeaderValues.add(headerValues.getString(i));
                }

                convertedMap.put(key, listedHeaderValues);
            }
            // Handle QueryParameter data
            else if (originalJSON.get(key) instanceof String) {
                convertedMap.put(key, originalJSON.getString(key));
            }
        }
        return convertedMap;
    }

    public void send(JSONArray args, CallbackContext callbackContext) throws JSONException {
        JSONObject myrequest = args.getJSONObject(0);
        try {
            final MFPRequest nativeRequest = unpackRequest(myrequest);
            printNativeRequest(nativeRequest);
            cordova.getThreadPool().execute(new Runnable() {
                public void run() {
                    nativeRequest.send("Hard-coded body text", new ResponseListener() {
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

    public static void sendFormParameters(JSONArray args, CallbackContext callbackContext) throws JSONException {
        JSONObject myrequest = args.getJSONObject(0);

    }

    private void printNativeRequest(MFPRequest theRequest) throws MalformedURLException {
        Log.d(TAG, "[START] printNativeRequest()");
        Log.d(TAG, "URL = \t" + theRequest.getUrl());
        Log.d(TAG, "Method = \t" + theRequest.getMethod());
        Log.d(TAG, "Timeout = \t" + theRequest.getTimeout());

        Map<String, List<String>> native_headers = theRequest.getAllHeaders();
        Map<String, String> native_params        = theRequest.getQueryParameters();

        Log.d(TAG, "-----Headers-----");
        for (String key: native_headers.keySet()){
                    List<String> value = native_headers.get(key);

                    Log.d(TAG, "Header Name = " + key);
                    for(String headerValue : value) {
                        Log.d(TAG, "\tvalue = " + headerValue);
                    }
        }

        Log.d(TAG, "-----Queries-----");
        for (String key: native_params.keySet()){
                    String value = native_params.get(key).toString();
                    Log.d(TAG, key + " : " + value);
        }
        Log.d(TAG, "[END] printNativeRequest()");
    }

}