require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
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

const db = mongoose.connection;
db.once('open', (_) => {
  console.log('Database connected');
});

db.on('error', (err) => {
  console.error('connection error');
});

// Routes
app.get('/', async (req, res) => {
  try {
    res.render('index.ejs');
  } catch (error) {
    console.error(error);
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
