"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
exports.__esModule = true;
exports.EventEmitter = void 0;
var EventEmitter = /** @class */ (function () {
    function EventEmitter() {
        this.listeners = {};
    }
    /*
    * emitter.on(eventName, listener)
    * eventName <string> | <symbol> The name of the event.
    * listener <Function> The callback function
    * Returns: <EventEmitter>
    *
    * Adds the listener function to the end of the listeners array for the event named eventName.
    * No checks are made to see if the listener has already been added.
    * Multiple calls passing the same combination of eventName and listener will result in the
    * listener being added, and called, multiple times.
    * */
    EventEmitter.prototype.on = function (eventName, listener) {
        var name = String(eventName);
        if (!this.listeners[name]) {
            this.listeners[name] = [];
        }
        this.listeners[name].push(listener);
        return this;
    };
    /*
    * emitter.emit(eventName[, ...args])#
    * eventName <string> | <symbol>
    * ...args <any>
    * Returns: <boolean>
    *
    * Synchronously calls each of the listeners registered for the event named eventName,
    * in the order they were registered, passing the supplied arguments to each.
    * Returns true if the event had listeners, false otherwise.
    * */
    EventEmitter.prototype.emit = function (eventName) {
        var handlerArgs = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            handlerArgs[_i - 1] = arguments[_i];
        }
        var name = String(eventName);
        if (!this.listeners[name])
            return false;
        var listeners = __spreadArray([], this.listeners[name]);
        for (var _a = 0, listeners_1 = listeners; _a < listeners_1.length; _a++) {
            var handler = listeners_1[_a];
            handler.apply(void 0, handlerArgs);
        }
        return true;
    };
    /*
    * emitter.removeListener(eventName, listener)
    * eventName <string> | <symbol>
    * listener <Function>
    * Returns: <EventEmitter>
    *
    * Removes the specified listener from the listener array for the event named eventName.
    * */
    EventEmitter.prototype.removeListener = function (eventName, listener) {
        var name = String(eventName);
        var index = this.listeners[name].indexOf(listener);
        if (index > -1)
            this.listeners[name].splice(index, 1);
        return this;
    };
    /*
    * emitter.removeAllListeners([eventName])
    * eventName <string> | <symbol>
    * Returns: <EventEmitter>
    *
    * Removes all listeners, or those of the specified eventName.
    * */
    EventEmitter.prototype.removeAllListeners = function (eventName) {
        var name = String(eventName);
        if (eventName)
            this.listeners[name] = [];
        else
            this.listeners = {};
        return this;
    };
    return EventEmitter;
}());
exports.EventEmitter = EventEmitter;
