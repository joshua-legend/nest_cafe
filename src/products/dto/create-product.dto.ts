import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';
import { BaseCustomEntity } from 'src/common/base/baseCustom.entity';

export class CreateProductDto extends BaseCustomEntity {
  static allowedKeys = ['product_name', 'product_description', 'product_price', 'product_image_src', 'product_quantity', 'category_id'];

  @IsString({ message: 'product_name은 문자열이어야 합니다.' })
  @IsNotEmpty({ message: 'product_name은 필수입니다.' })
  product_name: string;

  @IsString({ message: 'product_description은 문자열이어야 합니다.' })
  @IsOptional()
  product_description?: string;

  @Type(() => Number)
  @IsNumber({}, { message: 'product_price은 숫자여야 합니다.' })
  @IsPositive({ message: 'product_price은 양수여야 합니다.' })
  product_price: number;

  @IsString({ message: 'product_image_src는 문자열이어야 합니다.' })
  @IsOptional()
  product_image_src?: string;

  @Type(() => Number)
  @IsNumber({}, { message: 'product_quantity은 숫자여야 합니다.' })
  @IsPositive({ message: 'product_quantity은 양수여야 합니다.' })
  product_quantity: number;

  @Type(() => Number)
  @IsNumber({}, { message: 'category_id는 숫자여야 합니다.' })
  @IsPositive({ message: 'category_id는 양수여야 합니다.' })
  category_id: number;
}
