(function() {

    var Item = function(O) {

        var me = new ArmGraph.Node( O );

        me._maxLeft = 0;
        me._maxTop = 0;
        me._maxRight = 400;
        me._maxBootom = 300;

        me.SetFunc("onMouseMove", function(e) {
            var x = e.e.offsetX;
            var y = e.e.offsetY;
            
            if(this.isDruging && x > this.GetMaxLeft() && x < this.GetMaxRight() && y > this.GetMaxTop() && y < this.GetMaxBottom()) {
                
                this.x = x - this.offsetX;
                this.y = y - this.offsetY;
                this.Button.TranslateTo({x: this.x, y: this.y});

            }

        })
        .SetFunc("onMouseDown", function(e) {
            var x = e.e.offsetX;
            var y = e.e.offsetY;
            
            if( this.Button.HasPoint({x: x, y: y}) && me.GetProp("owner").layer.GetTopestPrimitiveUnderPoint({x: x, y: y}) == this.Button ) {
                
                this.isDruging = true;

                this.offsetX = x - Math.round(this.Button._globalRepresentation.GetX())//this.ButtonX;
                this.offsetY = y - Math.round(this.Button._globalRepresentation.GetY())//this.ButtonY;

            }

        })
        .SetFunc("onMouseUp", function(e) {
            this.isDruging = false;

        })
        .SetFunc("draw", function(e) {
            this.Button.Draw();
        })

        me.SetMaxLeft = function(maxLeft) {
            gizmo.Filter(maxLeft, "Number");
            this._maxLeft = maxLeft;
        };

        me.SetMaxRight = function(maxRight) {
            gizmo.Filter(maxRight, "Number");
            this._maxRight = maxRight;
        };

        me.SetMaxTop = function(maxTop) {
            gizmo.Filter(maxTop, "Number");
            this._maxTop = maxTop;
        };

        me.SetMaxBottom = function(maxBottom) {
            gizmo.Filter(maxBottom, "Number");
            this._maxBottom = maxBottom;
        };

        me.SetID = function(id) {
            gizmo.Filter(id, "String");
            this._id = id;
        };

        me.SetPath = function(path) {
            gizmo.Filter(path, "String");
            this._path = path;
        };

        me.GetMaxLeft = function() {
            return this._maxLeft;
        };

        me.GetMaxRight = function() {
            return this._maxRight;
        };

        me.GetMaxTop = function() {
            return this._maxTop;
        };

        me.GetMaxBottom = function() {
            return this._maxBottom;
        };

        me.GetID = function() {
            return this._id;
        };

        me.GetPath = function() {
            return this._path;
        };
        me.Set = function(O) {
            for(var name in O) {
                switch( name ) {
                    case "maxLeft"  : {  this.SetMaxLeft(O[name]); };
                    break;
                    
                    case "maxRight" : {  this.SetMaxRight(O[name]); };
                    break;

                    case "maxTop"   : {  this.SetMaxTop(O[name]); };
                    break;
                    
                    case "maxBottom": {  this.SetMaxBottom(O[name]); };
                    break;

                    case "id"   : {  this.SetID(O[name]); };
                    break;
                    
                    case "path": {  this.SetPath(O[name]); };
                    break;
                };
            };

        };    


        me.x = O.x || 0;
        me.y = O.y || 0;
        me.width = O.width || 50;
        me.height = O.height || 50;
        me.image = O.image || null;
        
        me.isDruging = false;

        me.layer = me.GetProp("owner").layer;

        // me.Button = new ArmContext.Rect({layer: me.layer, /*lineDash: [3,1], lineWidth: 4,*/ width: me.width, height: me.height})
        me.Button = new ArmContext.Image({layer: me.layer, image: me.image, width: me.width, height: me.height})
        me.Button.TranslateTo({x: me.x, y: me.y})

        me.Set(O);

        return me;
    };

    window.Captcha.Item = Item;

})();