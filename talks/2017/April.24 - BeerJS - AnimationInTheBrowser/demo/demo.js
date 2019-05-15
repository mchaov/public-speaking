"use strict";

/*
    frame rate counter
*/
var startTime = null;
var val = 0;
function frameRate(e, time) {
    // preparation
    if (startTime === null) {
        startTime = performance.now();
    }
    time = time || startTime;

    var t = Math.abs(time - startTime);
    var d = Math.round(t / 1000);

    console.log(d);
    /* logic
    val += 1;
    e.style.transform = "translateY(" + val + "px)";
    */

    // limit
    if (d < 5) {
        return requestAnimationFrame(frameRate.bind(null, e));
    }
}

// //setTimeout(frameRate.bind(null, document.all.b), 2000);

// intermediate example
// function generateAnimation(callback, limit) {
//     var startTime = null;
//     function generated(time) {
//         if (startTime === null) {
//             startTime = performance.now();
//         }
//         time = time || startTime;

//         var t = Math.abs(time - startTime);

//         callback(t);

//         if (t < limit) {
//             return requestAnimationFrame(generated);
//         }
//     }
//     return generated;
// }

// var a = generateAnimation(function (step) {
//     console.log(step);
// }, 1000);


// final example

// function generateAnimation(callback) {
//     function generated(time) {
//         if (this.startTime === null) {
//             this.startTime = performance.now();
//         }

//         var dT = (time || this.startTime) - this.startTime;
//         dT = dT < 0 ? 0 : dT;

//         if (dT < this.duration) {
//             this.frame = requestAnimationFrame(generated.bind(this));
//         }
//         else {
//             this.stop();
//         }

//         var percent = dT / this.duration * 100;
//         return callback.call(this, percent);
//     };
//     return generated.bind(this);
// }

// var obj = {
//     frame: null,
//     duration: 2000,
//     startTime: null,
//     start: null,
//     stop: function () {
//         cancelAnimationFrame(this.frame);
//     },
//     reset: function () {
//         document.all.a.style.transform = "translateY(" + 0 + "px)";
//         document.all.b.style.transform = "translateY(" + 0 + "px)";
//         document.all.c.style.transform = "translateY(" + 0 + "px)";
//         document.all.d.style.transform = "translateY(" + 0 + "px)";
//         document.all.e.style.transform = "translateY(" + 0 + "px)";

//         this.startTime = null;
// 		return this;
//     }
// };

// obj.start = generateAnimation.call(obj, function (percent) {
//     var path = 400 / 100 * percent;
//     document.all.a.style.transform = "translateY(" + path + "px)";
//     document.all.b.style.transform = "translateY(" + path * 1.2 + "px)";
//     document.all.c.style.transform = "translateY(" + path * 1.4 + "px)";
//     document.all.d.style.transform = "translateY(" + path * 1.6 + "px)";
//     document.all.e.style.transform = "translateY(" + path * 1.8 + "px)";
// });