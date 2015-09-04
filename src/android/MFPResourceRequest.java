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
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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


    private void unpackRequest(JSONObject javascriptRequest) throws JSONException {
        String url = javascriptRequest.getString("url");
        String method = javascriptRequest.getString("method");

        Log.d(TAG, "unpackRequest=" + javascriptRequest.getJSONObject("headers").toString());
//         try {
//             MFPRequest fullRequest = new MFPRequest(url, method);
//
//         } catch (MalformedURLException e) { e.printStackTrace(); }
//         Map<String, List<String>> mapHeaders = jsonToMap(javascriptRequest.getJSONObject("headers"));
//         fullRequest.setHeaders(mapHeaders);

//         for(String header : fullRequest.getHeaders())
//             Log.d(TAG, "Header: " + header);

//         return fullRequest;
    }


//     private Map<String, T> jsonToMap(JSONObject json) throws JSONException {
//         Map<String, T> retMap = new HashMap<String, T>();
//
//         if(json != JSONObject.NULL) {
//             retMap = toMap(json);
//         }
//         return retMap;
//     }
//
//     private Map<String, T> toMap(JSONObject object) throws JSONException {
//         Map<String, T> map = new HashMap<String, T>();
//
//         Iterator<String> keysItr = object.keys();
//         while(keysItr.hasNext()) {
//             String key = keysItr.next();
//             T value = object.get(key);
//
//             if(value instanceof JSONArray) {
//                 value = toList((JSONArray) value);
//             }
//
//             else if(value instanceof JSONObject) {
//                 value = toMap((JSONObject) value);
//             }
//             map.put(key, value);
//         }
//         return map;
//     }
//
//     private List<T> toList(JSONArray array) throws JSONException {
//         List<T> list = new ArrayList<T>();
//         for(int i = 0; i < array.length(); i++) {
//             T value = array.get(i);
//             if(value instanceof JSONArray) {
//                 value = toList((JSONArray) value);
//             }
//
//             else if(value instanceof JSONObject) {
//                 value = toMap((JSONObject) value);
//             }
//             list.add(value);
//         }
//         return list;
//     }

    public void send(JSONArray args, CallbackContext callbackContext) throws JSONException {
        Log.d(TAG, "In send()");
        JSONObject myrequest = args.getJSONObject(0);

        String url = myrequest.getString("url");
        String method = myrequest.getString("method");
        Log.d(TAG, "The passed dictionary: " + myrequest);

        try {
            unpackRequest(myrequest);
            final MFPRequest req = new MFPRequest(url, method);
//             final MFPRequest req = unpackRequest(myrequest);

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
    public static void sendFormParameters(JSONArray args, CallbackContext callbackContext) throws JSONException {
        JSONObject myrequest = args.getJSONObject(0);

    }

}