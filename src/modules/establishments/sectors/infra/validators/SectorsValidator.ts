import * as Yup from 'yup';
import { Request, Response, NextFunction } from 'express';

class SectorsValidator {
  async create(request: Request, response: Response, next: NextFunction) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      establishmentId: Yup.string().required(),
    });

    await schema.validate(request.body, { abortEarly: false });

    return next();
  }

  async update(request: Request, response: Response, next: NextFunction) {
    const schema = Yup.object().shape({
      id: Yup.string().required(),
      name: Yup.string().required(),
      establishmentId: Yup.string().required(),
    });

    await schema.validate(request.body, { abortEarly: false });

    return next();
  }
}

export default new SectorsValidator();
