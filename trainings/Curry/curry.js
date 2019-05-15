
function toArray(arr) {
    return Array.prototype.slice.call(arr);
}

Function.prototype.curry = function() {
    if (arguments.length < 1) {
        return this; //nothing to curry with - return function
    }

    var __method = this,
        args = toArray(arguments);

    return function() {
        return __method.apply(this, args.concat(toArray(arguments)));
    }
}

function add(a, b) { return a + b; }

//create function that returns 10 + argument
var add10 = add.curry(10);

add10(15); //25


var converter = function(ratio, symbol, input) {
    return [(input*ratio).toFixed(1),symbol].join(" ");
}

var kilosToPounds = converter.curry(2.2,"lbs");
var litersToUKPints = converter.curry(1.75, "imperial pints");
var litersToUSPints = converter.curry(1.98, "US pints");
var milesToKilometers = converter.curry(1.62, "km");

kilosToPounds(4); //8.8 lbs
litersToUKPints(2.4); //4.2 imperial pints
litersToUSPints(2.4); //4.8 US pints
milesToKilometers(34); //55.1 km
