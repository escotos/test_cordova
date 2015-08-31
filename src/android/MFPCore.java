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
                case addHeader:
                    Log.d(TAG, " calling addHeader()");
                    MFPResourceRequest.addHeader(args, callbackContext);
                    return true;
            }
        }
        return false;
    }

    private static enum MFPAction {
        initialize, registerAuthenticationListener, unregisterAuthenticationListener,

        addHeader, setHeader, removeHeaders, getHeaderNames, getHeader, getAllHeaders, getUrl,
        getMethod, setTimeout, getTimeout, getQueryParemeters, setQueryParemeters, send, sendFormParameters;

        public static MFPAction fromString(String action) {
            try {
                return valueOf(action);
            } catch (Exception e) {}
            return null;
        }
    }
}