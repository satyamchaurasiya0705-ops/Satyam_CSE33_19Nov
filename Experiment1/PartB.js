const EventEmitter = require("events");

const button = new EventEmitter();

// Simulate button click
button.on("click", () => {
    console.log("Button clicked!");
});

// Simulate mouse over
button.on("mouseover", () => {
    console.log("Mouse is over the button!");
});

// Simulate double click
button.on("dblclick", () => {
    console.log("Button double clicked!");
});

// Trigger events
button.emit("click");
button.emit("mouseover");
button.emit("dblclick");