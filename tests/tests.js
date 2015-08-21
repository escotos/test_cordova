exports.defineAutoTests = function () {
	describe('MFPCore tests', function () {

		it('should exist', function(){
			expect(MFPClient).toBeDefined();
		});

		// this test is expected to fail, we did it for fun!!!
		xit('should not exist', function(){
			expect(MFPClient).not.toBeDefined();
		});
	});
};