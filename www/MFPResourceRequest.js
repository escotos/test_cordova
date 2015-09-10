cordova.define("ibm-mfp-core.MFPResourceRequest", function(require, exports, module) { var exec = require("cordova/exec");

var MFPResourceRequest = function(url, method) {
	this.TAG = "javascript-MFPRequest ";

	this._headers = {};
	this._queryParameters = {};
	this._url = url;
	this._method = method;
	this._timeout = 60000;

	/**
	 * Add a new header ([key] => value pair) to this instance
	 * @param name
	 * @param value
	 */
	this.addHeader = function(name, value) {
		//console.log(this.TAG + "addHeader()");
		if( !(name in this._headers) ) {
			this._headers[name] = [];
		}
		this._headers[name].push(value);
	};

	/**
	 *	Modify an existing header name
	 * @param name
	 * @param value
	 */
	this.setHeader = function(name, value) {
		//console.log(this.TAG + "setHeader()");
		this._headers[name] = [];
		this._headers[name].push(value);
	};

	/**
	 * Remove all values associated with this name from the header
	 * @param name
	 */
	this.removeHeaders = function(name) {
		//console.log(this.TAG + "removeHeaders()");
		this._headers[name] = [];
		delete this._headers[name];
	};

	/**
	 * Returns all the header names (i.e. a list of keys) associated with this instance
	 * @returns {String}
	 */
	this.getHeaderNames = function() {
		//console.log(this.TAG + "getHeaderNames()");
		var keyNames = [];
		for (var key in this._headers) {
			if (this._headers.hasOwnProperty(key)) {
				keyNames.push(key);
			}
		}
		return keyNames;
	};

	/**
	 * Return the header value (or the first, if multiple values) associated with the header name
	 * @param name
	 * @returns {null, string}
	 */
	this.getHeader = function(name) {
		//console.log(this.TAG + "getHeader()");
		return this._headers[name][0];
	};

	/**
	 * Return a list of the value or all the values associated with the given header name
	 * @param name
	 * @returns {null, string}
	 */
	this.getHeaders = function(name) {
		//console.log(this.TAG + "getHeaders()");
		return this._headers[name];
	};
	/**
	 * Returns the entire header dictionary object
	 * @returns null, JSON
	 */
	this.getAllHeaders = function() {
		//console.log(this.TAG + "getAllHeaders()");
		return this._headers;
	};

	/**
	 *
	 * @returns {string}
	 */
	this.getUrl = function() {
		//console.log(this.TAG + "getUrl()");
		return this._url;
	};

	/**
	 *
	 * @returns {string}
	 */
	this.getMethod = function() {
		//console.log(this.TAG + "getMethod()");
		return this._method;
	};

	/**
	 *
	 * @param timeout
	 */
	this.setTimeout = function(timeout) {
		//console.log(this.TAG + "setTimeout()");
		this._timeout = timeout;
	};

	/**
	 *
	 * @returns {number}
	 */
	this.getTimeout = function() {
		//console.log(this.TAG + "getTimeout()");
		return this._timeout;
	};

	/**
	 *
	 * @returns JSON
	 */
	this.getQueryParameters = function() {
		//console.log(this.TAG + "getQueryParameters()");
		return this._queryParameters;
	};

	/**
	 *
	 * @param name
	 * @param value
	 */
	this.setQueryParameter = function(name, value) {
		//console.log(this.TAG + "log: setQueryParameter(name, value)");
		this._queryParameters[name] = value;
	};

	/**
	 *
	 * @param json_object
	 */
	this.setQueryParameters = function(jsonquery) {
		//console.log(this.TAG + "log: setQueryParameters(jsonObj)");
		this._queryParameters = jsonquery;
	};

	/**
	 *
	 * @param arg
	 * @returns Promise
	 */
	this.send = function(arg, success, failure) {
		console.log(this.TAG + "send()");
		if (typeof arg === "function") {
			// Empty argument
			console.log(this.TAG + "send : no arguments");
			cordova.exec(success, failure, "MFPResourceRequest", "send", [this.buildRequest()]);
		} else if (typeof arg === "string" || typeof arg === "object") {
			// Input = String or JSON
			console.log(this.TAG + "send : string or object");
			cordova.exec(success, failure, "MFPResourceRequest", "send", [this.buildRequest(arg)]);
		}
	};

	/**
	 *
	 * @param jsonObj
	 */
	this.sendFormParameters = function(jsonObj, success, failure) {
		console.log(this.TAG + "sendFormParameters()");
		cordova.exec(success, failure, "MFPResourceRequest", "sendFormParameters", [this.buildRequest(jsonObj)]);
	};

	this.buildRequest = function(body) {
		var req = {};

		req.url 			= this.getUrl();
		req.method 			= this.getMethod();
		req.headers 		= this.getAllHeaders();
		req.timeout 		= this.getTimeout();
		req.queryParameters = this.getQueryParameters();

		if (typeof body === "string" || typeof body === "object") {
			req.body = body;
		}
		console.log(this.TAG + " The request is: " + JSON.stringify(req));
		return req;
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
});
