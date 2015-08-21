var exec = require("cordova/exec");

var MFPResourceRequest = function(url, method) {
	this.GET = "GET";
	this.PUT = "PUT";
	this.POST = "POST";
	this.DELETE = "DELETE";

	this.addHeader = function(name,value) {};
	this.setHeader = function(name,value) {};
	this.removeHeaders = function(name) {};
	this.getHeaderNames = function() {};
	this.getHeader = function(name) {};
	this.getHeaders = function(name) {};
	this.getAllHeaders = function() {};
	
	this.getUrl = function() {};
	this.getMethod = function() {};
	
	this.setTimeout = function(timeout) {};
	this.getTimeout = function() {};

	this.setQueryParameters = function(name_json, value) {
		if (typeof name_json !== "undefined") {
			
			if (typeof value !== "undefined") { 
			// setQueryParameters :: name -> value -> Null
				console.log("log: setQueryParameters(name, value)");
			} else {
			// setQueryParameters :: JsonObject -> Null
				console.log("log: setQueryParameters(jsonObj)");
			}
		}
	};

	this.send = function(arg) {
		if (typeof arg === "undefined") {
			// send :: Promise
			console.log("send : no arguments");

		} else if (typeof arg === "string") {
			// send :: String -> Promise
			console.log("send : string");

		} else if (typeof arg === "object") {
			// send :: Object -> Promise
			console.log("send : object");

		}
	};

	this.sendFormParameters = function(jsonObj) {};

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