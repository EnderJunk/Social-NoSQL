import User from '../models/User.js';
import Thought from '../models/Thought.js';
import { Request, Response } from 'express';

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find().populate('thoughts').populate('friends');
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getSingleUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ _id: req.params.userId })
      .populate('thoughts')
      .populate('friends')
      .select('-__v');

    if (!user) {
      res.status(404).json({ message: 'No user with that ID' });
    } else {
      res.json(user);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// create a new user
export const createUser = async (req: Request, res: Response) => {
  try {
    const dbUserData = await User.create(req.body);
    res.json(dbUserData);
  } catch (err) {
    res.status(500).json(err);
  }
};

// update a user
export const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    );

    if (!user) {
      res.status(404).json({ message: 'No user with this id!' });
    }

    return res.json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
};

// delete a user
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findOneAndDelete({ _id: req.params.userId });

    if (!user) {
      return res.status(404).json({ message: 'No user with this id!' });
    }

    // Remove user's associated thoughts
    await Thought.deleteMany({ username: user.username });

    return res.json({ message: 'User and associated thoughts deleted!' });
  } catch (err) {
    return res.status(500).json(err);
  }
};

// add a friend
export const addFriend = async (req: Request, res: Response) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'No user with this id!' });
    }

    return res.json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
};

// remove a friend
export const removeFriend = async (req: Request, res: Response) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'No user with this id!' });
    }

    return res.json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
};
