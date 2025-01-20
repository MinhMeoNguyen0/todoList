const List = require('../models/List');

// Create a new task
exports.createTask = async (req, res) => {
  const { title, listId } = req.body;

  try {
    const list = await List.findById(listId);
    if (!list) return res.status(404).json({ message: 'List not found' });

    list.tasks.push({ title });
    await list.save();
    res.status(201).json(list.tasks[list.tasks.length - 1]);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Edit a task
exports.editTask = async (req, res) => {
  const { taskId } = req.params;
  const { listId,title } = req.body;

  try {
    const list = await List.findById(listId);
    if (!list) return res.status(404).json({ message: 'List not found' });

    const task = list.tasks.id(taskId);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    task.title = title;
    await list.save();
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Mark a task as complete/incomplete
exports.markTaskComplete = async (req, res) => {
  const { taskId } = req.params;
  const { completed,listId } = req.body;


  try {
    const list = await List.findById(listId);
    if (!list) return res.status(404).json({ message: 'List not found' });

    const task = list.tasks.id(taskId);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    task.completed = completed;
    await list.save();
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  const { taskId } = req.params;
  const { listId } = req.body;

  try {
    const list = await List.findById(listId);
    if (!list) return res.status(404).json({ message: 'List not found' });

    const task = list.tasks.id(taskId);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    task.deleteOne();
    await list.save();
    res.status(200).json({ task, message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
