import { IsInt, IsPositive } from 'class-validator';
import { BaseCategoryDto } from './base-category.dto';

export class UpdateCategoryDto extends BaseCategoryDto {
  @IsInt()
  @IsPositive()
  id: number;
}
