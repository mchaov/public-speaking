//Object.assign Polyfill, see also: jQuery.extend & _.extend
if (typeof Object.assign != 'function') {
  Object.assign = function(target) {
    'use strict';
    if (target == null) {
      throw new TypeError('Cannot convert undefined or null to object');
    }

    target = Object(target);
    for (var index = 1; index < arguments.length; index++) {
      var source = arguments[index];
      if (source != null) {
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
    }
    return target;
  };
}

'use strict';

function speaker(state){
	return {
		speak: function(){
			console.log('speaking');
		}
	};
}
function walker(state) {
	(typeof state.isMoving === 'undefined') && (state.isMoving = false)
	
	return {
		walk: function(){
			state.isMoving = true;
			console.log('walking');
			return this;
		}
	}
}
function rester(state) {
	(typeof state.isMoving === 'undefined') && (state.isMoving = false)
	
	return {
		rest: function(){
			state.isMoving = true;
			console.log('resting');
			return this;
		}
	}
}
function swimmer(state){
	return {
		swim: function(){
			console.log('swimming');
		}
	};
}
function flier(state){
	return {
		fly: function(){
			console.log('flying');
		}
	};
}
function giveBirth(state){
	return {
		birth: function(){
			console.log('in labor');
		}
	};
}


function maleHuman(name){
    var state = {
        name,
    }
    return Object.assign(
        state,
        walker(state),
		rester(state),
        speaker(state)
    );
}
function femaleHuman(name){
    var state = {
        children,
    }
    return Object.assign(
        state,
		maleHuman(name),
		giveBirth(state)
    );
};