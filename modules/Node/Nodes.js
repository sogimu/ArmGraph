/**
 * @classdesc
 * Описывает набор классов Node.
 * 
 * @class Nodes
 * @this {ArmContext.Nodes}
 * @author <a href="mailto:sogimu@nxt.ru">Alexander Lizin aka Sogimu</a>
 * @version 0.1
 *
 * @requires ArmGraph/ArmGraph.js
 * @requires Node/Node.js
 *
 */

(function(window) {
	var Nodes = function(O) {

		var me = {};

        me.Add = function( O ) {
            gizmo.Filter(O,"Object");
            this._nodes.push(O);

            return this;
        };

        me.Remove = function( O ) {
            gizmo.Filter(O,"Object");
            var index = 0;
            if( (index = this._nodes.indexOf(O)) != -1) {
                delete( this._nodes[ index ] );
                return true;
            } else {
                return false;
            };
        };

        me.RemoveAll = function() {
            for(var nodeName in this._nodes) {
                this._nodes[nodeName]._clear();
            };

            this._nodes = [];
        };

        me.GetArray = function() {
            return this._nodes;
        };

		me.Set = function( O ) {
            gizmo.Filter(O,"Object");

            for(var name in O) {
                switch( name ) {
                    case "Nodes" : {
                        var Nodes = O[name];

                        gizmo.Filter(Nodes, "Array");
                        for(var node in Nodes) {
                            this.Add( Nodes[node] );
                        };
                    }; break;

                };
            };

		};

		me._nodes = [];

		me.Set( O || {} );

		return me;

	};

	window.ArmContext.Nodes = Nodes;

})(window);