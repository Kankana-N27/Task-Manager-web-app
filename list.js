const mongoose = require("mongoose");

const ListSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true
    },
    Description: {
        type: String
    }
});

const Task = mongoose.model("Task", ListSchema);
module.exports = Task;


