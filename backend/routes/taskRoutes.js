const express = require('express');
const { createTask, editTask, deleteTask, markTaskComplete } = require('../controllers/taskController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();


// POST /api/tasks - Create a new task
router.post('/', authMiddleware, createTask);


// PUT /api/tasks/:taskId - Update a task name
router.put('/:taskId', authMiddleware, editTask);

// PUT /api/lists/complete/:taskId - Mark all task as complete/incomplete
router.put('/complete/:taskId', authMiddleware, markTaskComplete);

// DELETE /api/tasks/:taskId - Delete a task
router.put('/delete/:taskId', authMiddleware, deleteTask);

module.exports = router;
