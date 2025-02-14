import { IsInt, IsPositive } from 'class-validator';
import { BaseCategoryDto } from './base-category.dto';

export class DeleteCategoryDto extends BaseCategoryDto {
  @IsInt()
  @IsPositive()
  id: number;
}
