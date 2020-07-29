import * as Yup from 'yup';
import { Request, Response, NextFunction } from 'express';

class UsersValidator {
  async create(request: Request, response: Response, next: NextFunction) {
    const schema = Yup.object().shape({
      username: Yup.string().required(),
      name: Yup.string().required(),
      password: Yup.string().required(),
      confirm_password: Yup.string().required(),
      cpf: Yup.string().required(),
      phone: Yup.string().required(),
      email: Yup.string().email().required(),
      roleId: Yup.string().required(),
      establishments: Yup.array().required(),
    });

    await schema.validate(request.body, { abortEarly: false });

    return next();
  }

  async update(request: Request, response: Response, next: NextFunction) {
    const schema = Yup.object().shape({
      id: Yup.string().required(),
      username: Yup.string().required(),
      name: Yup.string().required(),
      cpf: Yup.string().required(),
      phone: Yup.string().required(),
      email: Yup.string().email().required(),
      roleId: Yup.string(),
      establishments: Yup.array(),
    });

    await schema.validate(request.body, { abortEarly: false });

    return next();
  }
}

export default new UsersValidator();
