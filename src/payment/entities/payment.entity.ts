import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import type { User } from '../../user/entities/user.entity.js';

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne('User', (user: User) => user.payments)
  user: User;

  @Column({ nullable: false, length: 255 })
  provider: string;

  @Column({ nullable: false, type: 'jsonb' })
  metadata: string;

  @Column({ nullable: false, default: false })
  deleted: boolean;

  @Column({
    name: 'created_at',
    nullable: false,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    name: 'updated_at',
    nullable: false,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
