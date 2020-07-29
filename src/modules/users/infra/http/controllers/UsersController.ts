import { Response, Request } from 'express';
import { container } from 'tsyringe';

import ListUsersUnderEvaluationService from '@users/services/ListUsersUnderEvaluationService';
import ShowUserForEvaluationsService from '@users/services/ShowUserForEvaluationsService';
import CountUnderEvaluationService from '@users/services/CountUnderEvaluationService';

import KeycloakAdmin from '@shared/keycloak/keycloak-admin';

class UsersController {
  public async index(req: Request, res: Response): Promise<Response> {
    try {
      const { page } = req.query;
      const users = await KeycloakAdmin.usersList(page);
      const usersWithRoles = await Promise.all(
        users.map((user: any) =>
          KeycloakAdmin.getRoleFromUser(user.id).then((roles: any) => {
            return { roles, user };
          }),
        ),
      );
      return res.status(200).json(usersWithRoles);
    } catch (e) {
      return res.json(e);
    }
  }

  async getUserById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await KeycloakAdmin.getUserById(id);
      const roles = await KeycloakAdmin.getRoleFromUser(user.id);
      return res.status(200).json({ user, roles });
    } catch (e) {
      return res.json(e);
    }
  }

  async getUserByName(req: Request, res: Response) {
    try {
      const { username } = req.body;
      const users = await KeycloakAdmin.getUserByName(username);
      const usersWithRoles = await Promise.all(
        users.map((user: any) =>
          KeycloakAdmin.getRoleFromUser(user.id).then((roles: any) => {
            return { roles, user };
          }),
        ),
      );
      return res.status(200).json(usersWithRoles);
    } catch (e) {
      return res.json(e);
    }
  }

  async indexRoles(req: Request, res: Response) {
    try {
      const roles = await KeycloakAdmin.getRoles();
      return res.status(200).json(roles);
    } catch (e) {
      return res.json(e);
    }
  }

  async addRoleForUser(req: Request, res: Response) {
    try {
      const { id, roleName } = req.body;
      await KeycloakAdmin.addRoleForUser(id, roleName);
      return res.status(200).json();
    } catch (e) {
      return res.json(e);
    }
  }

  async removeRoleFromUser(req: Request, res: Response) {
    try {
      const { id, roleName } = req.body;
      await KeycloakAdmin.removeRoleFromUser(id, roleName);
      return res.status(200).json();
    } catch (e) {
      return res.json(e);
    }
  }
  async usersFromRole(req: Request, res: Response) {
    try {
      const { roleName } = req.body;
      const users = await KeycloakAdmin.getUsersFromRole(roleName);
      return res.json(users);
    } catch (e) {
      return res.json(e);
    }
  }

  public async statusUnderEvaluation(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const listUsersUnderEvaluationService = container.resolve(
      ListUsersUnderEvaluationService,
    );

    const users = await listUsersUnderEvaluationService.execute();

    return response.status(200).json(users);
  }

  public async showForEvaluations(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const showUserForEvaluationsService = container.resolve(
      ShowUserForEvaluationsService,
    );

    const user = await showUserForEvaluationsService.execute(id);

    return response.status(200).json(user);
  }

  public async countUnderEvaluation(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const countUnderEvaluationService = container.resolve(
      CountUnderEvaluationService,
    );

    const count = await countUnderEvaluationService.execute();

    return response.status(200).json(count);
  }
}

export default new UsersController();
