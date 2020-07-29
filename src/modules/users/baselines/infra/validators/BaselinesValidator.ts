import * as Yup from 'yup';
import { Request, Response, NextFunction } from 'express';

class BaselinesValidator {
  async create(request: Request, response: Response, next: NextFunction) {
    const schema = Yup.object().shape({
      age: Yup.number().integer().required(),
      weight: Yup.number().required(),
      height: Yup.number().required(),
      genre: Yup.mixed().oneOf(['M', 'F']).required(),
      race: Yup.mixed().oneOf(['B', 'M', 'W']).required(),
      city: Yup.string().required(),
      recent_appointments: Yup.boolean().required(),
      contact_covid19: Yup.boolean().required(),
      mask: Yup.boolean().required(),
      occupation: Yup.string().required(),
      locationId: Yup.string().required(),
      hypertension: Yup.boolean().required(),
      diabetes: Yup.boolean().required(),
      heart_disease: Yup.boolean().required(),
      lung_disease: Yup.boolean().required(),
      asthma: Yup.boolean().required(),
      smoking: Yup.boolean().required(),
      kidney_disease: Yup.boolean().required(),
      cancer: Yup.boolean().required(),
      corticosteroids_or_methotrexate: Yup.boolean().required(),
      gestation: Yup.boolean().required(),
    });

    await schema.validate(request.body, { abortEarly: false });

    return next();
  }
}

export default new BaselinesValidator();
