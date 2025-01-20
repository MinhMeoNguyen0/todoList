const List = require('../models/List');

// Retrieve all lists for a user
exports.getLists = async (req, res) => {
  try {
    const lists = await List.find({ userId: req.user.id });
    res.status(200).json(lists);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Retrieve a specific list
exports.getList = async (req, res) => {
  const { listId } = req.params;
  try {
    const list = await List.findById(listId);
    if (!list) return res.status(404).json({ message: 'List not found' });

    res.status(200).json(list);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new list
exports.createList = async (req, res) => {
  const { name } = req.body;
  try {
    const list = new List({ name, userId: req.user.id });
    await list.save();
    res.status(201).json(list);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a list
exports.deleteList = async (req, res) => {
  const { listId } = req.params;
  try {
    const list = await List.findById(listId);
    if (!list) return res.status(404).json({ message: 'List not found' });

    if (list.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    await list.deleteOne();
    res.status(200).json({ message: 'List deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a list name
exports.updateListName = async (req, res) => {
  const { listId } = req.params;
  const { name } = req.body;
  try {
    const list = await List.findById(listId);
    if (!list) return res.status(404).json({ message: 'List not found' });

    if (list.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    list.name = name;
    await list.save();
    res.status(200).json(list);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Mark all tasks as complete/incomplete
exports.markAllTasksComplete = async (req, res) => {
  const { listId } = req.params; // Updated `listId` to `id`
  const { completed } = req.body;

  try {
    const list = await List.findById(listId);
    if (!list) return res.status(404).json({ message: 'List not found' });

    if (list.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    list.tasks.forEach(task => {
      task.completed = completed;
    });
    await list.save();
    res.status(200).json(list);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
