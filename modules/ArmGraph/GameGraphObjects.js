
(function(window) {
	var GraphObjects = function(O) {

		var me = {};

        me.Add = function( O ) {
            gizmo.Filter(O,"Object");
            this._graphObjects.push(O);

            return this;
        };

        me.Remove = function( O ) {
            gizmo.Filter(O,"Object");
            var index = 0;
            if( (index = this._graphObjects.indexOf(O)) != -1) {
                delete( this._graphObjects[ index ] );
                return true;
            } else {
                return false;
            };
        };

        me.GetArray = function() {
            return this._graphObjects;
        };

		me.Set = function( O ) {
            gizmo.Filter(O,"Object");

            for(var name in O) {
                switch( name ) {
                    case "graphObjects" : {
                        var graphObjects = O[name];

                        gizmo.Filter(graphObjects, "Array");
                        for(var primitive in graphObjects) {
                            this.Add( graphObjects[primitive] );
                        };
                    }; break;

                };
            };

		};

		me._graphObjects = [];

		me.Set( O || {} );

		return me;

	};

	window.ArmContext.GraphObjects = GraphObjects;

})(window);