var exec = require("cordova/exec");

var MFPResourceRequest = function(url, method) {
	var success = function(msg) { console.log("MFPResourceRequest: success " + msg); };
	var failure = function(msg) { console.log("MFPResourceRequest: failure " + msg) };

	this.GET = "GET";
	this.PUT = "PUT";
	this.POST = "POST";
	this.DELETE = "DELETE";

	/**
	 *
	 * @param name
	 * @param value
	 */
	this.addHeader = function(name,value) {
		cordova.exec(success, failure, "MFPCore", "addHeader", [name, value]);
	};

	/**
	 *
	 * @param name
	 * @param value
	 */
	this.setHeader = function(name,value) {
		cordova.exec(success, failure, "MFPCore", "setHeader", [name, value]);
	};

	/**
	 *
	 * @param name
	 */
	this.removeHeaders = function(name) {
		cordova.exec(success, failure, "MFPCore", "setHeader", [name]);
	};

	/**
	 *
	 * @returns {String}
	 */
	this.getHeaderNames = function() {
		cordova.exec(success, failure, "MFPCore", "getHeaderNames", []);
		return [];
	};

	/**
	 *
	 * @param name
	 * @returns {null, string}
	 */
	this.getHeader = function(name) {
		cordova.exec(success, failure, "MFPCore", "getHeader", [name]);
	};

	/**
	 *
	 * @param name
	 * @returns {null, string}
	 */
	this.getHeaders = function(name) {
		cordova.exec(success, failure, "MFPCore", "getHeaders", [name]);
		return [null];
	};
	/**
	 *
	 * @returns null, JSON
	 */
	this.getAllHeaders = function() {
		cordova.exec(success, failure, "MFPCore", "getAllHeaders", [name]);
	};

	/**
	 *
	 * @returns {string}
	 */
	this.getUrl = function() {
		cordova.exec(success, failure, "MFPCore", "getUrl", []);
	};

	/**
	 *
	 * @returns {string}
	 */
	this.getMethod = function() {
		cordova.exec(success, failure, "MFPCore", "getMethod", []);
	};

	/**
	 *
	 * @param timeout
	 */
	this.setTimeout = function(timeout) {
		cordova.exec(success, failure, "MFPCore", "setTimeout", []);
	};

	/**
	 *
	 * @returns {number}
	 */
	this.getTimeout = function() {
		cordova.exec(success, failure, "MFPCore", "getTimeout", []);
	};

	/**
	 *
	 * @returns JSON
	 */
	this.getQueryParameters = function() {
		cordova.exec(success, failure, "MFPCore", "getQueryParameters", []);
	};

	/**
	 *
	 * @param name
	 * @param value
	 */
	this.setQueryParameter = function(name, value) {
		console.log("log: setQueryParameters(name, value)");
		cordova.exec(success, failure, "MFPCore", "setQueryParameters", [name, value]);
	}

	/**
	 *
	 * @param json_object
	 */
	this.setQueryParameters = function(json_object) {
		console.log("log: setQueryParameters(jsonObj)");
		cordova.exec(success, failure, "MFPCore", "setQueryParameters", [json_object]);
	};

	/**
	 *
	 * @param arg
	 */
	this.send = function(arg) {
		if (typeof arg === "undefined") {
			// send :: Promise
			console.log("send : no arguments");
			cordova.exec(success, failure, "MFPCore", "send", []);

		} else if (typeof arg === "string") {
			// send :: String -> Promise
			console.log("send : string");
			cordova.exec(success, failure, "MFPCore", "send", [arg]);
		} else if (typeof arg === "object") {
			// send :: Object -> Promise
			console.log("send : object");
			cordova.exec(success, failure, "MFPCore", "send", [arg]);
		}
	};

	/**
	 *
	 * @param jsonObj
	 */
	this.sendFormParameters = function(jsonObj) {
		cordova.exec(success, failure, "MFPCore", "sendFormParameters", [jsonObj]);
	};

	var MFPResponse = function(url, method) {
		this.httpStatus = 404;
		this.responseText = "";
		this.responseJSON = {};
		this.getAllHeaders = function() {};
		this.getHeaderNames = function() {};
		this.getHeader = function(name) {};
		this.getHeaders = function(name) {};
		this.errorCode = function() {};
		this.errorDescription = function() {};
	};

};

module.exports = MFPResourceRequest;