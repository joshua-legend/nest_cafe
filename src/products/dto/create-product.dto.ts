import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';
import { BaseCustomEntity } from 'src/common/base/baseCustom.entity';

export class CreateProductDto extends BaseCustomEntity {
  static allowedKeys = ['product_name', 'product_description', 'product_price', 'product_image_src', 'product_quantity', 'category_id'];

  @IsString({ message: '상품 이름은 문자열이어야 합니다.' })
  @IsNotEmpty({ message: '상품 이름은 필수입니다.' })
  product_name: string;

  @IsString({ message: '상품 설명은 문자열이어야 합니다.' })
  @IsOptional()
  product_description?: string;

  @Type(() => Number)
  @IsNumber({}, { message: '상품 가격은 숫자여야 합니다.' })
  @IsPositive({ message: '상품 가격은 양수여야 합니다.' })
  product_price: number;

  @IsString({ message: '상품 이미지 경로는 문자열이어야 합니다.' })
  @IsOptional()
  product_image_src?: string;

  @Type(() => Number)
  @IsNumber({}, { message: '상품 재고 수량은 숫자여야 합니다.' })
  @IsPositive({ message: '상품 재고 수량은 양수여야 합니다.' })
  product_quantity: number;

  @Type(() => Number)
  @IsNumber({}, { message: '카테고리 ID는 숫자여야 합니다.' })
  @IsPositive({ message: '카테고리 ID는 양수여야 합니다.' })
  category_id: number;
}
