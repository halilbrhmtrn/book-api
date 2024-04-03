import * as express from 'express';
import { createUser, getUser, getAllUsers, updateUser, deleteUser } from '../controllers/user.controller';
import { createUserSchema, updateUserSchema, userIdParamSchema } from '../validations/user.validation';

export const validateCreateUser = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { error } = createUserSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
};
  
export const validateUpdateUser = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { error } = updateUserSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
};
  
export const validateUserId = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { error } = userIdParamSchema.validate(req.params);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

const router = express.Router();

router.get('/', getAllUsers);
router.post('/', validateCreateUser, createUser);
router.get('/:id', validateUserId, getUser);
router.put('/:id', [validateUserId, validateUpdateUser], updateUser);
router.delete('/:id', validateUserId, deleteUser);

export default router;


