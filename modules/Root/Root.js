(function(window) {
    var Root = function( O ) {

        var me = {};

        me.__begin = function() {
            for(var i in this._childs) {
                this._childs[i].__begin();
            }
            
        };

        me.__update = function() {
            for(var i in this._childs) {
                this._childs[i].__update();
            }             

        };

        me.__draw = function() {
            for(var i in this._childs) {
                this._childs[i].__draw();
            }
            
        };

        me.__clear = function() {
            for(var i=0;i<this._childs.length;i++) {            
            // for(var i=this._childs.length-1;i>=0;i--) {
                this._childs[i].__clear();
            };
        };

        // event form mouse
        me.__onKeyDown = function(e) {
            for(var i in this._childs) {
                if(this._childs[i]._onKeyDown) {
                    this._childs[i]._onKeyDown(e);  
                }  
            }

        };

        me.__onKeyPress = function(e) {
            for(var i in this._childs) {
                // if(this._childs[i]._onKeyPress) {
                    this._childs[i].__onKeyPress(e);  
                // }  
            }

        };

        me.__onKeyUp = function(e) {
            for(var i in this._childs) {
                // if(this._childs[i]._onKeyUp) {
                    this._childs[i].__onKeyUp(e);  
                // }  
            }

        };

        // event form mouse
        me.__onMouseDown = function(e) {
            for(var i in this._childs) {
                // if(this._childs[i]._onMouseDown) {
                    this._childs[i].__onMouseDown(e);  
                // }  
            }

        };

        me.__onMouseUp = function(e) {
            for(var i in this._childs) {
                // if(this._childs[i]._onMouseUp) {
                    this._childs[i].__onMouseUp(e);  
                // }  
            }

        }

        me.__onMouseMove = function(e) {
            for(var i in this._childs) {
                // if(this._childs[i]._onMouseMove) {
                    this._childs[i].__onMouseMove(e);  
                // }  
            }

        };


        me.AddChild = function( O ) {
            gizmo.Filter(O,"Object");
            this._childs.push(O);        	
        };

        me.RemoveChild = function( O ) {
            gizmo.Filter(O,"Object");
            var index = 0;
            if( (index = this._childs.indexOf(O)) != -1) {
                delete( this._childs[ index ] );
            };
        };

        me.Start = function() {
            this.__begin();
                
            this.Start = function() {
                if(this._isRuning) {
                    this.Stop();
                    this.NotListenKeybordEvents();

                };

                this.ListenKeybordEvents();

                var step = (function(O) {
                    return function() {

                        O.__processEvents();
                        O.__update();
                        O.__clear();
                        O.__draw();                            

                    };
                })(this);

                //step();
                
                this._onEachFrame(step);

                this._isRuning = true;

                return this;

            };

            this.Start();

            return this;
        };

        me.Stop = function() {
            if(this._request) {
                    this._cancelAnimationFrame.call(window,this._request);
                    this._isRuning = false;
            };
        };

        me.SetEachFrame = function() {
            var self = this;

            var _onEachFrame;
            if(this._fps > 0) {
                var fps = this._fps;
                _onEachFrame = function(cb) {
                    this._request = setInterval(cb, 1000 / fps);
                };

                this._cancelAnimationFrame = window.clearInterval;

            } else {
                if (window.webkitRequestAnimationFrame) {
                _onEachFrame = function(cb) {
                    var _cb = function() { 
                        cb(); 
                        self._request = webkitRequestAnimationFrame(_cb);
                    };
                    _cb();
                };
                } else if (window.mozRequestAnimationFrame) {
                    _onEachFrame = function(cb) {
                        var _cb = function() { 
                            cb();
                            self._request = mozRequestAnimationFrame(_cb);
                        };
                        _cb();
                    };
                } else if (window.requestAnimationFrame) {
                    _onEachFrame = function(cb) {
                        var _cb = function() { 
                            cb();
                            self._request = requestAnimationFrame(_cb);
                        };
                        _cb();
                    };
                } else if (window.msRequestAnimationFrame) {
                    _onEachFrame = function(cb) {
                        var _cb = function() { 
                            cb();
                            self._request = msRequestAnimationFrame(_cb);
                        };
                        _cb();
                    };
                };

                this._cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
            };

            this._onEachFrame = _onEachFrame;

        };

        me.ListenKeybordEvents = function() {
            var self = this;
            window.onkeydown = function(e) {    self.SendEvent({name:"onKeyDown", type:"keyboard", e: e}); };
            window.onkeypress = function(e) {   self.SendEvent({name:"onKeyPress", type:"keyboard", e: e}); };
            window.onkeyup = function(e) {  self.SendEvent({name:"onKeyUp", type:"keyboard", e: e}); };
             
        };
        me.NotListenKeybordEvents = function() {
            var self = this;
            window.onkeydown = null;
            window.onkeypress = null;
            window.onkeyup = null; 
            
        };

        me.SendEvent = function(event) {
            this._eventStack.Push(event);

        };

        me.__processEvents = function() {
            var event;
            while (event = this._eventStack.Pop()) {
                // console.log(event);
                //console.log(this._name);
                
                switch(event.name) {
                    case "onKeyDown": this.__onKeyDown(event.e); break;
                    case "onKeyUp": this.__onKeyUp(event.e); break;
                    case "onKeyPress": this.__onKeyPress(event.e); break;
                    
                    case "onMouseDown": this.__onMouseDown(event); break;
                    case "onMouseUp": this.__onMouseUp(event); break;
                    case "onMouseMove": this.__onMouseMove(event); break;

                };
            };
                
        };

        me.Set = function( O ) {
            // this._fps = ( O.fps && (O.fps > 0) ) ? O.fps : 0;
            for(var name in O) {
                switch( name ) {
                    case "layer": {
                        switch( gizmo.type( O[name] ) ) {
                            case "Array": {
                                for(var layer in O[name]) {
                                    this._layers.push( O[name][layer] );

                                    O[name][layer].SetLisener("onMouseMove", this.__onMouseMove);
                                    O[name][layer].SetLisener("onMouseDown", this.__onMouseDown);
                                    O[name][layer].SetLisener("onMouseUp", this.__onMouseUp);

                                }
                                break;
                            }
                            case "Object": {
                                this._layers.push( O[name] );
                                var self = this;
                                O[name].SetLisener("onMouseMove", function(e) {
                                    self.__onMouseMove(e);
                                });
                                O[name].SetLisener("onMouseDown", function(e) {
                                    self.__onMouseDown(e);
                                });
                                O[name].SetLisener("onMouseUp", function(e) {
                                    self.__onMouseUp(e);
                                });
                                break;
                            }
                        };
                    };
                    break;

                    case "fps"  : { this._fps = O[name];  };
                    break;
                };
            }

            if( this._isRuning ) {
                this.Stop();
                this.SetEachFrame();
                this.Start();
            } else {
                this.SetEachFrame();
            };

        };

        me._childs = [];
        me._fps = 0;
        me._onEachFrame = null;
        me._cancelAnimationFrame = null;
        me._request = null;
        me._isRuning = false;
        me._layers = [];

        me._eventStack = new ArmGraph.EventStack(),


        me.Set( O || {} );

        return me;

    };

    window.ArmGraph.Root = Root;

})(window);