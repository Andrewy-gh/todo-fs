const express = require('express');
const router = express.Router();
const todosController = require('../controllers/todos');
const { ensureAuth, ensureGuest } = require('../middleware/auth');

router.get('/', ensureAuth, todosController.getItems);
router.get('/projects', todosController.filterByProject);
router.post('/items', todosController.createItem);
router.post('/projects', todosController.createProject);
router.put('/items', todosController.updateItem);
router.delete('/items', todosController.deleteItem);

module.exports = router;
