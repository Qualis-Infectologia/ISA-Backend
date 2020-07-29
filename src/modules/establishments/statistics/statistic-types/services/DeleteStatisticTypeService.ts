import { inject, injectable } from "tsyringe";
import IStatisticTypesRepository from "../repositories/IStatisticTypesRepository";
import AppError from "@shared/errors/AppError";

@injectable()
class DeleteStatisticTypeService {
  constructor(
    @inject("StatisticTypesRepository")
    private statisticTypesRepository: IStatisticTypesRepository
  ) { }

  public async execute(id: string): Promise<void> {
    const statisticType = await this.statisticTypesRepository.findById(id);

    if (!statisticType) {
      throw new AppError("Tipo de Estatística não encontrada", 404);
    }

    await this.statisticTypesRepository.delete(id);
  }
}

export default DeleteStatisticTypeService;
