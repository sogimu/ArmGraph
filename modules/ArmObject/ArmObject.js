(function(window) {
    var ArmObject = function() {

        var me = {};

        me._begin = function() {
            /* virtual */
            console.log("virtual function ArmObject._begin");
        };

        me._update = function() {
            /* virtual */
            console.log("virtual function ArmObject._update");
        };

        me._draw = function() {
            /* virtual */
            console.log("virtual function ArmObject._draw");
        };

        me._clear = function() {
            /* virtual */
            console.log("virtual function ArmObject._clear");
        };

        me.SetFunc = function(name,func) {
            if(name && func) {
                this['_'+name] = func;        
            }

            return this;
        };

        me.GetFunc = function(O) {
            if(name && func) {
                return this['_'+name];        
            }

        };

        me.HaveOwner = function() {
            if(this._owner) {
                return true;
            } else {
                return false;
            }
        };

        me.SetName = function(name) {
            this._name = name;
        };

        me.SetOwner = function(object) {
            this._owner = object;
        };

        me._name = "ArmObj "+100*Math.random();
        me._owner = null;
        me._childs = [];

    return me;
    };

    window.ArmGraph.ArmObject = ArmObject;

})(window);