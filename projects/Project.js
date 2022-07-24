const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectsSchema = new Schema(
  {
    title: String,
  },
  { collection: 'projects' }
);

module.exports = mongoose.model('Project', projectsSchema);
