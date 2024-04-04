import * as express from 'express';
import { getBooks, getBook, createBook } from '../controllers/book.controller';
import { validateCreateBook, validateBookId } from '../validations/book.validation';

const router = express.Router();

router.get('/', getBooks);
router.get('/:id', validateBookId, getBook);
router.post('/', validateCreateBook, createBook);

export default router;
