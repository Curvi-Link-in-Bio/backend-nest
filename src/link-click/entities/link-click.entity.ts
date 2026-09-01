import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import type { Link } from '../../link/entities/link.entity.js';

@Entity('link_clicks')
export class LinkClick {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne('Link', (link: Link) => link.linkClicks)
  @JoinColumn({ name: 'link_id' })
  link: Link;

  @Column({ nullable: false, length: 255 })
  referrer: string;

  @Column({ name: 'user_agent', nullable: false, length: 100 })
  userAgent: string;

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
