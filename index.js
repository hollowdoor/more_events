//Most for use with gyre
/*

*/
function MoreEvents(){
    this.listeners = {};
}

MoreEvents.prototype = {
    constructor: MoreEvents,
    on: function(event, listener){
        this.listeners[event] = this.listeners[event] || [];
        this.listeners[event].push(listener);
        return this;
    },
    one: function(event, listener){
        function onceListener(){
            listener.apply(this, arguments);
            this.off(event, onceListener);
            return this;
        }
        return this.on(event, onceListener);
    },
    emit: function(event){
        if(this.listeners[event] === undefined)
            return this;
        var args = Array.prototype.slice.call(arguments, 1),
            canRun = this.listeners[event].length;

        while(--canRun){
            this.listeners[event][canRun].apply(this, args);
        }

        return this;
    },
    off: function(event, listener){
        var current, index = this.listeners[event].length;
        while(current = this.listeners[event][--index]){
            if(current === listener){
                this.listeners[event].splice(index);
                return this;
            }
        }
        return this;
    }
};

module.exports.Emitter = MoreEvents;
