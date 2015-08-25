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

var MFPClient = function() {
	//Return null
    this.initialize = function(backendRoute, backendGuid) {};
	//Return null
    this.registerAuthenticationListener = function(realm, authenticationListener) {};
    //Return null
	this.unregisterAuthenticationListener = function(authenticationListener) {};
    //Return string
	this.version = function() { return "0.0.1"; };
};

module.exports = new MFPClient();