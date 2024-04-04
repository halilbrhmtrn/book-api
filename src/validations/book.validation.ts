import * as express from 'express';
import * as Joi from 'joi';

export const createBookSchema = Joi.object({
  name: Joi.string().required(),
});

export const bookIdParamSchema = Joi.object({
  id: Joi.number().integer().min(1).required(),
});

export const validateCreateBook = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { error } = createBookSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
};
  
export const validateBookId = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { error } = bookIdParamSchema.validate(req.params);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
};