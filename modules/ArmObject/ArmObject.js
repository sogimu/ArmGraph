(function(window) {
    var ArmObject = function( O ) {

        var me = {};

        me.GetDefaultName = function() {
            return this._defaultName;
        };

        me.__begin = function() {
            if(this._begin) {
                this._begin();
            };
            for(var i in this._childs) {
                this._childs[i].__begin();
            };
            if(this._afterBegin) {
                this._afterBegin();
            };
            
        };

        me.__update = function() {
            // this._doEvents();
            if(this._update) {
                this._update();
            };
            for(var i in this._childs) {
                this._childs[i].__update();
            };
            if(this._afterUpdate) {
                this._afterUpdate();
            };             

        };

        me.__draw = function() {
            if(this._draw) {
                this._draw();
            };
            for(var i in this._childs) {
                this._childs[i].__draw();
            };
            if(this._afterDraw) {
                this._afterDraw();
            };
            
        };

        me.__clear = function() {
            //for(var i=0;i<this._childs.length;i++) {
            if(this._clear) {
                this._clear();
            };
            for(var i=this._childs.length-1;i>=0;i--) {
                this._childs[i].__clear();
            };
            if(this._afterClear) {
                this._afterClear();
            };    
        };

        // event form mouse
        me.__onKeyDown = function(e) {
            if(this._onKeyDown) {
                this._onKeyDown(e);  
            };
            for(var i in this._childs) {
                // if(this._childs[i].__onKeyDown) {
                    this._childs[i].__onKeyDown(e);  
                // }  
            }

        };

        me.__onKeyPress = function(e) {
            if(this._onKeyPress) {
                this._onKeyPress(e);  
            };  

            for(var i in this._childs) {
                // if(this._childs[i]._onKeyPress) {
                    this._childs[i].__onKeyPress(e);  
                // }  
            };

        };

        me.__onKeyUp = function(e) {
            if(this._onKeyUp) {
                this._onKeyUp(e);  
            };
            for(var i in this._childs) {
                // if(this._childs[i]._onKeyUp) {
                    this._childs[i].__onKeyUp(e);  
                // }  
            }

        };

        // event form mouse
        me.__onMouseDown = function(e) {
            if(this._onMouseDown) {
                this._onMouseDown(e);  
            };
            for(var i in this._childs) {
                // if(this._childs[i]._onMouseDown) {
                    this._childs[i].__onMouseDown(e);  
                // }  
            };

        };

        me.__onMouseUp = function(e) {
            if(this._onMouseUp) {
                this._onMouseUp(e);  
            };
            for(var i in this._childs) {
                // if(this._childs[i]._onMouseUp) {
                    this._childs[i].__onMouseUp(e);  
                // }  
            };

        }

        me.__onMouseMove = function(e) {
            if(this._onMouseMove) {
                this._onMouseMove(e);  
            };
            for(var i in this._childs) {
                // if(this._childs[i]._onMouseMove) {
                    this._childs[i].__onMouseMove(e);  
                // }  
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

        me.SetFunc = function(name,func) {
            gizmo.Filter(name,"String");
            gizmo.Filter(func,"Function");
            if(name && func) {
                this['_'+name] = func;        
            }

            return this;
        };

        me.GetFunc = function(name) {
            gizmo.Filter(name,"String");
            if(this['_'+name]) {
                return this['_'+name];        
            };

        };

        me.SetProp = function(name,value) {
            gizmo.Filter(name,"String");
            if(name && value) {
                this['_'+name] = value;        
            }

            return this;
        };

        me.GetProp = function(name) {
            gizmo.Filter(name,"String");
            if(this['_'+name]) {
                return this['_'+name];        
            };

        };

        me.HaveOwner = function() {
            if(this._owner) {
                return true;
            } else {
                return false;
            };
        };

        me.SetName = function(name) {
            gizmo.Filter(name,"String");
            this._name = name;
        };

        me.SetOwner = function(object) {
            gizmo.Filter(object,"object");
            this._owner = object;
        };

        me.GetOwner = function() {
            return this._owner;
        };

        me.Set = function( O ) {
            if(!O) {O = {};};
            this._owner = O.owner || this._owner;
            this._name = O.name || this._name;

            if( this._owner ) {
                this._owner.AddChild( this );
            };

        };

        me._defaultName = "ArmObject";
        me._name = me.GetDefaultName() + ArmGraph.GetNewUnicalNumber();
        me._owner = null;
        me._childs = [];

        me.Set( O );

    return me;
    };

    window.ArmGraph.ArmObject = ArmObject;

})(window);