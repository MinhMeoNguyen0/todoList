const jwt = require('jsonwebtoken');
const User = require('../models/User');
const List = require('../models/List');

// Middleware to check/create a user and generate a JWT
exports.checkOrCreateUser = async (req, res) => {
  const { userId } = req.body; // User ID from the client (if available)
  try {
    let user;


    if (!userId) {
      // If no userId, create a new user
      
      user = await User.create({});
      console.log('No userId provided, creating a new user');

      // Create 3 default example lists
      const defaultLists = [
        { name: 'YouTube', userId: user._id, tasks: [{ title: 'Finish Tutorial' }, { title: 'Study for AWS' }, { title: 'Finish Project' }] },
        { name: 'Work', userId: user._id, tasks: [{ title: 'Build Backend' }, { title: 'Build Frontend' }] },
        { name: 'Grocery', userId: user._id, tasks: [{ title: ' Milk' }, { title: 'Bread' }, { title: 'Eggs' }, { title: 'Bananas' }] },
      ];
      await List.insertMany(defaultLists);
    } else {
      // If userId exists, validate it
      user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: 'User not found' });
    }

    // Generate JWT for the user
    const payload = { user: { id: user._id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token, userId: user._id });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};
