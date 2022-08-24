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

app.get('/projects/', async (req, res) => {
  try {
    const projectName = req.query.project;
    const itemRes = await Item.find({ project: projectName });
    const projectsRes = await Project.find();
    res.render('index.ejs', { projects: projectsRes, items: itemRes });
  } catch (error) {
    console.error(error);
  }
});

app.post('/items', async (req, res) => {
  try {
    const newItem = await new Item(req.body);
    await newItem.save();
    res.redirect('/');
  } catch (error) {
    console.error(error);
  }
});

app.post('/projects', async (req, res) => {
  try {
    const newProject = await new Project(req.body);
    await newProject.save();
    res.redirect('/');
  } catch (error) {
    console.error(error);
  }
});

// ? Handles updates to item's fields
app.put('/items', async (req, res) => {
  try {
    const id = await req.body.req['_id'];
    const data = await req.body.req.data;
    const search = await Item.findById(id);
    Object.assign(search, data);
    console.log(search);
    await search.save();
    res.json('Item updated');
  } catch (error) {
    console.error(error);
  }
});

app.delete('/items', async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.body);
    res.json('Item deleted');
  } catch (error) {
    console.error(error);
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
