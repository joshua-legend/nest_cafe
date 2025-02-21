import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './categories/entities/category.entity';
import { Product } from './products/entities/product.entity';

@Module({
  imports: [
    ProductsModule,
    CategoriesModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'joshua',
      password: '1234',
      database: 'cafe',
      entities: [Category, Product],
      synchronize: true, // 개발 단계에서만 사용 (프로덕션에서는 마이그레이션 권장)
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
