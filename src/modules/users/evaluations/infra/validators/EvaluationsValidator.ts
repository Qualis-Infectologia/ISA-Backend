import * as Yup from 'yup';
import { Request, Response, NextFunction } from 'express';

class EvaluationsValidator {
  async create(request: Request, response: Response, next: NextFunction) {
    const schema = Yup.object().shape({
      userId: Yup.string().required(),
      liberate: Yup.boolean().required(),
      days: Yup.number(),
      annotation: Yup.string().required(),
      diaryId: Yup.string().required(),
    });

    await schema.validate(request.body, { abortEarly: false });

    return next();
  }
}

export default new EvaluationsValidator();
