package com.ibm.mobilefirstplatform.clientsdk.cordovaplugins.core;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;

import android.util.Log;
import android.app.Activity;
import android.content.Context;
import android.os.Bundle;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.net.MalformedURLException;

public class MFPCore extends CordovaPlugin {

    private static String TAG = "NATIVE-MFPCore";
    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        Log.d(TAG, "In execute()");
        MFPAction currentAction = MFPAction.fromString(action);
        if(currentAction != null) {
            switch(currentAction) {

                /* MFPClient */

                case initialize:
                    Log.d(TAG, " calling initialize()");
                    MFPClient.initialize(args, callbackContext);
                    return true;
                case registerAuthenticationListener:
                    Log.d(TAG, " calling registerAuthenticationListener()");
                    MFPClient.registerAuthenticationListener(args, callbackContext);
                    return true;
                case unregisterAuthenticationListener:
                    Log.d(TAG, " calling unregisterAuthenticationListener()");
                    MFPClient.unregisterAuthenticationListener(args, callbackContext);
                    return true;

                /* MFPResourceRequest */

                case addHeader:
                    Log.d(TAG, " calling addHeader()");
                    MFPResourceRequest.addHeader(args, callbackContext);
                    return true;
                case setHeader:
                    Log.d(TAG, " calling setHeader()");
                    MFPResourceRequest.setHeader(args, callbackContext);
                    return true;
                case removeHeaders:
                    Log.d(TAG, " calling removeHeaders()");
                    MFPResourceRequest.removeHeaders(args, callbackContext);
                    return true;
                case getHeaderNames:
                    Log.d(TAG, " calling getHeaderNames()");
                    MFPResourceRequest.getHeaderNames(args, callbackContext);
                    return true;
                case getHeader:
                    Log.d(TAG, " calling getHeader()");
                    MFPResourceRequest.getHeader(args, callbackContext);
                    return true;
                case getHeaders:
                    Log.d(TAG, " calling getHeaders()");
                    MFPResourceRequest.getHeaders(args, callbackContext);
                    return true;
                case getAllHeaders:
                    Log.d(TAG, " calling getAllHeaders()");
                    MFPResourceRequest.getAllHeaders(args, callbackContext);
                    return true;
                case getUrl:
                    Log.d(TAG, " calling getUrl()");
                    MFPResourceRequest.getUrl(args, callbackContext);
                    return true;
                case getMethod:
                    Log.d(TAG, " calling getMethod()");
                    MFPResourceRequest.getMethod(args, callbackContext);
                    return true;
                case setTimeout:
                    Log.d(TAG, " calling setTimeout()");
                    MFPResourceRequest.setTimeout(args, callbackContext);
                    return true;
                case getTimeout:
                    Log.d(TAG, " calling getTimeout()");
                    MFPResourceRequest.getTimeout(args, callbackContext);
                    return true;
                case getQueryParameters:
                    Log.d(TAG, " calling getQueryParameters()");
                    MFPResourceRequest.getQueryParameters(args, callbackContext);
                    return true;
                case setQueryParameter:
                    Log.d(TAG, " calling setQueryParameter()");
                    MFPResourceRequest.setQueryParameter(args, callbackContext);
                    return true;
                case setQueryParameters:
                    Log.d(TAG, " calling setQueryParameters()");
                    MFPResourceRequest.setQueryParameters(args, callbackContext);
                    return true;
                case send:
                    Log.d(TAG, " calling send()");
                    MFPResourceRequest.send(args, callbackContext);
                    return true;
                case sendFormParameters:
                    Log.d(TAG, " calling sendFormParameters()");
                    MFPResourceRequest.sendFormParameters(args, callbackContext);
                    return true;
            }
        }
        return false;
    }

    private static enum MFPAction {
        initialize, registerAuthenticationListener, unregisterAuthenticationListener,

        addHeader, setHeader, removeHeaders, getHeaderNames, getHeader, getHeaders, getAllHeaders, getUrl,
        getMethod, setTimeout, getTimeout, getQueryParameters, setQueryParameter, setQueryParameters,
        send, sendFormParameters;

        public static MFPAction fromString(String action) {
            try {
                return valueOf(action);
            } catch (Exception e) {}
            return null;
        }
    }
}