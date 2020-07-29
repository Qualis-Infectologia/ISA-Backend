import { inject, injectable } from "tsyringe";

import AppError from "@errors/AppError";
import IRolesRepository from "../repositories/IRolesRepository";

@injectable()
class DeleteRoleService {
  constructor(
    @inject("RolesRepository")
    private rolesRepository: IRolesRepository
  ) { }

  public async execute(id: string): Promise<void> {
    const role = await this.rolesRepository.findById(id);

    if (!role) {
      throw new AppError("Perfil não encontrado", 404);
    }

    await this.rolesRepository.delete(id);
  }
}

export default DeleteRoleService;
