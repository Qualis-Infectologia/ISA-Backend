import { ObjectID, ObjectIdColumn, Entity, Column } from 'typeorm';

interface Data {
  status: number;
  message: string | string[];
}

@Entity({ database: 'logs' })
class Log {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  data: Data;

  @Column('timestamp')
  timestamp: Date;
}

export default Log;
