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
            }
            
        };

        me.__update = function() {
            // this._doEvents();
            if(this._update) {
                this._update();
            };
            for(var i in this._childs) {
                this._childs[i].__update();
            }             

        };

        me.__draw = function() {
            if(this._draw) {
                this._draw();
            };
            for(var i in this._childs) {
                this._childs[i].__draw();
            }
            
        };

        me.__clear = function() {
            //for(var i=0;i<this._childs.length;i++) {
            if(this._clear) {
                this._clear();
            }
            for(var i=this._childs.length-1;i>=0;i--) {
                this._childs[i].__clear();
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