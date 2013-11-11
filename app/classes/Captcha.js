(function(window) {
	
	window.Captcha = {};

    var captcha = function(O) {

        var me = new ArmGraph.Node( O )

        me._items = [];
        me._row = 0;
        me._col = 0;
        me._itemWidth = 100;
        me._itemHeight = 100;

        me._width = 400;
        me._height = 200;

        me.GetTask = function() {
            var w = 100;
            var h = 80;
            var x = 0;
            var y = 0;
            var map = new Captcha.Map({items: [
                {id: 1, pos: {x: x, y: y}, path: "img/image0.png"},
                {id: 2, pos: {x: x + w, y: y}, path: "img/image1.png"},
                {id: 3, pos: {x: x, y: y+h}, path: "img/image2.png"},
                {id: 4, pos: {x: x + w, y: y + h}, path: "img/image3.png"}],
                width: w,
                height: h,
                row: 2,
                col: 2}
            );
            
            var task = {map: map};

            this.SetMap(task.map);
        };

        me.CheckTask = function() {

        };        

        me.GetMap = function() {
            var map = new Captcha.Map();
            var items = [];
            var counter = 0;
            var line = [];
            
            for(var itemName in this._items) {
                var item = this._items[itemName];


                line.push({id: item.GetID(), pos: {x: item.x, y: item.y}, path: item.GetPath()});

                counter++;
                if(counter == this._row) {
                    line = gizmo.nativeSort({mas: line, target: '<', field: "pos.x"});
                    items.push(line);
                    counter = 0;

                    line = [];
                };
                
            };

            
        };
// 
        me.SetMap = function(map) {
            var self = this;
            
            this._row = map.GetRow();
            this._col = map.GetCol();
            this._itemWidth = this.GetWidth();
            this._itemHeight = this.GetHeight();

            loader = new ArmContext.Loader({})
            var items = map.GetItems();

            for(var elemName in items) {
                var elem = items[elemName];
                loader.AddObject(elem.id+"", elem.path, "image");

            };
            loader.SetLisener("onLoadObject", function(img, progress) {
                console.log(img.name + " was loaded!");
                console.log("Progress: " + progress + "%");

            })
            .SetLisener("onLoad", function(object) {
                for(var elemName in items) {
                    var elem = items[elemName];
                    var wK = self.GetWidth() / map.GetWidth() / map.GetRow();
                    var hK = self.GetHeight() / map.GetHeight() / map.GetCol();
                    
                    self._items.push( new Captcha.Item({owner: self, id: elem.id+"", path: elem.path, image: this.GetObject(elem.id+""), x: elem.pos.x *wK, y: elem.pos.y * hK, width: map.GetWidth() * wK, height: map.GetHeight() * hK, maxLeft: 0, maxTop: 0, maxRight: self.GetWidth(), maxBottom: self.GetHeight()}) );
                };

            })
            .Start();

        };

        me.SetWidth = function(width) {
            gizmo.Filter(width, "Number");
            this._width = width;
        };

        me.SetHeight = function(height) {
            gizmo.Filter(height, "Number");
            this._height = height;
        };

        me.GetWidth = function() {
            return this._width;
        };

        me.GetHeight = function() {
            return this._height;
        };

        me.Set = function(O) {
            for(var name in O) {
                switch( name ) {
                    case "width" : {  this.SetWidth(O[name]); };
                    break;
                    
                    case "height": {  this.SetHeight(O[name]); };
                    break;
                };
            };

        };    
 
        me.SetFunc("begin", function() {
            this.layer = ArmContext.Layer({name: "layer!", width: this.GetWidth(), height: this.GetHeight(), container: "container"});    
            Root.Set({layer: this.layer})
            this.layer.ListenMouseEvents();
       
            console.log("Captcha begin");
            this.GetTask();


        })
        .SetFunc("update", function() {
            // this.layer.__update();
        
        })
        .SetFunc("clear", function() {
            // this.layer.__clear();
            me.layer.GetCtx().clearRect(0,0,me.layer.GetWidth(),me.layer.GetHeight());

        })
        .SetFunc("draw", function() {
            // this.layer.__draw();

        });

        me.Set(O);
     
        return me;
    };

    window.Captcha.Captcha = captcha;

})(window);