(function(window) {
    var Root = function( O ) {

        var me = {};

        me.AddObject = function( O ) {
            gizmo.Filter(O,"Object");

            this._nodes.Add( O );
        };

        me.RemoveObject = function( O ) {
            gizmo.Filter(O,"Object");

            return this._nodes.Remove( O );
        };

        me.Start = function() {
            this._loop.Start();
        };

        me.Stop = function() {
            this._loop.Stop();
        };

        me.Pause = function() {
            this._loop.Pause();
        };

        me.Restart = function() {
            this._loop.Restart();
        };

        me.SetLisener = function(name,func) {
            gizmo.Filter(name,"String");
            gizmo.Filter(func,"Function");
            if(name && func) {
                if(this['_'+name]) {
                    gizmo.Filter(this['_'+name], "Array");
                    var index = 0;
                    if( (index = this['_'+name].indexOf(func)) == -1) {
                        this['_'+name].push( func );

                    } else {
                        console.log("This Function allredy added for event " + name + " of Root " + this.GetName());
                    }
                } else {
                    this['_'+name] = [];
                    this.SetLisener(name, func);
                }        
            }

            return this;
        };

        me.GetLisener = function(name) {
            gizmo.Filter(name,"String");
            if(this['_'+name]) {
                return this['_'+name];        
            } else {
                return false;
            }
        };

        me.GetDefaultName = function() {
            return this._defaultName;
        };

        me.Begin = function() {
            var objects = this._nodes.GetArray();
            for(var object in objects) {
                objects[object]._begin();
            };
            
        };

        me.Update = function() {
            var objects = this._nodes.GetArray();
            for(var object in objects) {
                objects[object]._update();
            };             

        };

        me.Draw = function() {
            var objects = this._nodes.GetArray();
            for(var object in objects) {
                objects[object]._draw();
            };
            
        };

        me.Clear = function() {
            var objects = this._nodes.GetArray();
            for(var object in objects) {
                objects[object]._clear();
            };
        };

        me.ListenKeybordEvents = function() {
            var self = this;

            var SendEvent = function(event) {
                self._eventQueue.Push(event);
            };
        
            window.onkeydown  = function(e) {   SendEvent({name:"onKeyDown", type:"keyboard", e: e});   };
            window.onkeypress = function(e) {   SendEvent({name:"onKeyPress", type:"keyboard", e: e});  };
            window.onkeyup    = function(e) {   SendEvent({name:"onKeyUp", type:"keyboard", e: e});     };
             
        };

        me.NotListenKeybordEvents = function() {
            var self = this;
            window.onkeydown = null;
            window.onkeypress = null;
            window.onkeyup = null; 
            
        };

        me.ProcessEvents = function() {
            var event;
            while (event = this._eventQueue.Pop()) {
                // console.log(event);
                //console.log(this._name);
                
                switch(event.name) {
                    case "onKeyDown":   this.OnKeyDown(event.e); break;
                    case "onKeyUp":     this.OnKeyUp(event.e); break;
                    case "onKeyPress":  this.OnKeyPress(event.e); break;
                    
                    case "onMouseDown": this._onMouseDown(event); break;
                    case "onMouseUp":   this._onMouseUp(event); break;
                    case "onMouseMove": this._onMouseMove(event); break;

                };
            };
                
        };

        // event form mouse
        me.OnKeyDown = function(e) {
            var objects = this._nodes.GetArray();
            for(var object in objects) {
                objects[object]._onKeyDown(e);
            };

        };

        me.OnKeyPress = function(e) {
            var objects = this._nodes.GetArray();
            for(var object in objects) {
                objects[object]._onKeyPress(e);
            };
        };

        me.OnKeyUp = function(e) {
            var objects = this._nodes.GetArray();
            for(var object in objects) {
                objects[object]._onKeyUp(e);
            };
        };

        // event form mouse
        me.OnMouseDown = function(e) {    
            this._eventQueue.Push({name:"onMouseDown", type:"mouse", e: e});

        };

        me._onMouseDown = function(e) {
            var objects = this._nodes.GetArray();
            for(var object in objects) {
                objects[object]._onMouseDown(e);
            };

        };

        me.OnMouseUp = function(e) {            
            this._eventQueue.Push({name:"onMouseUp", type:"mouse", e: e});
        };

        me._onMouseUp = function(e) {
            var objects = this._nodes.GetArray();
            for(var object in objects) {
                objects[object]._onMouseUp(e);
            };
        };

        me.OnMouseMove = function(e) {
            this._eventQueue.Push({name:"onMouseMove", type:"mouse", e: e});
        };

        me._onMouseMove = function(e) {
            var objects = this._nodes.GetArray();
            for(var object in objects) {
                objects[object]._onMouseMove(e);
            };
        };

        me.SetFPS = function(fps) {
            gizmo.Filter(fps,"Number");
            this._loop.Set({"fps": fps});
        };

        me.GetFPS = function() {
            return this._loop.GetFPS();
        };        

        me.Set = function( O ) {
            for(var name in O) {
                switch( name ) {
                    case "layer": {
                        switch( gizmo.type( O[name] ) ) {
                            case "Array": {
                                for(var layer in O[name]) {
                                    this._layers.push( O[name][layer] );

                                    O[name][layer].SetLisener("onMouseMove", this.OnMouseMove);
                                    O[name][layer].SetLisener("onMouseDown", this.OnMouseDown);
                                    O[name][layer].SetLisener("onMouseUp", this.OnMouseUp);

                                }
                                break;
                            }
                            case "Object": {
                                this._layers.push( O[name] );
                                var self = this;
                                O[name].SetLisener("onMouseMove", function(e) {
                                    self.OnMouseMove(e);
                                });
                                O[name].SetLisener("onMouseDown", function(e) {
                                    self.OnMouseDown(e);
                                });
                                O[name].SetLisener("onMouseUp", function(e) {
                                    self.OnMouseUp(e);
                                });
                                break;
                            }
                        };
                    };
                    break;

                    case "fps"  : { this.SetFPS( O[name] ); };
                    break;
                };
            };

        };
        
        me._defaultName = "Root";
        me._name = me.GetDefaultName() + ArmContext.GetNewUnicalNumber();           
        me._layers = [];
        
        me._nodes = new ArmContext.Nodes();

        me._eventQueue = new ArmGraph.EventQueue();

        me._loop = new ArmGraph.Loop({
            "beginFunc": (function(O) {
                            return function() {
                                O.Begin();                  
                            };
                        })(me), 
            "stepFunc": (function(O) {
                            return function() {
                                O.ProcessEvents(); 
                                O.Update();
                                O.Clear();
                                O.Draw();                 
                            };
                        })(me)
        });

        me.Set( O || {} );

        return me;

    };

    window.ArmGraph.Root = Root;

})(window);