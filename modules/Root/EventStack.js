(function(window) {
    var EventStack = function() {

        var me = {};

        me.Push = function(reg) {
            try {
                this._stack.push(reg)
                return true;
            }
            catch(e) {
                return false;
            }
        };

        me.Pop = function() {
            var event = this._stack.shift();
            if(event != undefined) {
                return event;
            } else {
                return false;
            }
        };

        me._stack = [];

        return me;
    };

    window.ArmGraph.EventStack = EventStack;

})(window);