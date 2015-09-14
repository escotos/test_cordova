package com.ibm.mobilefirstplatform.clientsdk.cordovaplugins.core;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;
import org.apache.cordova.PluginResult;

import com.ibm.mobilefirstplatform.clientsdk.android.core.api.*;
import com.ibm.mobilefirstplatform.clientsdk.android.security.api.*;
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

    private static final String EscapeRegex = "^([^\"\\\\]*(\\\\.)?)*$";

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if("send".equals(action)) {
            this.send(args, callbackContext);
            return true;
        } else if ("sendFormParameters".equals(action)) {
            this.sendFormParameters(args, callbackContext);
            return true;
        }
        return false;
    }

    //TODO: Refactor send & sendFormParameters
    public void send(JSONArray args, final CallbackContext callbackContext) throws JSONException {
        JSONObject myrequest = args.getJSONObject(0);
        Log.d(TAG, "myrequest.toString() = " + myrequest.toString());
        try {
            final MFPRequest nativeRequest = unpackRequest(myrequest);
            final String bodyText = (myrequest.getString("body") != null) ? myrequest.getString("body") : "";
            printNativeRequest(nativeRequest);
            cordova.getThreadPool().execute(new Runnable() {
                public void run() {
                    nativeRequest.send(bodyText, new ResponseListener() {
                        @Override
                        public void onSuccess(Response response) {
                            try {
                                PluginResult result = new PluginResult(PluginResult.Status.OK, packResponse(response));
                                result.setKeepCallback(true);
                                Log.d(TAG, "Success = Sending plugin result to javascript");
                                callbackContext.sendPluginResult(result);
                            } catch (JSONException e) { e.printStackTrace(); }
                        }
                        @Override
                        public void onFailure(FailResponse failResponse, Throwable throwable) {
                            try {
                                PluginResult result = new PluginResult(PluginResult.Status.ERROR, packResponse(failResponse));
                                result.setKeepCallback(true);
                                Log.d(TAG, "Failure = Sending plugin result to javascript");
                                callbackContext.sendPluginResult(result);
                            } catch (JSONException e) { e.printStackTrace(); }
                        }
                    });
                }
            });
        }
        catch (MalformedURLException e) { Log.d(TAG, "Malformed URL Exception"); e.printStackTrace(); }
    }

    //TODO: Refactor
    public void sendFormParameters(JSONArray args, final CallbackContext callbackContext) throws JSONException {
        JSONObject myrequest = args.getJSONObject(0);
        Log.d(TAG, "myrequest.toString() = " + myrequest.toString());
        try {
            final MFPRequest nativeRequest = unpackRequest(myrequest);
            final Map<String, String> formParameters = fromJSONtoHashMap(myrequest.getJSONObject("body"));
            Log.d(TAG, "BODY " + myrequest.getJSONObject("body").toString());
            printNativeRequest(nativeRequest);

            cordova.getThreadPool().execute(new Runnable() {
                public void run() {
                    nativeRequest.send(formParameters, new ResponseListener() {
                        @Override
                        public void onSuccess(Response response) {
                            Log.d(TAG, "Success: " + response.getResponseText());
                            //callbackContext.success("Native Success");
                            try {
                                PluginResult result = new PluginResult(PluginResult.Status.OK, packResponse(response));
                                result.setKeepCallback(true);
                                callbackContext.sendPluginResult(result);
                            } catch (JSONException e) { e.printStackTrace(); }
                        }
                        @Override
                        public void onFailure(FailResponse failResponse, Throwable throwable) {
                            Log.d(TAG, "Failure: " + failResponse.getStatus());
                            //callbackContext.error("Native Error.");
                            try {
                                PluginResult result = new PluginResult(PluginResult.Status.ERROR, packResponse(failResponse));
                                result.setKeepCallback(true);
                                callbackContext.sendPluginResult(result);
                            } catch (JSONException e) { e.printStackTrace(); }
                        }
                    });
                }
            });
        }
        catch (MalformedURLException e) { Log.d(TAG, "Malformed URL Exception"); e.printStackTrace(); }
    }


    //TODO : Refactor
    private MFPRequest unpackRequest(JSONObject jsRequest) throws JSONException {
        //Parse the request from Javascript
        String url    = jsRequest.getString("url");
        String method = jsRequest.getString("method");
        int timeout   = jsRequest.getInt("timeout");
        Map<String, List<String>> headers = null;
        Map<String, String> queryParameters = null;

        if (jsRequest.getJSONObject("headers") != null)
            headers = fromJSONtoHashMap(jsRequest.getJSONObject("headers"));
        if (jsRequest.getJSONObject("queryParameters") != null)
            queryParameters = fromJSONtoHashMap(jsRequest.getJSONObject("queryParameters"));

        //Build the request using the native Android SDK
        MFPRequest nativeRequest = null;
        try {
            nativeRequest = new MFPRequest(url, method);
            nativeRequest.setTimeout(timeout);
            if (headers != null)
                nativeRequest.setHeaders(headers);
            if (queryParameters != null)
                nativeRequest.setQueryParameters(queryParameters);
        } catch (MalformedURLException e) { e.printStackTrace(); }
        return nativeRequest;
    }

    private String packResponse(Response response) throws JSONException {
        JSONObject jsonResponse = new JSONObject();

        int httpStatus             = (response.getStatus() != 0)             ? response.getStatus() : 0;
        String responseText        = (response.getResponseText() != null)    ? response.getResponseText() : "";
        JSONObject responseJSON    = (response.getResponseJSON() != null)    ? response.getResponseJSON() : null;
        JSONObject responseHeaders = (response.getResponseHeaders() != null) ? fromHashMaptoJSON(response.getResponseHeaders()) : null;
        
        jsonResponse.put("httpStatus", httpStatus);
        jsonResponse.put("responseText", responseText);
        jsonResponse.put("responseJSON", responseJSON);
        jsonResponse.put("responseHeaders", responseHeaders);

        if(response instanceof FailResponse) {
            jsonResponse.put("errorCode", ((FailResponse) response).getErrorCode());
            jsonResponse.put("errorDescription", responseText);
        }

        Log.d(TAG, "packResponse -> Complete JSON");
        Log.d(TAG, jsonResponse.toString());

        return jsonResponse.toString();
    }

    private static JSONObject fromHashMaptoJSON(Map<String, List<String>> originalMap) throws JSONException {
        JSONObject convertedJSON = new JSONObject();
        Iterator it = originalMap.entrySet().iterator();
        while(it.hasNext()) {
            Map.Entry pair = (Map.Entry)it.next();
            String key = (String) pair.getKey();
            List<String> headerValuesList = (List<String>)pair.getValue();
            for(String headerValue : headerValuesList) {
                convertedJSON.put(key, headerValue);
            }
        }
        return convertedJSON;
    }
    private static Map fromJSONtoHashMap(JSONObject originalJSON) throws JSONException {
        Map<String, Object> convertedMap = new HashMap<String, Object>();

        Iterator<?> keys = originalJSON.keys();
        while(keys.hasNext()) {
            String key = (String)keys.next();
            // Handle "key" => [array of Strings]
            if(originalJSON.get(key) instanceof JSONArray) {
                JSONArray headerValues = originalJSON.getJSONArray(key);

                ArrayList<String> listedHeaderValues = new ArrayList<String>();
                for(int i=0; i < headerValues.length(); i++) {
                    listedHeaderValues.add(headerValues.getString(i));
                }
                convertedMap.put(key, listedHeaderValues);
            }
            // Handle "key" => "value (string)"
            else if (originalJSON.get(key) instanceof String) {
                convertedMap.put(key, originalJSON.getString(key));
            }
        }
        return convertedMap;
    }

    private void printNativeRequest(MFPRequest theRequest) throws MalformedURLException {
        Log.d(TAG, "\n[START] printNativeRequest()");
        Log.d(TAG, "URL = \t" + theRequest.getUrl());
        Log.d(TAG, "Method = \t" + theRequest.getMethod());
        Log.d(TAG, "Timeout = \t" + theRequest.getTimeout());

        Map<String, List<String>> native_headers = theRequest.getAllHeaders();
        Map<String, String> native_params        = theRequest.getQueryParameters();

        Log.d(TAG, "-----Headers-----");
        if (native_headers != null) {
            for (String key: native_headers.keySet()) {
                        List<String> value = native_headers.get(key);

                        Log.d(TAG, "Header Name = " + key);
                        for(String headerValue : value) {
                            Log.d(TAG, "\tvalue = " + headerValue);
                        }
            }
        }
        Log.d(TAG, "-----Queries-----");
        if(native_params != null) {
            for (String key: native_params.keySet()) {
                        String value = native_params.get(key).toString();
                        Log.d(TAG, key + " : " + value);
            }
        }
        Log.d(TAG, "[END] printNativeRequest()\n\n");
    }

}