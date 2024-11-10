import { PartialType } from '@nestjs/mapped-types';
import { CreateInventoryLocationDto } from './create-inventory_location.dto';

export class UpdateInventoryLocationDto extends PartialType(CreateInventoryLocationDto) {}
