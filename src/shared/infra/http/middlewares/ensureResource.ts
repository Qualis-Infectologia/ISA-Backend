import { Response, Request, NextFunction } from 'express';
import AppError from '@errors/AppError';
import Resource from '@security/resources/infra/typeorm/entities/Resource';

export default function ensureResource(resourceName: string) {
  return function (request: Request, response: Response, next: NextFunction) {
    let permission = false;

    // @ts-ignore
    request.user.role.resources.map((resource: Resource) => {
      if (resource.name === resourceName) {
        permission = true;
      }
    });

    if (permission) {
      next();
    } else {
      throw new AppError('User without permission', 401);
    }
  };
}
