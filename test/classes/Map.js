(function(window) {
	
    var map = function(O) {

        var me = {};

        me._items = [];
        me._width = 400;
        me._height = 300;
        me._row = 0;
        me._col = 0;

        me.GetJSON = function() {
            var map = {
                items: this.GetItems(),
                width: this.GetWidth(),
                height: this.GetHeight(),
                row: this.GetRow(),
                col: this.GetCol()
            };

            return map; 
        };
        me.SetWidth = function(width) {
            gizmo.Filter(width, "Number");
            this._width = width;
        };

        me.SetHeight = function(height) {
            gizmo.Filter(height, "Number");
            this._height = height;
        };

        me.SetRow = function(row) {
            gizmo.Filter(row, "Number");
            this._row = row;
        };

        me.SetCol = function(col) {
            gizmo.Filter(col, "Number");
            this._col = col;
        };

        me.SetItems = function(items) {
            gizmo.Filter(items, "Array");
            this._items = items;
        };

        me.GetWidth = function() {
            return this._width;
        };

        me.GetHeight = function() {
            return this._height;
        };

        me.GetRow = function() {
            return this._row;
        };

        me.GetCol = function() {
            return this._col;
        };

        me.GetItems = function() {
            return this._items;
        };

        me.Set = function(O) {
            for(var name in O) {
                switch( name ) {
                    case "width" : {  this.SetWidth(O[name]); };
                    break;
                    
                    case "height": {  this.SetHeight(O[name]); };
                    break;

                    case "row" : {  this.SetRow(O[name]); };
                    break;
                    
                    case "col": {  this.SetCol(O[name]); };
                    break;

                    case "items" : {  this.SetItems(O[name]); };
                    break;

                };
            };

        };    
 
        me.Set(O || {});
     
        return me;
    };

    window.Captcha.Map = map;

})(window);