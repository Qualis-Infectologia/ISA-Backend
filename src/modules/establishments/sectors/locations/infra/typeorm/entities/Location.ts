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

import Sector from '@establishments/sectors/infra/typeorm/entities/Sector';
import Baseline from '@users/baselines/infra/typeorm/entities/Baseline';

@Entity('locations')
class Location {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column('uuid')
  sectorId: string;

  @ManyToOne(type => Sector, sector => sector.locations)
  sector: Sector;

  @OneToMany(type => Baseline, baseline => baseline.location)
  baselines: Baseline[];
}

export default Location;
