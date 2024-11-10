import { PartialType } from '@nestjs/mapped-types';
import { CreateTrackingStatusDto } from './create-tracking_status.dto';

export class UpdateTrackingStatusDto extends PartialType(CreateTrackingStatusDto) {}
