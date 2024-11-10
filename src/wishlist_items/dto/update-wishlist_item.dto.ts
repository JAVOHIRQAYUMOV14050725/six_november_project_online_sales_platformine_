import { PartialType } from '@nestjs/mapped-types';
import { CreateWishlistItemDto } from './create-wishlist_item.dto';

export class UpdateWishlistItemDto extends PartialType(CreateWishlistItemDto) {}
