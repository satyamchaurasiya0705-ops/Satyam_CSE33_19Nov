const EventEmitter = require("events");

const event = new EventEmitter();

// Greet event
event.on("greet", () => {
    console.log("Hello! Welcome to Node.js");
});

// Exit event
event.on("exit", () => {
    console.log("Exiting the application...");
});

// Trigger events
event.emit("greet");
event.emit("exit");