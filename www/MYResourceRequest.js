/**
 * Created by lnickers on 9/18/15.
 */

// Constructor
var MyResourceRequest = function (id) {
// instance vars
    this.id = id;
    this.variable = null;
    this.num = 5;
    this.str = "";
    this.arr = [];
    this.obj = {}
};


MyResourceRequest.prototype = function () {
    //this.id = "wrong id";
    function privateMethod (){console.log("Private Method Called with id: " + this.id)};

    var setNum = function(num){this.num = num;};

    var method1 = function(){

        var pm = privateMethod.bind(this);
        pm();

        console.log("method1 called from id:" + "(" + this.id +") " + this.num)
    };
    var method2 = function(){

        var pm = privateMethod.bind(this);
        pm();

        console.log("method2 called from id:" + "(" + this.id +") " + this.num)
    };

    return {
        setNum: setNum,
        method1: method1,
        method2: method2
    }
}();

var req1 = new MyResourceRequest(1);
req1.method1();
req1.setNum(11111);
req1.method2();

console.log("calling req2...");
var req2 = new MyResourceRequest(2);
req2.method1();
req2.setNum(2222);
req2.method2();

console.log("calling req1 again...");
req1.method1();
req1.method2();

console.log("calling req2 again...");
req2.method1();
req2.method2();