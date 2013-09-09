window.onload = function() {

    layer1 = ArmContext.Layer({name: "layer1", container: "container", width: 800});

    Root = new ArmGraph.Root();
    CTX = layer1.GetCtx();

    var Car = new ArmGraph.ArmObject({owner: Root, name: "Car"})
    .SetFunc("begin", function() {
        this.x = 50;
        this.y = 10;
        this.width = 150;
        this.height = 100;
        this.color = "#ff0000";
        this.speed = {x: 0.1, y: 0.2};

        this.carBody = new ArmContext.Rect({layer: layer1, x: this.x, y: this.y, width: this.width, height: this.height, fillObject: this.color})
        .Scos({x: -0.2, y: 0});

    })
    .SetFunc("update", function() {
        this.speed.x *= Math.sin(this.speed.x)
        this.x += this.speed.x;
        this.y += this.speed.y;
        
        this.carBody.TranslateTo({x: this.x, y: this.y});
    })
    .SetFunc("clear", function() {
        CTX.clearRect(0,0,800,500);
    })
    .SetFunc("draw", function() {
        this.carBody.Draw();

    });
    
    var carLeftWhell = new ArmGraph.ArmObject({owner: Car, name: "leftWell"})
    .SetFunc("begin", function() {
        this.x = this.GetOwner().x;
        this.y = this.GetOwner().y;
        this.offsetX = 10;
        this.offsetY = 80;
        this.width = 40;
        this.height = 40;
        this.color = "#00ff00";

        this.whell = new ArmContext.Rect({layer: layer1, width: this.width, height: this.height, fillObject: this.color})
        .TranslateTo({x: this.x + this.offsetX, y: this.y + this.offsetY});
    })
    .SetFunc("update", function() {
        this.x = this.GetOwner().x;
        this.y = this.GetOwner().y;
        this.offsetX = 10;
        this.offsetY = 80;

        this.whell
        .Rotate({x: this.x + this.offsetX+this.width/2, y: this.y + this.offsetY + this.height/2, gradAngle: 5})
        .Translate({x: this.GetOwner().speed.x, y: this.GetOwner().speed.y})
    })
    .SetFunc("draw", function() {
        this.whell.Draw();
    });

    var carRightWhell = new ArmGraph.ArmObject({owner: Car, name: "rightWhell"})
    .SetFunc("begin", function() {
        this.x = this.GetOwner().x;
        this.y = this.GetOwner().y;
        this.offsetX = 90;
        this.offsetY = 80;
        this.width = 40;
        this.height = 40;
        this.color = "#00ffaa";

        this.whell = new ArmContext.Rect({layer: layer1, width: this.width, height: this.height, fillObject: this.color})
        .TranslateTo({x: this.x + this.offsetX, y: this.y + this.offsetY});
    })
    .SetFunc("update", function() {
        this.x = this.GetOwner().x;
        this.y = this.GetOwner().y;

        this.whell
        .Rotate({x: this.x + this.offsetX+this.width/2, y: this.y + this.offsetY + this.height/2, gradAngle: 5})
        .Translate({x: this.GetOwner().speed.x, y: this.GetOwner().speed.y})
    })
    .SetFunc("draw", function() {
        this.whell.Draw();
    });

    Root.Start();

};