const emmiter = require('./emmiter');

const eventListener = new emmiter.EventListener();
const callbackA = () => {
    console.log('A');
    eventListener.removeListener('event', callbackB);
};

const callbackB = () => {
    console.log('B');
};

eventListener.on('event', callbackA);

eventListener.on('event', callbackB);

console.log('test1: ')
// callbackA removes listener callbackB but it will still be called.
// Internal listener array at time of emit [callbackA, callbackB]
eventListener.emit('event');
// Prints:
//   A
//   B

console.log('test2: ')
// callbackB is now removed.
// Internal listener array [callbackA]
eventListener.emit('event');
// Prints:
//   A

console.log('test3: ')
eventListener.removeAllListeners('not existing event');
eventListener.emit('event');
// Prints:
// A

console.log('test4: ')
eventListener.removeAllListeners();
eventListener.emit('event');
// Prints nothing
