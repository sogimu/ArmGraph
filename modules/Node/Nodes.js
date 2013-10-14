
(function(window) {
	var Nodes = function(O) {

		var me = {};

        me.Add = function( O ) {
            gizmo.Filter(O,"Object");
            this._Nodes.push(O);

            return this;
        };

        me.Remove = function( O ) {
            gizmo.Filter(O,"Object");
            var index = 0;
            if( (index = this._Nodes.indexOf(O)) != -1) {
                delete( this._Nodes[ index ] );
                return true;
            } else {
                return false;
            };
        };

        me.GetArray = function() {
            return this._Nodes;
        };

		me.Set = function( O ) {
            gizmo.Filter(O,"Object");

            for(var name in O) {
                switch( name ) {
                    case "Nodes" : {
                        var Nodes = O[name];

                        gizmo.Filter(Nodes, "Array");
                        for(var primitive in Nodes) {
                            this.Add( Nodes[primitive] );
                        };
                    }; break;

                };
            };

		};

		me._Nodes = [];

		me.Set( O || {} );

		return me;

	};

	window.ArmContext.Nodes = Nodes;

})(window);