'use strict';

const speaker = (state) => ({
	speak: () => console.log('speaking')
});
const walker = function(state) {
	(typeof state.isMoving === 'undefined') && (state.isMoving = false)
	
	return {
		walk: function(){
			state.isMoving = true;
			console.log('walking');
			return this;
		}
	}
}
const rester = function(state) {
	(typeof state.isMoving === 'undefined') && (state.isMoving = false)
	
	return {
		rest: function(){
			state.isMoving = true;
			console.log('resting');
			return this;
		}
	}
}
const swimmer = (state) => ({
	swim: () => console.log('swimming')
});
const flier = (state) => ({
	fly: () => console.log('flying')
});
const giveBirth = (state) => ({
	birth: () => console.log('in labor')
});

const maleHuman = (name) => {
    let state = {
        name,
    }
	
    return Object.assign(
        state,
        walker(state),
		rester(state),
        speaker(state)
    );
};

const femaleHuman = (name) => {
    let state = {
        children,
    }
    return Object.assign(
        state,
		maleHuman(name),
		giveBirth(state)
    );
};