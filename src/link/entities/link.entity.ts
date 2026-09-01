import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import type { User } from '../../user/entities/user.entity.js';
import type { LinkClick } from '../../link-click/entities/link-click.entity.js';

@Entity('links')
export class Link {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne('User', (user: User) => user.links)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ nullable: false, length: 100 })
  title: string;

  @Column({ nullable: false, length: 255 })
  url: string;

  @Column({ nullable: false, default: true })
  active: boolean;

  @Column({ nullable: false, type: 'integer' })
  clicks: number;

  @Column({ nullable: false, length: 100 })
  category: string;

  @Column({ nullable: false, type: 'integer' })
  position: number;

  @OneToMany('LinkClick', (linkClick: LinkClick) => linkClick.link)
  linkClicks: LinkClick[];

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
