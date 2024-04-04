import * as express from 'express';
import * as Joi from 'joi';

export const createUserSchema = Joi.object({
  name: Joi.string().required(),
});

export const updateUserSchema = Joi.object({
  name: Joi.string(),
});

export const userIdParamSchema = Joi.object({
  id: Joi.number().integer().min(1).required(),
});

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