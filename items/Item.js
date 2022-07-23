const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemsSchema = new Schema(
  {
    title: String,
    description: String,
    dueDate: Date,
    priority: String,
    progress: String,
    project: String,
  },
  { collection: 'todo-list' }
);

module.exports = mongoose.model('Item', itemsSchema);
