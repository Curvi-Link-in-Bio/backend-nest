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
import { PlanEnum } from '../enums/plan.enum.js';
import { ThemeEnum } from '../enums/theme.enum.js';
import { PaymentMethodEnum } from '../enums/paymentMethod.enum.js';

const defaultCategories = ['redes sociais', 'produtos', 'conteúdo', 'contato'];

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, length: 100 })
  email: string;

  @Column({ nullable: false, length: 255 })
  password: string;

  @Column({ nullable: false, length: 50 })
  username: string;

  @Column({ name: 'display_name', nullable: false, length: 100 })
  displayName: string;

  @Column({ nullable: true, type: 'text' })
  bio: string;

  @Column({ name: 'avatar_url', nullable: true, type: 'text' })
  avatarUrl: string;

  @Column({ nullable: false, enum: ThemeEnum })
  theme: ThemeEnum;

  @Column({ name: 'button_color', nullable: false, length: 50 })
  buttonColor: string;

  @Column({ name: 'background_color', nullable: false, length: 50 })
  backgroundColor: string;

  @Column({ name: 'background_image_url', nullable: true, type: 'text' })
  backgroundImageUrl: string;

  @Column({ nullable: false, enum: PlanEnum })
  plan: PlanEnum;

  @Column({ name: 'payment_method', nullable: false, enum: PaymentMethodEnum })
  paymentMethod: PaymentMethodEnum;

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
