
export class EventListener {
    private listeners: Object;

    constructor() {
        this.listeners = {}
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
    on(eventName: string | symbol, listener: Function) {
        if (!this.listeners[eventName]) {
            this.listeners[eventName] = [];
        }
        this.listeners[eventName].push(listener);
        return this;
    }

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
    emit(eventName: string | symbol, ...handlerArgs: any) {
        if (!this.listeners[eventName]) return false;
        const listeners = [...this.listeners[eventName]]
        for (const handler of listeners) {
            handler(handlerArgs);
        }
        return true;
    }

    /*
    * emitter.removeListener(eventName, listener)
    * eventName <string> | <symbol>
    * listener <Function>
    * Returns: <EventEmitter>
    *
    * Removes the specified listener from the listener array for the event named eventName.
    * */
    removeListener(eventName: string, handler?: Function) {
        const index = this.listeners[eventName].indexOf(handler);
        if (index > -1) this.listeners[eventName].splice(index, 1);
        return this;
    }

    /*
    * emitter.removeAllListeners([eventName])
    * eventName <string> | <symbol>
    * Returns: <EventEmitter>
    *
    * Removes all listeners, or those of the specified eventName.
    * */
    removeAllListeners(eventName?: string | symbol) {
        if (eventName) this.listeners[eventName] = []
        else this.listeners = {}
    }
}
