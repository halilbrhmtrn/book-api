
import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/user.service';

const userService = new UserService();

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name } = req.body;
    const newUser = await userService.createUser(name);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = parseInt(req.params.id, 10);
    const user = await userService.getUser(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
}

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = parseInt(req.params.id, 10);
    const { name } = req.body;
    const updatedUser = await userService.updateUser(userId, { name});
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = parseInt(req.params.id, 10);
    const deletedUser = await userService.deleteUser(userId);
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    next(error);
  }
};


export const borrowBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = parseInt(req.params.id, 10);
    const bookId = parseInt(req.params.bookId, 10);
    const borrowing = await userService.borrowBook(userId, bookId);
    if (!borrowing) {
      return res.status(404).json({ error: 'User or book not found' });
    }
    res.json(borrowing);
  } catch (error) {
    next(error);
  }
}

export const returnBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = parseInt(req.params.id, 10);
    const bookId = parseInt(req.params.bookId, 10);
    const { score } = req.body;
    const borrowing = await userService.returnBook(userId, bookId, score);
    if (!borrowing) {
      return res.status(404).json({ error: 'User or book not found' });
    }
    res.json(borrowing);
  } catch (error) {
    next(error);
  }
}
