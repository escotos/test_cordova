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
			xit('should...', function() {
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

		describe('MFPResourceRequest\' behavior', function() {
			xit('should', function() {
				MFPClient.initialize("", "");
				//MFPClient
			});
		});

	});
};