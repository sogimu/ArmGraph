(function(window) {
    var Root = function( O ) {

        var me = {};

        me.__begin = function() {
            for(var i in this._childs) {
                this._childs[i].__begin();
            }
            
        };

        me.__update = function() {
            // this._doEvents();
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
            //for(var i=0;i<this._childs.length;i++) {            
            for(var i=this._childs.length-1;i>=0;i--) {
                this._childs[i].__clear();
            };
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
                };
                // armlib.ListenMouseKeyboardEvents();

                var step = (function(O) {
                    return function() {
                        O.__clear();

                        O.__update();
                        O.__draw();                            
                    };
                })(this);

                step();
                
                this._onEachFrame(step);

                this._isRuning = true;

                return this;

            };

            this.Start();

            return this;
        };

        me.Stop = function() {
            if(this._request) {
                    // armlib.NotListenMouseKeyboardEvents();
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

        me.Set = function( O ) {
            if(!O) {O = {};};
            this._fps = ( O.fps && (O.fps > 0) ) ? O.fps : 0;
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

        me.Set( O );

        return me;

    };

    window.ArmGraph.Root = Root;

})(window);