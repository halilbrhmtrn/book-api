import * as express from 'express';
import { createUser, getUser, getAllUsers, updateUser, deleteUser } from '../controllers/user.controller';
import { validateCreateUser, validateUserId, validateUpdateUser } from '../validations/user.validation';

const router = express.Router();

router.get('/', getAllUsers);
router.post('/', validateCreateUser, createUser);
router.get('/:id', validateUserId, getUser);
router.put('/:id', [validateUserId, validateUpdateUser], updateUser);
router.delete('/:id', validateUserId, deleteUser);

export default router;


