const mongoose = require('mongoose');
const Item = require('../models/Item');
const Project = require('../models/Project');

module.exports = {
  getItems: async (req, res) => {
    try {
      const itemsRes = await Item.find();
      const projectsRes = await Project.find();
      res.render('todos.ejs', { projects: projectsRes, items: itemsRes });
    } catch (error) {
      console.error(error);
    }
  },

  // app.get('/projects', async (req, res) => {
  filterByProject: async (req, res) => {
    try {
      const projectName = req.query.project;
      const itemRes = await Item.find({ project: projectName });
      const projectsRes = await Project.find();
      res.render('todos.ejs', { projects: projectsRes, items: itemRes });
    } catch (error) {
      console.error(error);
    }
  },

  // app.post('/items', async (req, res) => {
  createItem: async (req, res) => {
    try {
      const newItem = await new Item(req.body);
      await newItem.save();
      res.redirect('/todos');
    } catch (error) {
      console.error(error);
    }
  },

  // app.post('/projects', async (req, res) => {
  createProject: async (req, res) => {
    try {
      const newProject = await new Project(req.body);
      await newProject.save();
      res.redirect('/todos');
    } catch (error) {
      console.error(error);
    }
  },

  // ? Handles updates to item's fields
  // app.put('/items', async (req, res) => {
  updateItem: async (req, res) => {
    try {
      const id = await req.body.req['_id'];
      const data = await req.body.req.data;
      const search = await Item.findById(id);
      Object.assign(search, data);
      await search.save();
      res.json('Item updated');
    } catch (error) {
      console.error(error);
    }
  },

  // app.delete('/items', async (req, res) => {
  deleteItem: async (req, res) => {
    try {
      await Item.findByIdAndDelete(req.body);
      res.json('Item deleted');
    } catch (error) {
      console.error(error);
    }
  },
};
