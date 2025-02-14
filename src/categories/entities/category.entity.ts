import { BaseCustomEntity } from 'src/common/base/baseCustom.entity';
import { Column, Entity, Unique } from 'typeorm';

@Entity()
@Unique(['category_name'])
export class Category extends BaseCustomEntity {
  @Column({ nullable: false })
  category_name: string;
}
