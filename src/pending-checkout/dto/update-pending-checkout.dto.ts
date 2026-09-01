import { PartialType } from '@nestjs/mapped-types';
import { CreatePendingCheckoutDto } from './create-pending-checkout.dto.js';

export class UpdatePendingCheckoutDto extends PartialType(
  CreatePendingCheckoutDto,
) {}
