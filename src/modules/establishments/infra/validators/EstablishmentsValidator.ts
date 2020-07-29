import * as Yup from "yup";
import { Request, Response, NextFunction } from "express";

class EstablishmentsValidator {
  async create(request: Request, response: Response, next: NextFunction) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      cnpj: Yup.string().required(),
      phone: Yup.string().required(),
      city: Yup.string().required(),
      active: Yup.boolean().required(),
    });

    await schema.validate(request.body, { abortEarly: false });

    return next();
  }

  async update(request: Request, response: Response, next: NextFunction) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      cnpj: Yup.string().required(),
      phone: Yup.string().required(),
      city: Yup.string().required(),
      active: Yup.boolean().required(),
    });

    await schema.validate(request.body, { abortEarly: false });

    return next();
  }
}

export default new EstablishmentsValidator();
