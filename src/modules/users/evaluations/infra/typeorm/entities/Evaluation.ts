import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import User from '@users/infra/typeorm/entities/User';
import Diary from '@users/diaries/infra/typeorm/entities/Diary';

@Entity('evaluations')
class Evaluation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('boolean')
  liberate: boolean;

  @Column('numeric')
  days: number;

  @Column('date')
  blocked_until: Date;

  @Column()
  annotation: string;

  @Column('uuid')
  diaryId: string;

  @OneToOne(type => Diary)
  @JoinColumn()
  diary: Diary;

  @Column('uuid')
  userId: string;

  @ManyToOne(type => User, user => user.evaluations)
  @JoinColumn()
  user: User;

  @Column('uuid')
  infectoId: string;

  @OneToOne(type => User)
  @JoinColumn({ name: 'infectoId' })
  infecto: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Evaluation;
