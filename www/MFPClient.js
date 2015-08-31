/*
    Copyright 2015 IBM Corp.
    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at
        http://www.apache.org/licenses/LICENSE-2.0
    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/
var exec = require("cordova/exec");

//Singleton
var MFPClient = function() {

    var _version = "0.0.1";

    var success = function(msg) { console.log("MFPClient success: " + msg) };

    var failure = function(msg) { console.log("MFPClient Error: " + msg) };
    /**
     * Sets the base URL for the authorization server.
     * <p>
     * This method should be called before you send the first request that requires authorization.
     * </p>
     * @param {string} backendRoute
     * @param {string} backendGuid
     */
    this.initialize = function(backendRoute, backendGuid) {
        cordova.exec(success, failure, "MFPCore", "initialize", [backendRoute, backendGuid]);
    };

    /**
     * Registers authentication callback
     * @param {string} realm
     * @param {function} authenticationListener
     */
    this.registerAuthenticationListener = function(realm, authenticationListener) {
        cordova.exec(success, failure, "MFPCore", "registerAuthenticationListener" [realm, authenticationListener]);
    };

    /**
     * Unregisters the authentication callback
     * @param {function} authenticationListener
     */
	this.unregisterAuthenticationListener = function(authenticationListener) {
        cordova.exec(success, failure, "MFPCore", "unregisterAuthenticationListener" [authenticationListener]);
    };

    /**
     * Prints out the plugin version
     * @returns {string}
     */
	this.version = function() {
        return _version;
    };
};

//Return singleton instance
module.exports = new MFPClient();