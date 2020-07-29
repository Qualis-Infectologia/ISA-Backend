import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';
import Resources from '../seeds/Resource.seed';
import Roles from '../seeds/Role.seed';
import Admin from '../seeds/User.seed';
import Resource from '@security/resources/infra/typeorm/entities/Resource';
import Role from '@security/roles/infra/typeorm/entities/Role';
import User from '@users/infra/typeorm/entities/User';

export class BasicSeed1592918484975 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    try {
      const resourcesRepository = getRepository(Resource);
      const resourcesCreated: Resource[] = [];
      for (const res of Resources) {
        const resourceCreated = resourcesRepository.create(res);
        await resourcesRepository.save(resourceCreated);
        resourcesCreated.push(resourceCreated);
      }

      const rolesRepository = getRepository(Role);
      const rolesCreated: Role[] = [];
      for (const res of Roles) {
        switch (res.name) {
          case 'Responsável':
            res.resources = resourcesCreated.filter(resource => {
              return (
                resource.name === 'Diário' || resource.name === 'Monitoramento'
              );
            });
            break;
          case 'Assistido':
            res.resources = resourcesCreated.filter(resource => {
              return resource.name === 'Diário';
            });
            break;
          case 'Infectologista':
            res.resources = resourcesCreated.filter(resource => {
              return resource.name === 'Diário' || resource.name === 'Painel' || resource.name === 'Avaliações';
            });
            break;
          case 'Administrador':
            res.resources = resourcesCreated.filter(resource => {
              return resource.name === 'Cadastros' || resource.name === 'Logs';
            });
            break;
        }

        const roleCreated = rolesRepository.create(res);
        await rolesRepository.save(roleCreated);
        rolesCreated.push(roleCreated);
      }

      const usersRepository = getRepository(User);
      Admin.role = rolesCreated.filter(role => {
        return role.name === 'Administrador';
      })[0];
      Admin.establishments = [];

      const userCreated = usersRepository.create(Admin);
      await usersRepository.save(userCreated);
    } catch (err) {
      console.log(err);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
