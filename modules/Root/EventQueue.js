(function(window) {
    var EventQueue = function() {

        var me = {};

        me.Push = function(reg) {
            try {
                this._queue.push(reg)
                return true;
            }
            catch(e) {
                return false;
            }
        };

        me.Pop = function() {
            var event = this._queue.shift();
            if(event != undefined) {
                return event;
            } else {
                return false;
            }
        };

        me._queue = [];

        return me;
    };

    window.ArmGraph.EventQueue = EventQueue;

})(window);