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
			it('MFPClient', function() {
				MFPClient.initialize("", "");
				//MFPClient
			});
		});

		describe('MFPResourceRequest method definitions', function() {
			it('MFPResourceRequest should exist', function() {
				expect(MFPResourceRequest).toBeDefined();
			});

			it('MFPResourceRequest.addHeader() should exist and is a function', function() {
				expect(typeof MFPResourceRequest.addHeader).toBeDefined();
				expect(typeof MFPResourceRequest.addHeader == 'function').toBe(true);
			});
			it('MFPResourceRequest.setHeader() should exist and is a function', function() {
				expect(typeof MFPResourceRequest.setHeader).toBeDefined();
				expect(typeof MFPResourceRequest.setHeader == 'function').toBe(true);
			});
			it('MFPResourceRequest.removeHeaders() should exist and is a function', function() {
				expect(typeof MFPResourceRequest.removeHeaders).toBeDefined();
				expect(typeof MFPResourceRequest.removeHeaders == 'function').toBe(true);
			});
			it('MFPResourceRequest.getHeaderNames() should exist and is a function', function() {
				expect(typeof MFPResourceRequest.getHeaderNames).toBeDefined();
				expect(typeof MFPResourceRequest.getHeaderNames == 'function').toBe(true);
			});
			it('MFPResourceRequest.getHeader() should exist and is a function', function() {
				expect(typeof MFPResourceRequest.getHeader).toBeDefined();
				expect(typeof MFPResourceRequest.getHeader == 'function').toBe(true);
			});
			it('MFPResourceRequest.getheaders() should exist and is a function', function() {
				expect(typeof MFPResourceRequest.getheaders).toBeDefined();
				expect(typeof MFPResourceRequest.getheaders == 'function').toBe(true);
			});
			it('MFPResourceRequest.getAllHeaders() should exist and is a function', function() {
				expect(typeof MFPResourceRequest.getAllHeaders).toBeDefined();
				expect(typeof MFPResourceRequest.getAllHeaders == 'function').toBe(true);
			});
			it('MFPResourceRequest.getUrl() should exist and is a function', function() {
				expect(typeof MFPResourceRequest.getUrl).toBeDefined();
				expect(typeof MFPResourceRequest.getUrl == 'function').toBe(true);
			});
			it('MFPResourceRequest.getMethod() should exist and is a function', function() {
				expect(typeof MFPResourceRequest.getMethod).toBeDefined();
				expect(typeof MFPResourceRequest.getMethod == 'function').toBe(true);
			});
			it('MFPResourceRequest.setTimeout() should exist and is a function', function() {
				expect(typeof MFPResourceRequest.setTimeout).toBeDefined();
				expect(typeof MFPResourceRequest.setTimeout == 'function').toBe(true);
			});
			it('MFPResourceRequest.getTimeout() should exist and is a function', function() {
				expect(typeof MFPResourceRequest.getTimeout).toBeDefined();
				expect(typeof MFPResourceRequest.getTimeout == 'function').toBe(true);
			});
			it('MFPResourceRequest.getQueryParameters() should exist and is a function', function() {
				expect(typeof MFPResourceRequest.getQueryParameters).toBeDefined();
				expect(typeof MFPResourceRequest.getQueryParameters == 'function').toBe(true);
			});
			it('MFPResourceRequest.setQueryParameter() should exist and is a function', function() {
				expect(typeof MFPResourceRequest.setQueryParameter).toBeDefined();
				expect(typeof MFPResourceRequest.setQueryParameter == 'function').toBe(true);
			});
			it('MFPResourceRequest.setQueryParameters() should exist and is a function', function() {
				expect(typeof MFPResourceRequest.setQueryParameters).toBeDefined();
				expect(typeof MFPResourceRequest.setQueryParameters == 'function').toBe(true);
			});
		});

	});
};