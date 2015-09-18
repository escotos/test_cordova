var exec = require("cordova/exec");

var MFPResourceRequest = function(url, method, timeout) {
	this.TAG = "javascript-MFPResourceRequest ";

	this._headers = {};
	this._queryParameters = {};
	this._url = url;
	this._method = method;
	this._timeout = timeout || 30000;

	/**
	 *	Destructively modify an existing header name
	 * @param name
	 * @param value
	 */
	this.setHeaders = function(jsonObj) {
		//performant Deep Clone the json object
		this._headers = JSON.parse(JSON.stringify(jsonObj));
	};

	/**
	 * Return a list of the value or all the values associated with the given header name
	 * @param name
	 * @returns {null, string}
	 */
	this.getHeaders = function() {
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
	 * @param json_object
	 */
	this.setQueryParameters = function(jsonObj) {
		//performant Deep Clone the json object
		this._queryParameters = JSON.parse(JSON.stringify(jsonObj));
	};

	/**
	 *
	 * @param arg
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
	 * @param callback The Success or Failure callback
	 * @param jsonResponse string : The string-form JSON response coming from the Native SDK.
	 */
	this.callbackWrap = function(callback, jsonResponse) {
		var response = JSON.parse(jsonResponse);
		callback(response);
	};

	this.buildJSONRequest = function(body) {
		var request = {};

		request.url 			= this.getUrl();
		request.method 			= this.getMethod();
		request.headers 		= this.getHeaders();
		request.timeout 		= this.getTimeout();
		request.queryParameters = this.getQueryParameters();
		request.body			= "";

		if (typeof body === "string") {
			request.body = body;
		}
        else if (typeof body === "object"){
            request.body = JSON.stringify(body);
            if (!("Content-Type" in this._headers)){
                request.headers["Content-Type"] = "application/json";
            }
        }
        
		console.log(this.TAG + " The request is: " + JSON.stringify(request));
		return request;
	};

};
MFPResourceRequest.GET = "GET";
MFPResourceRequest.PUT = "PUT";
MFPResourceRequest.POST = "POST";
MFPResourceRequest.DELETE = "DELETE";
MFPResourceRequest.TRACE = "TRACE";
MFPResourceRequest.HEAD = "HEAD";
MFPResourceRequest.OPTIONS = "OPTIONS";

module.exports = MFPResourceRequest;