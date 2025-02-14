import { Category } from 'src/categories/entities/category.entity';
import { BaseCustomEntity } from 'src/common/base/baseCustom.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Product extends BaseCustomEntity {
  @Column({ type: 'varchar', length: 100, nullable: false, default: '', unique: true, comment: '상품 이름' })
  product_name: string;

  @Column({ type: 'text', nullable: true, comment: '상품 설명' })
  product_description: string;

  @Column({ type: 'decimal', precision: 10, nullable: false, default: 0, comment: '상품 가격' })
  product_price: number;

  @Column({ type: 'varchar', length: 255, nullable: true, unique: true, comment: '상품 이미지 경로' })
  product_image_src: string;

  @Column({ type: 'int', nullable: false, default: 0, comment: '상품 재고 수량' })
  product_quantity: number;

  @ManyToOne(() => Category, { eager: true })
  @JoinColumn({ name: 'category_id' })
  category: Category;
}
