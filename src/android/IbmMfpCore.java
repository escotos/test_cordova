package ibm.mfp.core;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;

import com.ibm.mobilefirstplatform.clientsdk.android.core.api.BMSClient;
/*
import com.ibm.mobilefirstplatform.clientsdk.android.core.api.FailResponse;
import com.ibm.mobilefirstplatform.clientsdk.android.core.api.MFPRequest;
import com.ibm.mobilefirstplatform.clientsdk.android.core.api.ResourceRequest;
import com.ibm.mobilefirstplatform.clientsdk.android.core.api.Response;
import com.ibm.mobilefirstplatform.clientsdk.android.core.api.ResponseListener;
import com.ibm.mobilefirstplatform.clientsdk.android.security.api.AuthenticationContext;
import com.ibm.mobilefirstplatform.clientsdk.android.security.api.AuthenticationListener;
import com.ibm.mobilefirstplatform.clientsdk.android.security.api.AuthorizationManager;
*/

import android.util.Log;
import android.app.Activity;
import android.content.Context;
import android.os.Bundle;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.net.MalformedURLException;

public class IbmMfpCore extends CordovaPlugin {
    private final String TAG = "IbmMfpCore";

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        Log.d(TAG, "[Native Java]: In execute()");
        if ("initialize".equals(action)) {
            String backendRoute = args.getString(0);
            String backendGuid = args.getString(1);
            this.initialize(backendRoute, backendGuid, callbackContext);
            return true;
        }
        else if ("registerAuthenticationListener".equals(action)) {
            String realm = args.getString(0);
            String authenticationListener = args.getString(1);
            this.registerAuthenticationListener(realm, authenticationListener, callbackContext);
        }
        else if ("unregisterAuthenticationListener".equals(action)) {
            String authenticationListener = args.getString(0);
            this.unregisterAuthenticationListener(authenticationListener, callbackContext);
        }
        return false;
    }

    private void initialize(String backendRoute, String backendGuid, CallbackContext callbackContext) {
        if (backendRoute != null && backendRoute.length() > 0) {
            Log.d(TAG, "[Native Java]: Called initialize");
            Log.d(TAG, "Argument1:" + backendRoute);
            Log.d(TAG, "Argument2:" + backendGuid);

            try {
                BMSClient.getInstance().initialize(this.cordova.getActivity().getApplicationContext(), "http://9.148.225.106:9080", "vit1");
            } catch (MalformedURLException e) {
                e.printStackTrace();
            }

            Log.d(TAG, "[initialize()]: Successfully set up BMSClient!");
            callbackContext.success(backendRoute);
        } else {
            callbackContext.error("Expected one non-empty string argument.");
        }
    }

    private void registerAuthenticationListener(String realm, String authenticationListener, CallbackContext callbackContext) {
        if (realm != null && realm.length() > 0) {
            Log.d(TAG, "[Native Java]: Called registerAuthenticationListener");
            Log.d(TAG, "Argument1:" + realm);
            Log.d(TAG, "Argument2:" + authenticationListener);
            callbackContext.success(realm);
        } else {
            callbackContext.error("Expected one non-empty string argument.");
        }
    }

    private void unregisterAuthenticationListener(String authenticationListener, CallbackContext callbackContext) {
        if (authenticationListener != null && authenticationListener.length() > 0) {
            Log.d(TAG, "[Native Java]: Called unregisterAuthenticationListener");
            Log.d(TAG, "Argument1:" + authenticationListener);
            callbackContext.success(authenticationListener);
        } else {
            callbackContext.error("Expected one non-empty string argument.");
        }
    }
}
