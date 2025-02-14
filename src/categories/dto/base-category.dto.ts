import { IsNotEmpty, IsString, Length } from 'class-validator';

export class BaseCategoryDto {
  @IsString({ message: '카테고리 이름은 문자열이어야 합니다.' })
  @IsNotEmpty({ message: '카테고리 이름은 비어있을 수 없습니다.' })
  @Length(1, 50, { message: '카테고리 이름은 1자 이상 50자 이하여야 합니다.' })
  category_name: string;
}
