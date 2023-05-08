import { validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

const validateFields = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ msg: errors });
  }

  next();
};

export default validateFields;
