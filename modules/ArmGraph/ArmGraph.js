(function(window) {
    var ArmGraph = function() {

        var me = {};

        me._lastUnicalNumber = 0;

        me.GetNewUnicalNumber = function() {
        	this._lastUnicalNumber+=1;
        	return this._lastUnicalNumber;
        };

        return me;

    };

    window.ArmGraph = ArmGraph();

})(window);