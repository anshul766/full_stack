const EventEmitter = require("events").EventEmitter;

const orderEmitter = new EventEmitter();

orderEmitter.on("orderPlaced", (order) => {

    console.log("\n==========================");
    console.log("       ORDER RECEIPT");
    console.log("==========================");

    console.log("Order ID:", order.id);
    console.log("Item:", order.item);
    console.log("Amount: ₹" + order.amount);

    console.log("==========================");
});


orderEmitter.emit("orderPlaced", {
    id: 101,
    item: "Fresh Milk",
    amount: 60
});


orderEmitter.emit("orderPlaced", {
    id: 102,
    item: "Paneer",
    amount: 300
});


orderEmitter.emit("orderPlaced", {
    id: 103,
    item: "Pure Ghee",
    amount: 550
});