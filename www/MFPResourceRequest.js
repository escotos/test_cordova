var exec = require("cordova/exec");

var MFPResourceRequest = function(url, method) {
	var success = function(msg) { console.log("MFPResourceRequest: success " + msg); };
	var failure = function(msg) { console.log("MFPResourceRequest: failure " + msg) };

	this.GET = "GET";
	this.PUT = "PUT";
	this.POST = "POST";
	this.DELETE = "DELETE";

	this.TAG = "javascript-MFPRequest";

	/**
	 *
	 * @param name
	 * @param value
	 */
	this.addHeader = function(name,value) {
		console.log(this.TAG + " addHeader()");
		cordova.exec(success, failure, "MFPCore", "addHeader", [name, value]);
	};

	/**
	 *
	 * @param name
	 * @param value
	 */
	this.setHeader = function(name,value) {
		console.log(this.TAG + " setHeader()");
		cordova.exec(success, failure, "MFPCore", "setHeader", [name, value]);
	};

	/**
	 *
	 * @param name
	 */
	this.removeHeaders = function(name) {
		console.log(this.TAG + " removeHeaders()");
		cordova.exec(success, failure, "MFPCore", "setHeader", [name]);
	};

	/**
	 *
	 * @returns {String}
	 */
	this.getHeaderNames = function() {
		console.log(this.TAG + " getHeaderNames()");
		cordova.exec(success, failure, "MFPCore", "getHeaderNames", []);
		return [];
	};

	/**
	 *
	 * @param name
	 * @returns {null, string}
	 */
	this.getHeader = function(name) {
		console.log(this.TAG + " getHeader()");
		cordova.exec(success, failure, "MFPCore", "getHeader", [name]);
	};

	/**
	 *
	 * @param name
	 * @returns {null, string}
	 */
	this.getHeaders = function(name) {
		console.log(this.TAG + " getHeaders()");
		cordova.exec(success, failure, "MFPCore", "getHeaders", [name]);
		return [null];
	};
	/**
	 *
	 * @returns null, JSON
	 */
	this.getAllHeaders = function() {
		console.log(this.TAG + " getAllHead()");
		cordova.exec(success, failure, "MFPCore", "getAllHeaders", [name]);
	};

	/**
	 *
	 * @returns {string}
	 */
	this.getUrl = function() {
		console.log(this.TAG + " getUrl()");
		cordova.exec(success, failure, "MFPCore", "getUrl", []);
	};

	/**
	 *
	 * @returns {string}
	 */
	this.getMethod = function() {
		console.log(this.TAG + " getMethod()");
		cordova.exec(success, failure, "MFPCore", "getMethod", []);
	};

	/**
	 *
	 * @param timeout
	 */
	this.setTimeout = function(timeout) {
		console.log(this.TAG + " setTimeout()");
		cordova.exec(success, failure, "MFPCore", "setTimeout", [timeout]);
	};

	/**
	 *
	 * @returns {number}
	 */
	this.getTimeout = function() {
		console.log(this.TAG + " getTimeout()");
		cordova.exec(success, failure, "MFPCore", "getTimeout", []);
	};

	/**
	 *
	 * @returns JSON
	 */
	this.getQueryParameters = function() {
		console.log(this.TAG + " getQueryParameters()");
		cordova.exec(success, failure, "MFPCore", "getQueryParameters", []);
	};

	/**
	 *
	 * @param name
	 * @param value
	 */
	this.setQueryParameter = function(name, value) {
		console.log("log: setQueryParameter(name, value)");
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
		console.log(this.TAG + " send()");
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
		console.log(this.TAG + " sendFormParameters()");
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