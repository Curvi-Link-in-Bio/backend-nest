import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm/browser';
import type { Link } from '../../link/entities/link.entity.js';
import type { PendingCheckout } from '../../pending-checkout/entities/pending-checkout.entity.js';
import type { Payment } from '../../payment/entities/payment.entity.js';
import type { Upload } from '../../upload/entities/upload.entity.js';

const defaultCategories = ['Redes Sociais', 'Produtos', 'Conteúdo', 'Contato'];

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, length: 100 })
  email: string;

  @Column({ name: 'password_hash', nullable: false, length: 255 })
  passwordHash: string;

  @Column({ nullable: false, length: 50 })
  username: string;

  @Column({ name: 'display_name', nullable: false, length: 100 })
  displayName: string;

  @Column({ nullable: true, type: 'text' })
  bio: string;

  @Column({ name: 'avatar_url', nullable: true, length: 255 })
  avatarUrl: string;

  @Column({ nullable: false, length: 50 })
  theme: string;

  @Column({ name: 'button_color', nullable: false, length: 50 })
  buttonColor: string;

  @Column({ name: 'background_color', nullable: false, length: 50 })
  backgroundColor: string;

  @Column({ name: 'background_image_url', nullable: true, length: 255 })
  backgroundImageUrl: string;

  @Column({ nullable: false, length: 50 })
  plan: string;

  @Column({ name: 'payment_method', nullable: false, length: 50 })
  paymentMethod: string;

  @Column({
    nullable: false,
    type: 'simple-array',
    array: true,
    default: defaultCategories,
  })
  categories: string[];

  @OneToMany('Link', (link: Link) => link.user)
  links: Link[];

  @OneToMany(
    'PendingCheckout',
    (pendingCheckout: PendingCheckout) => pendingCheckout.user,
  )
  pendingCheckouts: PendingCheckout[];

  @OneToMany('Payment', (payment: Payment) => payment.user)
  payments: Payment[];

  @OneToMany('Upload', (upload: Upload) => upload.user)
  uploads: Upload[];

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
