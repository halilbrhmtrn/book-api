import * as express from 'express';
import { createUser, getUser, getAllUsers, updateUser, deleteUser, borrowBook, returnBook } from '../controllers/user.controller';
import { validateCreateUser, validateUserId, validateUpdateUser } from '../validations/user.validation';
import { validateBookId } from '../validations/book.validation';

const router = express.Router();

router.get('/', getAllUsers);
router.post('/', validateCreateUser, createUser);
router.get('/:id', validateUserId, getUser);
router.put('/:id', [validateUserId, validateUpdateUser], updateUser);
router.delete('/:id', validateUserId, deleteUser);
router.post('/:id/borrow/:bookId', borrowBook);
router.post('/:id/return/:bookId', returnBook);

export default router;


