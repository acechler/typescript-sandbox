"use strict";
class EventEmitter {
    constructor() {
        this.listeners = {};
    }
    on(event, listener) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(listener);
    }
    off(event, listener) {
        if (!this.listeners[event]) {
            return;
        }
        this.listeners[event] = this.listeners[event].filter(l => l !== listener);
    }
    emit(event, ...args) {
        if (!this.listeners[event]) {
            return;
        }
        this.listeners[event].forEach(listener => listener(...args));
    }
    once(event, listener) {
        const onceListener = (...args) => {
            listener(...args);
            this.off(event, onceListener);
        };
        this.on(event, onceListener);
    }
}
const eventEmitter = new EventEmitter();
// Handler for the event
const handler = (message) => console.log(`Received: ${message}`);
// Subscribe to an event
eventEmitter.on('message', handler);
// Emit the event
eventEmitter.emit('message', 'Hello, world!'); // Output: Received: Hello, world!
// Unsubscribe from the event
eventEmitter.off('message', handler);
// The handler won't be called because it has been unsubscribed
eventEmitter.emit('message', 'Hello again!');
// Subscribe to an event to be triggered only once
eventEmitter.once('one-time', () => console.log('This will only be logged once.'));
// This message will be logged
eventEmitter.emit('one-time');
// This message won't be logged as the listener has been removed
eventEmitter.emit('one-time');
