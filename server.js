require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const Item = require('./items/Item');
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
    const results = await Item.find();
    res.render('index.ejs', { items: results });
  } catch (error) {
    console.error(error);
  }
});

app.post('/items', async (req, res) => {
  try {
    // const newItem = await req.body;
    const newItem = new Item(req.body);
    // console.log(newItem);
    const doc = await newItem.save();
    res.redirect('/');
  } catch (error) {
    console.error(error);
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
