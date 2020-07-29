import { Response, Request } from 'express';
import { container } from 'tsyringe';
import Role from '@security/roles/infra/typeorm/entities/Role';
import Establishment from '@establishments/infra/typeorm/entities/Establishment';

//TODO: remover ao integrar KEYCLOAK
// import AuthenticateUserService from '@modules/users/services/AutenticateUserService';

class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { username, password } = request.body;

    //TODO: remover ao integrar KEYCLOAK
    // const authenticateUser = container.resolve(AuthenticateUserService);

    //TODO: remover ao integrar KEYCLOAK
    // const { user, token } = await authenticateUser.execute({ username, password });

    const user = {
      name: 'string',
      username: 'string',
      password: 'string',
      cpf: 'string',
      phone: 'string',
      email: 'string',
    };
    const token = 'teste';

    delete user.password;

    return response.status(200).json({ user, token });
  }
}

export default new SessionsController();
