import { inject, injectable } from 'tsyringe';
import IBaselinesRepository from '../repositories/IBaselinesRepository';
import Baseline from '../infra/typeorm/entities/Baseline';
import GenreEnum from '../enums/GenreEnum';
import RaceEnum from '../enums/RaceEnum';
import User from '@users/infra/typeorm/entities/User';
import ILocationsRepository from '@establishments/sectors/locations/repositories/ILocationsRepository';
import Location from '@establishments/sectors/locations/infra/typeorm/entities/Location';
import AppError from '@shared/errors/AppError';

interface Request {
  age: number;
  genre: GenreEnum;
  race: RaceEnum;
  weight: number;
  height: number;
  city: string;
  recent_appointments: boolean;
  contact_covid19: boolean;
  mask: boolean;
  user: User;
  occupation: string;
  locationId: string;
  hypertension: boolean;
  diabetes: boolean;
  heart_disease: boolean;
  lung_disease: boolean;
  asthma: boolean;
  smoking: boolean;
  kidney_disease: boolean;
  cancer: boolean;
  corticosteroids_or_methotrexate: boolean;
  gestation: boolean;
}

@injectable()
class CreateBaselineService {
  constructor(
    @inject('BaselinesRepository')
    private baselinesRepository: IBaselinesRepository,
    @inject('LocationsRepository')
    private locationsRepository: ILocationsRepository,
  ) {}

  public async execute({
    age,
    genre,
    race,
    weight,
    height,
    city,
    recent_appointments,
    contact_covid19,
    mask,
    userId,
    locationId,
    occupation,
    hypertension,
    diabetes,
    heart_disease,
    lung_disease,
    asthma,
    smoking,
    kidney_disease,
    cancer,
    corticosteroids_or_methotrexate,
    gestation,
  }: Request): Promise<Baseline> {
    const location = await this.locationsRepository.findById(locationId);

    if (!location) {
      throw new AppError('Localização não encontrada', 404);
    }

    const baseline = await this.baselinesRepository.create({
      age,
      genre,
      race,
      weight,
      height,
      city,
      recent_appointments,
      contact_covid19,
      mask,
      userId,
      location,
      occupation,
      hypertension,
      diabetes,
      heart_disease,
      lung_disease,
      asthma,
      smoking,
      kidney_disease,
      cancer,
      corticosteroids_or_methotrexate,
      gestation,
    });

    return baseline;
  }
}

export default CreateBaselineService;
