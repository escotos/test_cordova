cordova.define("ibm-mfp-core.MFPResourceRequest", function(require, exports, module) { var exec = require("cordova/exec");

var MFPResourceRequest = function(url, method) {
	this.TAG = "javascript-MFPResourceRequest ";

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
		if( !(name in this._headers) ) {
			this._headers[name] = [];
		}
		this._headers[name].push(value);
	};

	/**
	 *	Destructively modify an existing header name
	 * @param name
	 * @param value
	 */
	this.setHeader = function(name, value) {
		this._headers[name] = [];
		this._headers[name].push(value);
	};

	/**
	 * Remove all values associated with this name from the header
	 * @param name
	 */
	this.removeHeaders = function(name) {
		this._headers[name] = [];
		delete this._headers[name];
	};

	/**
	 * Returns all the header names (i.e. a list of keys) associated with this instance
	 * @returns {String}
	 */
	this.getHeaderNames = function() {
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
		return this._headers[name][0];
	};

	/**
	 * Return a list of the value or all the values associated with the given header name
	 * @param name
	 * @returns {null, string}
	 */
	this.getHeaders = function(name) {
		return this._headers[name];
	};

	/**
	 * Returns the entire header dictionary object
	 * @returns null, JSON
	 */
	this.getAllHeaders = function() {
		return this._headers;
	};

	/**
	 *
	 * @returns {string}
	 */
	this.getUrl = function() {
		return this._url;
	};

	/**
	 *
	 * @returns {string}
	 */
	this.getMethod = function() {
		return this._method;
	};

	/**
	 *
	 * @param timeout
	 */
	this.setTimeout = function(timeout) {
		this._timeout = timeout;
	};

	/**
	 *
	 * @returns {number}
	 */
	this.getTimeout = function() {
		return this._timeout;
	};

	/**
	 *
	 * @returns JSON
	 */
	this.getQueryParameters = function() {
		return this._queryParameters;
	};

	/**
	 *
	 * @param name
	 * @param value
	 */
	this.setQueryParameter = function(name, value) {
		this._queryParameters[name] = value;
	};

	/**
	 *
	 * @param json_object
	 */
	this.setQueryParameters = function(jsonquery) {
		this._queryParameters = jsonquery;
	};

	/**
	 *
	 * @param arg
	 * @returns Promise
	 */
	this.send = function(arg, success, failure) {
		if (typeof arg === "function") {
			// Empty argument
			failure = success;
			success = arg;
			console.log(this.TAG + " send with empty body");
			cordova.exec(this.callbackWrap.bind(this, success), this.callbackWrap.bind(this, failure), "MFPResourceRequest", "send", [this.buildJSONRequest()]);
		} else if (typeof arg === "string" || typeof arg === "object") {
			// Input = String or JSON
			console.log(this.TAG + " send with string or object for the body");
			cordova.exec(this.callbackWrap.bind(this, success), this.callbackWrap.bind(this, failure), "MFPResourceRequest", "send", [this.buildJSONRequest(arg)]);
		}
	};

	/**
	 *
	 * @param jsonObj
	 */
	this.sendFormParameters = function(jsonObj, success, failure) {
		console.log(this.TAG + "sendFormParameters()");
		cordova.exec(success, failure, "MFPResourceRequest", "sendFormParameters", [this.buildJSONRequest(jsonObj)]);
	};

	this.callbackWrap = function(callback, jsonResponse) {
		var response = this.buildMFPResponse(JSON.parse(jsonResponse));
		callback(response);
	};

	this.buildJSONRequest = function(body) {
		var request = {};

		request.url 			= this.getUrl();
		request.method 			= this.getMethod();
		request.headers 		= this.getAllHeaders();
		request.timeout 		= this.getTimeout();
		request.queryParameters = this.getQueryParameters();
		request.body			= "";

		if (typeof body === "string" || typeof body === "object") {
			request.body = body;
		}
		console.log(this.TAG + " The request is: " + JSON.stringify(request));
		return request;
	};

	this.buildMFPResponse = function(jsResponse) {
		var response = new MFPResponse();
		response.httpStatus = jsResponse.httpStatus;
		response.responseText = jsResponse.responseText;
		response.responseJSON = jsResponse.responseJSON;
		response.headers = JSON.parse(jsResponse.headers);

		console.log(this.TAG + "response.httpStatus = " + response.httpStatus);
		console.log(this.TAG + "response.responseText = " + response.responseText);
		console.log(this.TAG + "response.responseJSON = " + JSON.stringify(response.responseJSON));
		console.log(this.TAG + "response.headers = " + JSON.stringify(response.headers));

		return response;
	};

	// TODO: Should we create an MFPResponse instance from a JSON object?
	var MFPResponse = function() {
		this.httpStatus = "";
		this.responseText = "";
		this.responseJSON = {};
		this.errorCode = "";
		this.errorDescription = "";
		this._headers = {};

		this.getAllHeaders = function() { return this._headers; };
		this.getHeaderNames = function() {
			var keyNames = [];
			for (var key in this._headers) {
				if (this._headers.hasOwnProperty(key)) {
					keyNames.push(key);
				}
			}
			return keyNames;
		};
		this.getHeader = function(name) { return this._headers[name][0]; };
		this.getHeaders = function(name) { return this._headers[name]; };
	};
};
MFPResourceRequest.GET = "GET";
MFPResourceRequest.PUT = "PUT";
MFPResourceRequest.POST = "POST";
MFPResourceRequest.DELETE = "DELETE";

module.exports = MFPResourceRequest;
});
