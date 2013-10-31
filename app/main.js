window.onload = function() {

    Root = new ArmGraph.Root({fps: 15});

    Game = function( O ) {

        var me = new ArmGraph.ArmObject( O )

        me.SetFunc("begin", function() {
            this.layer = ArmContext.Layer({name: "this.layer", width: 1300, height: 600, container: "container"});    
            Root.Set({layer: this.layer})
            this.layer.ListenMouseEvents();

        })
        .SetFunc("afterUpdate", function() {
            this.layer.__update();
        
        })
        .SetFunc("afterClear", function() {
            this.layer.__clear();

        })
        .SetFunc("afterDraw", function() {
            this.layer.__draw();

        })


        return me;
    };


    var Button = function( O ) {

        var me = new ArmGraph.ArmObject( O )

        me.SetFunc("begin", function() {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.target = {x: 100, y: 100};
            this.offset = {x: 0, y: 0};

            this.isDruging = false;
            this.normalColor = normalColor;
            this.onMoveColor = onMoveColor;
            this.layer = this.GetProp("owner").layer;

            this.Button = new ArmContext.Rect({layer: this.layer, /*lineDash: [3,1], lineWidth: 4,*/ width: this.width, height: this.height, fillObject: this.normalColor})
            // this.Button = new ArmContext.Rect({layer: this.layer, width: this.width, height: this.height, lineDash: [1,2,3]/*, lineWidth: 7*/, globalAlpha: 0.5, strokeObject: "#ff0000", fillObject: this.normalColor, /*shadowOffsetX: 15, shadowOffsetY: 15,*/ shadowColor: "#0000ff", zindex: 23})
            this.Button.TranslateTo({x: this.x, y: this.y})
            // this.Button.Scos({x: -0.2, y: 0});

        })
        .SetFunc("update", function() {
            if(!this.isDruging) {
                this.Button.Rotate({gradAngle: 0.5, x: this.target.x, y: this.target.y});

                
                this.offset.x += (this.target.x - this.Button._globalRepresentation.GetX())/5000;
                this.offset.y += (this.target.y - this.Button._globalRepresentation.GetY())/5000;

                this.Button.Translate({x: this.offset.x, y: this.offset.y});

            };            

        })
        .SetFunc("onMouseMove", function(e) {
            var x = e.e.offsetX;
            var y = e.e.offsetY;

            this.target = {x: x, y: y};

            if(this.isDruging) {
                
                this.x = x - this.offsetX;
                this.y = y - this.offsetY;
                this.Button.TranslateTo({x: this.x, y: this.y});

            } else {
                if( this.Button.HasPoint({x: x, y: y}) ) {   
                    this.Button.Set({fillObject: this.onMoveColor/*, zindex: this.Button._2dContextRepresentation.GetZindex() + 100*/});
                    this.offset.x += 1;
                    this.offset.x *= -1;

                    this.offset.y += 2;
                    this.offset.y *= -1;
                } else {
                    this.Button.Set({fillObject: this.normalColor});                
                }
                this.offsetX = -1*(this.Button._globalRepresentation.GetX() - this.target.x)/50;
                this.offsetY = -1*(this.Button._globalRepresentation.GetY() - this.target.y)/50;
            }

        })
        .SetFunc("onMouseDown", function(e) {
            var x = e.e.offsetX;
            var y = e.e.offsetY;
            
            if( this.Button.HasPoint({x: x, y: y}) ) {
                this.Button.Set({fillObject: this.onMoveColor})
                this.isDruging = true;

                this.ButtonX = this.Button._globalRepresentation.GetX();
                this.ButtonY = this.Button._globalRepresentation.GetY();
                this.offsetX = x - this.ButtonX;
                this.offsetY = y - this.ButtonY;

            }

        })
        .SetFunc("onMouseUp", function(e) {
            var x = e.e.offsetX;
            var y = e.e.offsetY;
            this.isDruging = false;

            this.Button.Set({fillObject: this.normalColor})

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

    G = new Game({owner: Root}) 

    for(var i=1; i< 20; i++) {
        for(var j=1; j< 20; j++) {    
    //         // i=1;
    //         // j=1;
            firstButton = new Button({owner: G, normalColor: "#00ff00", onMoveColor: "#ff0000", x: i*14+10*Math.random(), y: j*14+10*Math.random(), width: 10+10*Math.random(), height: 10+10*Math.random()});
    //         // secondButton = new Button({owner: Root, name: "secondButton", normalColor: "#aaff00", onMoveColor: "#ffaa00", x: i*12, y: 233});
        }
    }
    Root.Start();

    // firstButton = new Button({owner: G, normalColor: "#00ff00", onMoveColor: "#ff0000", x: 14, y: 14, width: 10, height: 10});    
    

};