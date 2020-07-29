import Sector from '@establishments/sectors/infra/typeorm/entities/Sector';

export default interface ICreateLocationDTO {
  name: string;
  sector: Sector;
}
