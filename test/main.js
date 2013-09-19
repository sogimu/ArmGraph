window.onload = function() {

    layer1 = ArmContext.Layer({name: "layer1", container: "container", width: 800, fps: 32});
    // layer2 = ArmContext.Layer({name: "layer2", container: "container", width: 800});
    
    layer1.ListenMouseEvents();

    Root = new ArmGraph.Root({layer: layer1, fps: 0});
    CTX = layer1.GetCtx();

    var Button = function( O ) {

        var me = new ArmGraph.ArmObject( O )

        me.SetFunc("begin", function() {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.isDruging = false;
            this.normalColor = normalColor;
            this.onMoveColor = onMoveColor;

            this.Button = new ArmContext.Rect({layer: layer1, lineDash: [3,1], lineWidth: 4, width: this.width, height: this.height, fillObject: this.normalColor})
            .TranslateTo({x: this.x, y: this.y})
            // .Scos({x: -0.2, y: 0});
            layer1.Start();

        })
        .SetFunc("update", function() {
            // this.Button.Translate({x: 5, y: 5});
            // this.Button.Rotate({x: 100, y: 100, gradAngle: 5});  
            this.Button.TranslateTo({x: this.x, y: this.y});
        })
        .SetFunc("onMouseMove", function(e) {
            var x = e.offsetX;
            var y = e.offsetY;

            if(this.isDruging) {
                
                this.x = x - this.offsetX;
                this.y = y - this.offsetY;
                

            }

            if( layer1.GetTopestPrimitiveUnderPoint({x: x, y: y}) == this.Button ) {
                this.Button.Update({fillObject: this.onMoveColor})
            } else {
                this.Button.Update({fillObject: this.normalColor})
            }

        })
        .SetFunc("onMouseDown", function(e) {
            var x = e.offsetX;
            var y = e.offsetY;
            if( layer1.GetTopestPrimitiveUnderPoint({x: x, y: y}) == this.Button ) {
                this.isDruging = true;

                this.ButtonX = this.Button._globalRepresentation.GetX();
                this.ButtonY = this.Button._globalRepresentation.GetY();
                this.offsetX = x - this.ButtonX;
                this.offsetY = y - this.ButtonY;

                //console.log(this.isDruging);
                this.Button.Translate({x: 5, y: 5});
            }
        })
        .SetFunc("onMouseUp", function(e) {
            var x = e.offsetX;
            var y = e.offsetY;
            this.isDruging = false;
            // console.log(this.isDruging);
            if( this.Button.HasPoint({x: x, y: y}) ) {
                this.Button.Translate({x: -5, y: -5});
            }
        })

        var x = 150;
        var y = 50;
        var width = 100;
        var height = 50;
        var normalColor = "#ff0000";
        var onMoveColor = "#00ff00";
        
        x = O.x || x;
        y = O.y || y;
        
        normalColor = O.normalColor || normalColor;
        onMoveColor = O.onMoveColor || onMoveColor;

        width = O.width || width;
        height = O.height || height;

        return me;
    };

    for(var i=1; i< 10; i++) {
        for(var j=1; j< 10; j++) {    
            firstButton = new Button({owner: Root, normalColor: "#00ff00", onMoveColor: "#ff0000", x: i*14+10*Math.random(), y: j*14+10*Math.random(), width: 10+10*Math.random(), height: 10+10*Math.random()});
            // secondButton = new Button({owner: Root, name: "secondButton", normalColor: "#aaff00", onMoveColor: "#ffaa00", x: i*12, y: 233});
        }
    }
 
    Root.Start();

};