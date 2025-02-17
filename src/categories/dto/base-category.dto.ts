import { IsNotEmpty, IsString, Length } from 'class-validator';
import { BaseCustomEntity } from 'src/common/base/baseCustom.entity';

export class BaseCategoryDto extends BaseCustomEntity {
  @IsString({ message: 'category_name은 문자열이어야 합니다.' })
  @Length(1, 50, { message: 'category_name은 1자 이상 50자 이하여야 합니다.' })
  @IsNotEmpty({ message: 'category_name은 비어있을 수 없습니다.' })
  category_name: string;
}
