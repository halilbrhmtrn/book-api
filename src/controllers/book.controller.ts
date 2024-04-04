import { Request, Response, NextFunction } from 'express';
import { BookService } from '../services/book.service';

const bookService = new BookService();

export const getBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const books = await bookService.getBooks();
    res.json(books);
  } catch (error) {
    next(error);
  }
};

export const getBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bookId = parseInt(req.params.id, 10);
    const book = await bookService.getBook(bookId);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    next(error);
  }
};

export const createBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name } = req.body;
    const newBook = await bookService.createBook(name);
    res.status(201).json(newBook);
  } catch (error) {
    next(error);
  }
};
