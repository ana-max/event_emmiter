import { EventEmitter } from "./emitter";

const eventListener = new EventEmitter<{
    'hello': (s: string) => void;
    'name': (s: string, n: number) => void;
}>();

//OK
eventListener.on('hello', (str: string) => console.log(str));
eventListener.on('name', (s, n) => console.log(s, n))

eventListener.emit('hello', 'a');
eventListener.emit('name', 'a', 2);

//Error
// eventListener.on('dsd', (str: string) => console.log(str));
// eventListener.emit('hello');
// eventListener.emit('name', 'a', '2');