import Thought from '../models/Thought.js';
import User from '../models/User.js';

const thoughtController = {
  getAllThoughts: async (c) => {
    try {
      const thoughts = await Thought.find();
      return c.json(thoughts);
    } catch (error) {
      console.error(error);
      return c.json({ error: 'Server error' }, 500);
    }
  },
  getThoughtById: async (c) => {
    try {
      const thought = await Thought.findById(c.req.param('id'));
      if (!thought) {
        return c.json({ message: 'Thought not found' }, 404);
      }
      return c.json(thought);
    } catch (error) {
      console.error(error);
      return c.json({ error: 'Server error' }, 500);
    }
  },
  createThought: async (c) => {
    try {
      const { userId, ...thoughtData } = await c.req.json();
      const thought = await Thought.create(thoughtData);
      await User.findByIdAndUpdate(userId, { $push: { thoughts: thought._id } });
      return c.json(thought, 201);
    } catch (error) {
      console.error(error);
      return c.json({ error: 'Server error' }, 500);
    }
  },
  updateThought: async (c) => {
    try {
      const thought = await Thought.findByIdAndUpdate(c.req.param('id'), await c.req.json(), { new: true, runValidators: true });
      if (!thought) {
        return c.json({ message: 'Thought not found' }, 404);
      }
      return c.json(thought);
    } catch (error) {
      console.error(error);
      return c.json({ error: 'Server error' }, 500);
    }
  },
  deleteThought: async (c) => {
    try {
      const thought = await Thought.findByIdAndDelete(c.req.param('id'));
      if (!thought) {
        return c.json({ message: 'Thought not found' }, 404);
      }
      await User.findByIdAndUpdate(thought.userId, { $pull: { thoughts: thought._id } });
      return c.json({ message: 'Thought deleted' });
    } catch (error) {
      console.error(error);
      return c.json({ error: 'Server error' }, 500);
    }
  },
  addReaction: async (c) => {
    try {
      const thought = await Thought.findByIdAndUpdate(c.req.param('thoughtId'), { $push: { reactions: await c.req.json() } }, { new: true, runValidators: true });
      if (!thought) {
        return c.json({ message: 'Thought not found' }, 404);
      }
      return c.json(thought);
    } catch (error) {
      console.error(error);
      return c.json({ error: 'Server error' }, 500);
    }
  },
  removeReaction: async (c) => {
    try {
      const thought = await Thought.findByIdAndUpdate(c.req.param('thoughtId'), { $pull: { reactions: { reactionId: c.req.param('reactionId') } } }, { new: true });
      if (!thought) {
        return c.json({ message: 'Thought not found' }, 404);
      }
      return c.json(thought);
    } catch (error) {
      console.error(error);
      return c.json({ error: 'Server error' }, 500);
    }
  }
};

export default thoughtController;