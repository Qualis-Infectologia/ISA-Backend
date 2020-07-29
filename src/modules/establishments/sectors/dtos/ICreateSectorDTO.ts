import Establishment from '@establishments/infra/typeorm/entities/Establishment';

export default interface ICreateSectorDTO {
  name: string;
  establishment: Establishment;
}
