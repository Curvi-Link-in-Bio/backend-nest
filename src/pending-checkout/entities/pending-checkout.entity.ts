import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import type { User } from '../../user/entities/user.entity.js';

enum StatusEnum {
  PENDING = 'pending',
  FINALIZED = 'finalized',
}

@Entity('pending_checkouts')
export class PendingCheckout {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne('User', (user: User) => user.pendingCheckouts)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ nullable: false, length: 50 })
  plan: string;

  @Column({ nullable: false, enum: StatusEnum })
  status: StatusEnum;

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
