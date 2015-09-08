exports.defineAutoTests = function () {
	describe('MFPCore test suite', function () {

		describe('MFPClient method definitions', function() {

			it('MFPClient should exist', function(){
				expect(MFPClient).toBeDefined();
			});

			it('MFPClient.initialize() should exist and is a function', function(){
				expect(typeof MFPClient.initialize).toBeDefined();
				expect(typeof MFPClient.initialize == 'function').toBe(true);
			});

			it('MFPClient.registerAuthenticationListener() should exist and is a function', function(){
				expect(typeof MFPClient.registerAuthenticationListener).toBeDefined();
				expect(typeof MFPClient.registerAuthenticationListener == 'function').toBe(true);
			});

			it('MFPClient.unregisterAuthenticationListener() should exist and is a function', function(){
				expect(typeof MFPClient.unregisterAuthenticationListener).toBeDefined();
				expect(typeof MFPClient.unregisterAuthenticationListener == 'function').toBe(true);
			});

			it('MFPClient.version() should exist and is a function', function(){
				expect(typeof MFPClient.version).toBeDefined();
				expect(typeof MFPClient.version == 'function').toBe(true);
			});
		});

		describe('MFPClient behavior', function() {
			//TODO: Pending
			xit('TODO: should...', function() {
				MFPClient.initialize("", "");
				//MFPClient
			});
		});

		describe('MFPResourceRequest method definitions', function() {
			var testRequest;

			beforeEach(function () {
				testRequest = new MFPResourceRequest("url_test", "guid_test");
			});

			it('MFPResourceRequest should exist', function() {
				expect(MFPResourceRequest).toBeDefined();
			});

			it('MFPResourceRequest.addHeader() should exist and is a function', function() {
				expect(typeof testRequest.addHeader).toBeDefined();
				expect(typeof testRequest.addHeader == 'function').toBe(true);
			});
			it('MFPResourceRequest.setHeader() should exist and is a function', function() {
				expect(typeof testRequest.setHeader).toBeDefined();
				expect(typeof testRequest.setHeader == 'function').toBe(true);
			});
			it('MFPResourceRequest.removeHeaders() should exist and is a function', function() {
				expect(typeof testRequest.removeHeaders).toBeDefined();
				expect(typeof testRequest.removeHeaders == 'function').toBe(true);
			});
			it('MFPResourceRequest.getHeaderNames() should exist and is a function', function() {
				expect(typeof testRequest.getHeaderNames).toBeDefined();
				expect(typeof testRequest.getHeaderNames == 'function').toBe(true);
			});
			it('MFPResourceRequest.getHeader() should exist and is a function', function() {
				expect(typeof testRequest.getHeader).toBeDefined();
				expect(typeof testRequest.getHeader == 'function').toBe(true);
			});
			it('MFPResourceRequest.getheaders() should exist and is a function', function() {
				expect(typeof testRequest.getHeaders).toBeDefined();
				expect(typeof testRequest.getHeaders == 'function').toBe(true);
			});
			it('MFPResourceRequest.getAllHeaders() should exist and is a function', function() {
				expect(typeof testRequest.getAllHeaders).toBeDefined();
				expect(typeof testRequest.getAllHeaders == 'function').toBe(true);
			});
			it('MFPResourceRequest.getUrl() should exist and is a function', function() {
				expect(typeof testRequest.getUrl).toBeDefined();
				expect(typeof testRequest.getUrl == 'function').toBe(true);
			});
			it('MFPResourceRequest.getMethod() should exist and is a function', function() {
				expect(typeof testRequest.getMethod).toBeDefined();
				expect(typeof testRequest.getMethod == 'function').toBe(true);
			});
			it('MFPResourceRequest.setTimeout() should exist and is a function', function() {
				expect(typeof testRequest.setTimeout).toBeDefined();
				expect(typeof testRequest.setTimeout == 'function').toBe(true);
			});
			it('MFPResourceRequest.getTimeout() should exist and is a function', function() {
				expect(typeof testRequest.getTimeout).toBeDefined();
				expect(typeof testRequest.getTimeout == 'function').toBe(true);
			});
			it('MFPResourceRequest.getQueryParameters() should exist and is a function', function() {
				expect(typeof testRequest.getQueryParameters).toBeDefined();
				expect(typeof testRequest.getQueryParameters == 'function').toBe(true);
			});
			it('MFPResourceRequest.setQueryParameter() should exist and is a function', function() {
				expect(typeof testRequest.setQueryParameter).toBeDefined();
				expect(typeof testRequest.setQueryParameter == 'function').toBe(true);
			});
			it('MFPResourceRequest.setQueryParameters() should exist and is a function', function() {
				expect(typeof testRequest.setQueryParameters).toBeDefined();
				expect(typeof testRequest.setQueryParameters == 'function').toBe(true);
			});
		});

		describe('MFPResourceRequest behavior', function() {
			var testRequest;
			var DEFAULT_TIMEOUT = 60000;

			beforeEach(function() {
				testRequest = new MFPResourceRequest("http://www.google.com", MFPResourceRequest.GET);
			});

			it('should correctly instantiate a request with the appropriate properties', function() {
				expect(testRequest._url).toBe("http://www.google.com");
				expect(testRequest._method).toBe(MFPResourceRequest.GET);
			});

			xit('should add a header with addHeader', function() {});

			xit('should change headers with setHeader', function() {});

			xit('should remove headers with removeHeaders', function() {});

			xit('should retrieve header value with getHeader', function() {});

			xit('should retrieve a list of headers with getHeaderNames', function() {});

			xit('should retrieve list of ALL headers with getAllHeaders', function() {});

			it('should retrieve the url with getUrl', function() {
				expect(testRequest.getUrl()).toBe("http://www.google.com");
			});

			it('should retrieve the method with getMethod', function() {
				expect(testRequest.getMethod()).toBe(MFPResourceRequest.GET);
			});

			it('should set the timeout with setTimeout', function() {
				testRequest.setTimeout(45*1000);
				expect(testRequest._timeout).toBe(45000);
			});

			it('should retrieve the timeout with getTimeout', function() {
				expect(testRequest.getTimeout()).toBe(DEFAULT_TIMEOUT);
			});

			it('should set a query parameter with setQueryParameter', function() {
				testRequest.setQueryParameter("singlequery", "singlevalue");
				expect(testRequest.getQueryParameters()).toEqual({singlequery: "singlevalue"});
			});

			it('should set the query parameters with setQueryParameters', function() {
				testRequest.setQueryParameters({"somequery": "somevalue", "anotherquery": "anothervalue"});
				expect(testRequest._queryParameters).toEqual({"somequery": "somevalue", "anotherquery": "anothervalue"});
			});

			it('should retrieve the list of query parameters with getQueryParameters', function() {
				testRequest._queryParameters["somequery"] = "somevalue";
				testRequest._queryParameters["anotherquery"] = "anothervalue";
				expect(testRequest.getQueryParameters()).toEqual({"somequery": "somevalue", "anotherquery": "anothervalue"});
			});

			xit('should correctly send a request with send', function() {});

			xit('should correctly send a form request with sendFormParameters', function() {});

			it('buildTheRequest - private method - should build and return an object correctly', function() {
				var serializedRequest = testRequest.buildTheRequest();

				expect(serializedRequest.url).toBe(testRequest.getUrl());
				expect(serializedRequest.method).toBe(testRequest.getMethod());
				expect(serializedRequest.headers).toBe(testRequest.getAllHeaders());
				expect(serializedRequest.timeout).toBe(testRequest.getTimeout());
				expect(serializedRequest.queryParameters).toBe(testRequest.getQueryParameters());
			});
		});

	});
};