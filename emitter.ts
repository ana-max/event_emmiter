
type FunctionArguments<T> = [T] extends [(...args: infer U) => any] ? U : [T] extends [void] ? [] : [T]

export class EventEmitter<EventsType> {
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
    on<E extends keyof EventsType>(eventName: E, listener: EventsType[E]): this {
        const name: string = String(eventName);
        if (!this.listeners[name]) {
            this.listeners[name] = [];
        }
        this.listeners[name].push(listener);
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
    emit<E extends keyof EventsType>(eventName: E, ...handlerArgs: FunctionArguments<EventsType[E]>): boolean {
        const name: string = String(eventName);
        if (!this.listeners[name]) return false;
        const listeners = [...this.listeners[name]];
        for (const handler of listeners) {
            handler(...handlerArgs);
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
    removeListener<E extends keyof EventsType>(eventName: E, listener: EventsType[E]): this {
        const name: string = String(eventName);
        const index = this.listeners[name].indexOf(listener);
        if (index > -1) this.listeners[name].splice(index, 1);
        return this;
    }

    /*
    * emitter.removeAllListeners([eventName])
    * eventName <string> | <symbol>
    * Returns: <EventEmitter>
    *
    * Removes all listeners, or those of the specified eventName.
    * */
    removeAllListeners<E extends keyof EventsType>(eventName: E, listener: EventsType[E]): this {
        const name: string = String(eventName);
        if (eventName) this.listeners[name] = [];
        else this.listeners = {};
        return this;
    }
}
