const express = require('express');
const { getLists, getList, createList, deleteList, updateListName, markAllTasksComplete } = require('../controllers/listController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// GET /api/lists - Retrieve all lists
router.get('/', authMiddleware, getLists);

// GET /api/lists/listId - Retrieve a specific list
router.get('/:listId', authMiddleware, getList);

// POST /api/lists - Create a new list
router.post('/', authMiddleware, createList);

// DELETE /api/lists/:listId - Delete a list
router.delete('/:listId', authMiddleware, deleteList);

// PUT /api/lists/:listId - Update a list name
router.put('/:listId', authMiddleware, updateListName);

// PUT /api/lists/complete/:listId - Mark all task as complete/incomplete
router.put('/complete/:listId', authMiddleware, markAllTasksComplete);


module.exports = router;
