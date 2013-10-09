(function(window) {
	var Loop = function( O ) {

		gizmo.Filter(O,"Object");

		var me = {};


        me.Start = function() {
            if( !this.IsRunning() ) {
                if( this.IsPause() ) {
                    this.SetPauseStatus(false);
                } else {
                    this.GetBeginFunc()();                
                };

                this._setEachFrame();    
    	        this._onEachFrame( this.GetStepFunc() );

                this.SetRunningStatus(true);
            } else {
                console.log("Loop already started!")
            };

	        return this;
        };

        me.Stop = function() {
            if( this.IsRunning() ) {
                this._cancelAnimationFrame.call(window,this._request);
                this.SetRunningStatus(false);
            } else {
                if( this.IsPause() ) {
                    this.SetPauseStatus(false);
                };
            };

            return this;
        };

        me.Pause = function() {
            if( this.IsRunning() ) {
                this._cancelAnimationFrame.call(window,this._request);
                this.SetRunningStatus(false);
                this.SetPauseStatus(true);
            } else {
                console.log("This Loop not started yet!");
            };

            return this;
        };

        me.Restart = function() {
            this.Stop();
            this.Start();

            return this;
        };


        me._setEachFrame = function() {
            var self = this;

            var _onEachFrame;
            if(this.GetFPS() > 0) {
                var fps = this.GetFPS();
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

        me.SetFPS = function(fps) {
            gizmo.Filter(fps,"Number");
            this._fps = fps;
        };

        me.GetFPS = function() {
            return this._fps;
        };

        me.SetStepFunc = function(func) {
            gizmo.Filter(func,"Function");
            this._stepFunc = func;
        };

        me.GetStepFunc = function() {
            return this._stepFunc;
        };

        me.SetBeginFunc = function(func) {
            gizmo.Filter(func,"Function");
            this._beginFunc = func;
        };

        me.GetBeginFunc = function() {
            return this._beginFunc;
        };

        me.SetPauseStatus = function(status) {
            gizmo.Filter(status,"Boolean");            
            this._isPause = status;
        };

        me.IsPause = function() {
            return this._isPause;
        };

        me.SetRunningStatus = function(status) {
            gizmo.Filter(status,"Boolean");            
            this._isRunning = status;
        };

        me.IsRunning = function() {
            return this._isRunning;
        };        

		me.Set = function( O ) {
			for(var name in O) {
                switch( name ) {
                    case "fps"     : {	this.SetFPS( O[name] )	};
                    break;

                    case "beginFunc": {  this.SetBeginFunc( O[name] ) };
                    break;
                    
                    case "stepFunc": {	this.SetStepFunc( O[name] )	};
                    break;
                };
            }

            if( this.IsRunning() ) {
                this.Pause();
                this.Start();
            };

		};


		me._fps = 0;
        me._stepFunc = null;
        
        me._isRunning = false;
        me._isPause = false;

        me._onEachFrame = null;
        me._cancelAnimationFrame = null;
        me._request = null;

		me.Set( O || {} );

		return me;

	};

	window.ArmGraph.Loop = Loop;

})(window);