import {
  Entity,
  ManyToMany,
  JoinTable,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import User from '@users/infra/typeorm/entities/User';
import Statistic from '@establishments/statistics/infra/typeorm/entities/Statistic';
import Sector from '@establishments/sectors/infra/typeorm/entities/Sector';

@Entity('establishments')
class Establishment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  cnpj: string;

  @Column()
  phone: string;

  @Column()
  city: string;

  @Column('boolean')
  active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToMany(type => User, user => user.establishments)
  @JoinTable({ name: 'users_establishments' })
  users: User[];

  @OneToMany(type => Statistic, statistic => statistic.establishment)
  statistics: Statistic[];

  @OneToMany(type => Sector, sector => sector.establishment)
  sectors: Sector[];
}

export default Establishment;
