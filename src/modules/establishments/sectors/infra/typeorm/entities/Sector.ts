import {
  Entity,
  ManyToMany,
  JoinTable,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

import Establishment from '@establishments/infra/typeorm/entities/Establishment';
import Location from '@establishments/sectors/locations/infra/typeorm/entities/Location';

@Entity('sectors')
class Sector {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column('uuid')
  establishmentId: string;

  @ManyToOne(type => Establishment, establishment => establishment.sectors)
  establishment: Establishment;

  @OneToMany(type => Location, location => location.sector)
  locations: Location[];
}

export default Sector;
