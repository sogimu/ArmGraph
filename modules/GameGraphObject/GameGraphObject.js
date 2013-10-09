(function(window) {
    var ArmObject = function( O ) {

        var me = {};

        me._begin = function() {
            if(this.begin) {
                this.begin();
            };
            var objects = this._graphObjects.GetArray();
            for(var object in objects) {
                objects[object]._begin();
            };
            if(this.afterBegin) {
                this.afterBegin();
            };
        };

        me._update = function() {
            if(this.update) {
                this.update();
            };
            var objects = this._graphObjects.GetArray();
            for(var object in objects) {
                objects[object]._update();
            };
            if(this.afterUpdate) {
                this.afterUpdate();
            };             
        };

        me._draw = function() {
            if(this.draw) {
                this.draw();
            };
            var objects = this._graphObjects.GetArray();
            for(var object in objects) {
                objects[object]._draw();
            };
            if(this.afterDraw) {
                this.afterDraw();
            };
            
        };

        me._clear = function() {
            if(this.clear) {
                this.clear();
            };
            var objects = this._graphObjects.GetArray();
            for(var object in objects) {
                objects[object]._clear();
            };
            if(this.afterClear) {
                this.afterClear();
            };
        };

        // event form mouse
        me._onKeyDown = function(e) {
            if(this.onKeyDown) {
                this.onKeyDown(e);  
            };
            var objects = this._graphObjects.GetArray();
            for(var object in objects) {
                objects[object]._onKeyDown(e);
            };

        };

        me._onKeyPress = function(e) {
            if(this.onKeyPress) {
                this.onKeyPress(e);  
            };  
            var objects = this._graphObjects.GetArray();
            for(var object in objects) {
                objects[object]._onKeyPress(e);
            };

        };

        me._onKeyUp = function(e) {
            if(this.onKeyUp) {
                this.onKeyUp(e);  
            };
            var objects = this._graphObjects.GetArray();
            for(var object in objects) {
                objects[object]._onKeyUp(e);
            };

        };

        // event form mouse
        me._onMouseDown = function(e) {
            if(this.onMouseDown) {
                this.onMouseDown(e);  
            };
            var objects = this._graphObjects.GetArray();
            for(var object in objects) {
                objects[object]._onMouseDown(e);
            };

        };

        me._onMouseUp = function(e) {
            if(this.onMouseUp) {
                this.onMouseUp(e);  
            };
            var objects = this._graphObjects.GetArray();
            for(var object in objects) {
                objects[object]._onMouseUp(e);
            };
        };

        me._onMouseMove = function(e) {
            if(this.onMouseMove) {
                this.onMouseMove(e);  
            };
            var objects = this._graphObjects.GetArray();
            for(var object in objects) {
                objects[object]._onMouseMove(e);
            };
        };

        me.AddObject = function( O ) {
            gizmo.Filter(O,"Object");
            this._graphObjects.Add( O );
        };

        me.RemoveObject = function( O ) {
            gizmo.Filter(O,"Object");
            return this._graphObjects.Remove( O );
        };

        me.SetFunc = function(name,func) {
            gizmo.Filter(name,"String");
            gizmo.Filter(func,"Function");
            if(name && func) {
                this[name] = func;        
            }

            return this;
        };

        me.GetFunc = function(name) {
            gizmo.Filter(name,"String");
            if(this[name]) {
                return this[name];        
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

        me.GetDefaultName = function() {
            return this._defaultName;
        };

        me.SetName = function(name) {
            gizmo.Filter(name,"String");
            this._name = name;
        };

        me.GetName = function() {
            return this._name;
        };

        me.SetOwner = function(object) {
            gizmo.Filter(object,"Object");
            this._owner = object;
            this._owner.AddObject( this );
        };

        me.GetOwner = function() {
            return this._owner;
        };

        me.HasOwner = function() {
            return this._owner;
        };

        me.Set = function( O ) {
            gizmo.Filter(O, "Object");

            this._owner = O.owner || this._owner;
            this._name = O.name || this._name;

            for(var name in O) {
                switch( name ) {
                    case "owner": { this.SetOwner( O[name] );   };
                    break;

                    case "name": {    this.SetName( O[name] );   };
                    break;
                };
            };

        };

        me._defaultName = "GameGraphObject";
        me._name = me.GetDefaultName() + ArmGraph.GetNewUnicalNumber();
        me._owner = null;

        // me._childs = [];
        me._graphObjects = new ArmContext.GraphObjects();


        me.Set( O || {} );

    return me;
    };

    window.ArmGraph.ArmObject = ArmObject;

})(window);