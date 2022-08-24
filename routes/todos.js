const express = require('express');
const router = express.Router();
const todosController = require('../controllers/todos');

router.get('/', todosController.getItems);
router.get('/projects', todosController.filterByProject);
router.post('/items', todosController.createItem);
router.post('/projects', todosController.createProject);
router.put('/items', todosController.updateItem);
router.delete('/items', todosController.deleteItem);

module.exports = router;
