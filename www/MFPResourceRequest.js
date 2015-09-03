var exec = require("cordova/exec");

var MFPResourceRequest = function(_url, _method) {
	var success = function(msg) { console.log("MFPResourceRequest: success " + msg); };
	var failure = function(msg) { console.log("MFPResourceRequest: failure " + msg) };

	this.TAG = "javascript-MFPRequest ";

	this.headers = new Object();
	this.formParameters = new Object();
	this.url = _url;
	this.method = _method;
	this.timeout = 60000;

	/**
	 * Add a new header ([key] => value pair) to this instance
	 * @param name
	 * @param value
	 */
	this.addHeader = function(name, value) {
		console.log(this.TAG + "addHeader()");
		this.headers[name] = value;
	};

	/**
	 *	Modify an existing header value only if name already exists
	 * @param name
	 * @param value
	 */
	this.setHeader = function(name, value) {
		console.log(this.TAG + "setHeader()");
		if ( !(name in this.headers) ) {
			this.headers[name] = value;
		}
	};

	/**
	 * Remove all values associated with this name from the header
	 * @param name
	 */
	this.removeHeaders = function(name) {
		console.log(this.TAG + "removeHeaders()");
		delete this.headers[name];
	};

	/**
	 * Returns all the header names (i.e. a list of keys) associated with this instance
	 * @returns {String}
	 */
	this.getHeaderNames = function() {
		console.log(this.TAG + "getHeaderNames()");
		var keys = [];
		for (var key in this.headers) {
			if (dictionary.hasOwnProperty(key)) {
				keys.push(key);
			}
		}
		return keys;
	};

	/**
	 * Return the header value (or the first, if multiple values) associated with the header name
	 * @param name
	 * @returns {null, string}
	 */
	this.getHeader = function(name) {
		console.log(this.TAG + "getHeader()");
		// TODO: Should header[name] return a list? then should we return the [0]th object?
		return this.header[name];
	};

	/**
	 *
	 * @param name
	 * @returns {null, string}
	 */
	this.getHeaders = function(name) {
		console.log(this.TAG + "getHeaders()");
		//TODO: Confirm getHeader() is correct, then confirm this method is correct as well.
		return this.header[name];
	};
	/**
	 * Returns the entire header dictionary object
	 * @returns null, JSON
	 */
	this.getAllHeaders = function() {
		console.log(this.TAG + "getAllHeaders()");
		return this.headers;
	};

	/**
	 *
	 * @returns {string}
	 */
	this.getUrl = function() {
		console.log(this.TAG + "getUrl()");
		return this.url;
	};

	/**
	 *
	 * @returns {string}
	 */
	this.getMethod = function() {
		console.log(this.TAG + "getMethod()");
		return this.method;
	};

	/**
	 *
	 * @param timeout
	 */
	this.setTimeout = function(_timeout) {
		console.log(this.TAG + "setTimeout()");
		this.timeout = _timeout;
	};

	/**
	 *
	 * @returns {number}
	 */
	this.getTimeout = function() {
		console.log(this.TAG + "getTimeout()");
		return this.timeout;
	};

	/**
	 *
	 * @returns JSON
	 */
	this.getQueryParameters = function() {
		console.log(this.TAG + "getQueryParameters()");
		//cordova.exec(success, failure, "MFPResourceRequest", "getQueryParameters", []);
	};

	/**
	 *
	 * @param name
	 * @param value
	 */
	this.setQueryParameter = function(name, value) {
		console.log(this.TAG + "log: setQueryParameter(name, value)");
		//cordova.exec(success, failure, "MFPResourceRequest", "setQueryParameters", [name, value]);
	};

	/**
	 *
	 * @param json_object
	 */
	this.setQueryParameters = function(jsonobject) {
		console.log(this.TAG + "log: setQueryParameters(jsonObj)");
		//cordova.exec(success, failure, "MFPResourceRequest", "setQueryParameters", [jsonobject]);
	};

	/**
	 *
	 * @param arg
	 */
	this.send = function(arg) {
		console.log(this.TAG + "send()");
		if (typeof arg === "undefined") {
			// send :: Promise
			console.log(this.TAG + "send : no arguments");
			cordova.exec(success, failure, "MFPResourceRequest", "send", [buildTheRequest()]);
		} else if (typeof arg === "string") {
			// send :: String -> Promise
			console.log(this.TAG + "send : string");
			cordova.exec(success, failure, "MFPResourceRequest", "send", [arg]);
		} else if (typeof arg === "object") {
			// send :: Object -> Promise
			console.log(this.TAG + "send : object");
			cordova.exec(success, failure, "MFPResourceRequest", "send", [arg]);
		}
	};

	this.getBuild = function() {
		return buildTheRequest();
	};

	var buildTheRequest = function() {
		var req = new Object();
		req.url = this.getUrl();
		req.method = this.getMethod();
		req.headers = this.getAllHeaders();
		req.timeout = this.getTimeout();

		console.log(this.TAG + " this.getMethod: " + this.getMethod() + " this.method: " + this.method);
		console.log(this.TAG + " The request is: " + JSON.stringify(req));
		return req;
	};

	/**
	 *
	 * @param jsonObj
	 */
	this.sendFormParameters = function(jsonObj) {
		console.log(this.TAG + "sendFormParameters()");
		//cordova.exec(success, failure, "MFPResourceRequest", "sendFormParameters", [jsonObj]);
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