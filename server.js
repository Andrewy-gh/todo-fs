require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const Item = require('./items/Item');
const Project = require('./projects/Project');
const app = express();
const connectionString = process.env.DB_URL;

app.set('view engine', 'ejs');

// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(connectionString, {
  dbName: 'todo-list',
  useNewUrlParser: true,
});

// Routes
app.get('/', async (req, res) => {
  try {
    const itemsRes = await Item.find();
    const projectsRes = await Project.find();
    res.render('index.ejs', { projects: projectsRes, items: itemsRes });
  } catch (error) {
    console.error(error);
  }
});

app.post('/items', async (req, res) => {
  try {
    const newItem = Item.create(req.body);
    const doc = await Item.save();
    res.redirect('/');
  } catch (error) {
    console.error(error);
  }
});

app.delete('/items', async (req, res) => {
  try {
    const doc = await Item.findByIdAndDelete(req.body);
    res.json('Item deleted');
  } catch (error) {
    console.error(error);
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
