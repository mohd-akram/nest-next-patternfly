import {
  BaseEntity,
  Column,
  Entity,
  Index,
  ObjectId,
  ObjectIdColumn,
} from 'typeorm';

@Entity()
export default class User extends BaseEntity {
  @ObjectIdColumn()
  _id: ObjectId;

  @Index({ unique: true })
  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;
}
