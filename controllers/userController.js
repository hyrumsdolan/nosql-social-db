import User from '../models/User.js';

const userController = {
  test: async (c) => {
    return c.text('User route is working');
  },
  getAllUsers: async (c) => {
    try {
      const users = await User.find().populate('thoughts friends');
      return c.json(users);
    } catch (error) {
      console.error(error);
      return c.json({ error: 'Server error' }, 500);
    }
  },
  getUserById: async (c) => {
    try {
      const user = await User.findById(c.req.param('id')).populate('thoughts friends');
      if (!user) {
        return c.json({ message: 'User not found' }, 404);
      }
      return c.json(user);
    } catch (error) {
      console.error(error);
      return c.json({ error: 'Server error' }, 500);
    }
  },
  createUser: async (c) => {
    try {
      const user = await User.create(await c.req.json());
      return c.json(user, 201);
    } catch (error) {
      console.error(error);
      return c.json({ error: 'Server error' }, 500);
    }
  },
  updateUser: async (c) => {
    try {
      const user = await User.findByIdAndUpdate(c.req.param('id'), await c.req.json(), { new: true, runValidators: true });
      if (!user) {
        return c.json({ message: 'User not found' }, 404);
      }
      return c.json(user);
    } catch (error) {
      console.error(error);
      return c.json({ error: 'Server error' }, 500);
    }
  },
  deleteUser: async (c) => {
    try {
      const user = await User.findByIdAndDelete(c.req.param('id'));
      if (!user) {
        return c.json({ message: 'User not found' }, 404);
      }
      // BONUS: Remove user's associated thoughts
      await User.deleteMany({ username: user.username });
      return c.json({ message: 'User and associated thoughts deleted' });
    } catch (error) {
      console.error(error);
      return c.json({ error: 'Server error' }, 500);
    }
  },
  addFriend: async (c) => {
    try {
      const user = await User.findByIdAndUpdate(c.req.param('userId'), { $addToSet: { friends: c.req.param('friendId') } }, { new: true });
      if (!user) {
        return c.json({ message: 'User not found' }, 404);
      }
      return c.json(user);
    } catch (error) {
      console.error(error);
      return c.json({ error: 'Server error' }, 500);
    }
  },
  removeFriend: async (c) => {
    try {
      const user = await User.findByIdAndUpdate(c.req.param('userId'), { $pull: { friends: c.req.param('friendId') } }, { new: true });
      if (!user) {
        return c.json({ message: 'User not found' }, 404);
      }
      return c.json(user);
    } catch (error) {
      console.error(error);
      return c.json({ error: 'Server error' }, 500);
    }
  }
};

export default userController;