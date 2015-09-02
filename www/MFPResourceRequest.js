var exec = require("cordova/exec");

var MFPResourceRequest = function(_url, _method) {
	var success = function(msg) { console.log("MFPResourceRequest: success " + msg); };
	var failure = function(msg) { console.log("MFPResourceRequest: failure " + msg) };

	this.TAG = "javascript-MFPRequest";

	this.headers = new Object();
	this.url = _url;
	this.method = _method;
	this.timeout;

	/**
	 *
	 * @param name
	 * @param value
	 */
	this.addHeader = function(name, value) {
		console.log(this.TAG + " addHeader()");
		//cordova.exec(success, failure, "MFPResourceRequest", "addHeader", [name, value]);
		this.headers[name] = value;
	};

	/**
	 *
	 * @param name
	 * @param value
	 */
	this.setHeader = function(name, value) {
		console.log(this.TAG + " setHeader()");
		//cordova.exec(success, failure, "MFPResourceRequest", "setHeader", [name, value]);
		this.headers[name] = value;
	};

	/**
	 *
	 * @param name
	 */
	this.removeHeaders = function(name) {
		console.log(this.TAG + " removeHeaders()");
		//cordova.exec(success, failure, "MFPResourceRequest", "removeHeaders", [name]);
		delete this.headers[name];
	};

	/**
	 *
	 * @returns {String}
	 */
	this.getHeaderNames = function() {
		console.log(this.TAG + " getHeaderNames()");
		cordova.exec(success, failure, "MFPResourceRequest", "getHeaderNames", []);
		return this.headers;
	};

	/**
	 *
	 * @param name
	 * @returns {null, string}
	 */
	this.getHeader = function(name) {
		console.log(this.TAG + " getHeader()");
		cordova.exec(success, failure, "MFPResourceRequest", "getHeader", [name]);
		return this.header[name];
	};

	/**
	 *
	 * @param name
	 * @returns {null, string}
	 */
	this.getHeaders = function(name) {
		console.log(this.TAG + " getHeaders()");
		cordova.exec(success, failure, "MFPResourceRequest", "getHeaders", [name]);
		return [null];
	};
	/**
	 *
	 * @returns null, JSON
	 */
	this.getAllHeaders = function() {
		console.log(this.TAG + " getAllHead()");
		//cordova.exec(success, failure, "MFPResourceRequest", "getAllHeaders", [name]);
		return this.headers;
	};

	/**
	 *
	 * @returns {string}
	 */
	this.getUrl = function() {
		console.log(this.TAG + " getUrl()");
		//cordova.exec(success, failure, "MFPResourceRequest", "getUrl", []);
		return this.url;
	};

	/**
	 *
	 * @returns {string}
	 */
	this.getMethod = function() {
		console.log(this.TAG + " getMethod()");
		//cordova.exec(success, failure, "MFPResourceRequest", "getMethod", []);
		return this.method;
	};

	/**
	 *
	 * @param timeout
	 */
	this.setTimeout = function(_timeout) {
		console.log(this.TAG + " setTimeout()");
		//cordova.exec(success, failure, "MFPResourceRequest", "setTimeout", [timeout]);
		this.timeout = _timeout;
	};

	/**
	 *
	 * @returns {number}
	 */
	this.getTimeout = function() {
		console.log(this.TAG + " getTimeout()");
		//cordova.exec(success, failure, "MFPResourceRequest", "getTimeout", []);
		return this.timeout;
	};

	/**
	 *
	 * @returns JSON
	 */
	this.getQueryParameters = function() {
		console.log(this.TAG + " getQueryParameters()");
		cordova.exec(success, failure, "MFPResourceRequest", "getQueryParameters", []);
	};

	/**
	 *
	 * @param name
	 * @param value
	 */
	this.setQueryParameter = function(name, value) {
		console.log("log: setQueryParameter(name, value)");
		//cordova.exec(success, failure, "MFPResourceRequest", "setQueryParameters", [name, value]);
	};

	/**
	 *
	 * @param json_object
	 */
	this.setQueryParameters = function(jsonobject) {
		console.log("log: setQueryParameters(jsonObj)");
		//cordova.exec(success, failure, "MFPResourceRequest", "setQueryParameters", [jsonobject]);
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
			cordova.exec(success, failure, "MFPResourceRequest", "send", [this.buildRequest()]);
		} else if (typeof arg === "string") {
			// send :: String -> Promise
			console.log("send : string");
			cordova.exec(success, failure, "MFPResourceRequest", "send", [arg]);
		} else if (typeof arg === "object") {
			// send :: Object -> Promise
			console.log("send : object");
			cordova.exec(success, failure, "MFPResourceRequest", "send", [arg]);
		}
	};

	this.buildRequest = function() {
		var req = new Object();
		req.url = this.getUrl();
		req.method = this.getMethod();
		req.headers = this.getAllHeaders();
		req.timeout = this.getTimeout();

		console.log("this.getMethod: " + this.getMethod() + " this.method: " + this.method);

		console.log("The request is: " + JSON.stringify(req));
		return req;
	}

	/**
	 *
	 * @param jsonObj
	 */
	this.sendFormParameters = function(jsonObj) {
		console.log(this.TAG + " sendFormParameters()");
		cordova.exec(success, failure, "MFPResourceRequest", "sendFormParameters", [jsonObj]);
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
MFPResourceRequest.GET = "GET";
MFPResourceRequest.PUT = "PUT";
MFPResourceRequest.POST = "POST";
MFPResourceRequest.DELETE = "DELETE";

module.exports = MFPResourceRequest;