import { PartialType } from '@nestjs/mapped-types';
import { CreateLinkClickDto } from './create-link-click.dto.js';

export class UpdateLinkClickDto extends PartialType(CreateLinkClickDto) {}
