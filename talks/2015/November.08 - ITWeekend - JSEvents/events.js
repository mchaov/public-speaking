var UIEvent = ( function() {
        'use strict';

        function noop() {
			return false;
        }
		if ( typeof Object.prototype.detach === 'undefined') {
            Object.defineProperty(Object.prototype, 'detach', {
                writable: true,
                enumerable: false,
                configurable: true,
                value: noop
            });
        }

        if ( typeof Object.prototype.hasEvent === 'undefined') {
            Object.defineProperty(Object.prototype, 'hasEvent', {
                writable: true,
                enumerable: false,
                configurable: true,
                value: noop
            });
        }
		
        if ( typeof Object.prototype.trigger === 'undefined') {
            Object.defineProperty(Object.prototype, 'trigger', {
                writable: true,
                enumerable: false,
                configurable: true,
                value: noop
            });
        }
		
        function UIEvent(config) {
            if (!config) {
                return false;
            }
            if ((this instanceof UIEvent) === false) {
                return new UIEvent(config);
            }
            this.htmlRef = config.htmlRef;

            this.eventConfig = {
                name : config.name,
                type : config.type,
                handler : config.handler === undefined ? false : config.handler,
                useCapture : config.useCapture === undefined ? false : config.useCapture
            };

            this.init();
        }

        UIEvent.prototype.init = function() {
            if (this.htmlRef.eventsList === undefined) {

                Object.defineProperties(this.htmlRef, {

                    'eventsList' : {
                        writable : true,
                        enumerable : false,
                        configurable : false,
                        value : []
                    },

                    'events' : {
                        enumerable : false,
                        configurable : false,

                        get : function() {
                            return this.eventsList;
                        },

                        set : function(e) {
                            this.eventsList.push(e);
                        }
                    },

                    'trigger' : {
                        writable : false,
                        enumerable : false,
                        configurable : false,
                        value : function(name) {
                            var evt = this.hasEvent(name);

                            if ( typeof evt.handler === 'function') {
                                return evt.handler();
                            }

                            return false;
                        }
                    },

                    'hasEvent' : {
                        writable : false,
                        enumerable : false,
                        configurable : false,
                        value : function(name) {
                            for (var i = 0; i < this.eventsList.length; i += 1) {
                                if (this.eventsList[i].name === name) {
                                    return this.eventsList[i];
                                }
                            }

                            return false;
                        }
                    },

                    'detach' : {
                        writable : false,
                        enumerable : false,
                        configurable : false,
                        value : function(name) {
                            var i,
                                ev,
                                type,
                                handler,
                                useCapture;

                            if (name === undefined || name === '') {
                                for ( i = 0; i < this.eventsList.length; i += 1) {
                                    ev = this.eventsList[i];
                                    type = ev.type;
                                    handler = ev.handler;
                                    useCapture = ev.useCapture;
                                    this.removeEventListener(type, handler, useCapture);
                                }
                                this.eventsList = [];

                            } else if (this.hasEvent(name)) {
                                for ( i = 0; i < this.eventsList.length; i += 1) {
                                    if (this.eventsList[i].name === name) {
                                        ev = this.eventsList.splice(i, 1)[0];
                                        useCapture = ev.useCapture;
                                        type = ev.type;
                                        handler = ev.handler;
                                    }
                                }
                                this.removeEventListener(type, handler, useCapture);
                            }

                            return false;
                        }
                    }
                });
            }
            else if (this.htmlRef.hasEvent(this.eventConfig.name)) {
                return false;
            }

            this.eventConfig.handler = this.eventConfig.handler.bind(this);
            this.htmlRef.addEventListener(this.eventConfig.type, this.eventConfig.handler, this.eventConfig.useCapture);
            this.htmlRef.events = this.eventConfig;
        };


        Object.defineProperties(UIEvent.prototype, {

            'detach': {
                writable: false,
                enumerable: false,
                configurable: false,
                value: function(name) {
                    var eventName = name === undefined ? this.eventConfig.name : name,
                        eventData;

                    for (var i = 0; i < this.htmlRef.eventsList.length; i += 1) {
                        if (this.htmlRef.eventsList[i].name === eventName) {

                            eventData = this.htmlRef.eventsList.splice(i, 1);

                            if (name !== undefined) {
                                this.eventConfig.type = eventData[0].type;
                                this.eventConfig.handler = eventData[0].handler;
                            }
                        }

                    }

                    this.htmlRef.removeEventListener(this.eventConfig.type, this.eventConfig.handler, this.eventConfig.useCapture);
                }
            },

            'trigger': {
                writable: false,
                enumerable: false,
                configurable: false,
                value: function() {
                    if(typeof this.eventConfig.handler === 'function') {
                        return this.eventConfig.handler();
                    }

                    return false;
                }
            }

        });

        return UIEvent;
    }());