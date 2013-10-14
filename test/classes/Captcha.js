(function(window) {
	
	window.Captcha = {};

    var captcha = function(O) {

        var me = new ArmGraph.Node( O )

        me._items = [];

        me.GetTask = function() {
            var task = {map: {
                list: [
                {id: 1, pos: {x: 50, y: 50}, path: "img/image0.png"},
                {id: 2, pos: {x: 150, y: 50}, path: "img/image1.png"},
                {id: 3, pos: {x: 50, y: 150}, path: "img/image2.png"},
                {id: 4, pos: {x: 150, y: 150}, path: "img/image3.png"}],
                width: 100,
                height: 100,
                row: 2,
                col: 2
            }};

            this.SetMap(task.map);
        };

        me.CheckTask = function() {

        };        

        me.GetMap = function() {

        };
// 
        me.SetMap = function(map) {
            var self = this;
            img = new Image();
            img.onload = function() {
                console.log("load img");
                self._items.push( new Captcha.Item({owner: self, image: img, x: 100, y: 100, width: 100, height: 100}) );
            }
            img.src = "img/image0.png";
        };       
 
        me.SetFunc("begin", function() {
            this.layer = ArmContext.Layer({name: "layer!", width: 1300, height: 600, container: "container"});    
            Root.Set({layer: this.layer})
            this.layer.ListenMouseEvents();
            // this.GetTask();
            console.log("Captcha begin");
            this.GetTask();


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

    window.Captcha.Captcha = captcha;

})(window);