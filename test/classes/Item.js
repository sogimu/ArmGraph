(function() {

    var Item = function(O) {

        var me = new ArmGraph.Node( O )

        me.SetFunc("begin", function() {
            console.log("Item begin");
            
        })
        .SetFunc("update", function() {
            // console.log("Item update");

        })
        .SetFunc("onMouseMove", function(e) {
            var x = e.e.offsetX;
            var y = e.e.offsetY;

            if( this.Button.HasPoint({x: x, y: y}) ) {
                console.log("onMouseMove");
            };

            if(this.isDruging) {
                
                this.x = x - this.offsetX;
                this.y = y - this.offsetY;
                this.Button.TranslateTo({x: this.x, y: this.y});

            }

        })
        .SetFunc("onMouseDown", function(e) {
            var x = e.e.offsetX;
            var y = e.e.offsetY;
            
            if( this.Button.HasPoint({x: x, y: y}) ) {
                console.log("onMouseDown");

                this.isDruging = true;

                this.offsetX = x - Math.round(this.Button._globalRepresentation.GetX())//this.ButtonX;
                this.offsetY = y - Math.round(this.Button._globalRepresentation.GetY())//this.ButtonY;

            }

        })
        .SetFunc("onMouseUp", function(e) {
            this.isDruging = false;

        })

        me.x = O.x || 50;
        me.y = O.y || 50;
        me.width = O.width || 100;
        me.height = O.height || 50;
        me.image = O.image || null;
        
        me.isDruging = false;

        me.layer = me.GetProp("owner").layer;

        // me.Button = new ArmContext.Rect({layer: me.layer, /*lineDash: [3,1], lineWidth: 4,*/ width: me.width, height: me.height})
        me.Button = new ArmContext.Image({layer: me.layer, image: me.image, width: me.width, height: me.height})

        me.Button.TranslateTo({x: me.x, y: me.y})

        return me;
    };

    window.Captcha.Item = Item;

})();