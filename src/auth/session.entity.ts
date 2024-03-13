import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ObjectIdColumn,
} from 'typeorm';

import { ObjectId } from 'mongodb';

@Entity()
export default class Session extends BaseEntity {
  @ObjectIdColumn()
  _id: ObjectId;

  @Index({ unique: true })
  @Column()
  key: string;

  @Column()
  userId: ObjectId;

  @Index({ expireAfterSeconds: 14 * 24 * 60 * 60 })
  @CreateDateColumn()
  created: Date;
}
