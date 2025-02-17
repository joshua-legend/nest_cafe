import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ResponseFail, ResponseSuccess } from 'src/common/response/response.types';
import { ResponseMessages } from 'src/common/response/response-messages';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { predicateHelpers } from 'src/common/response/response-predicates';
import { Category } from 'src/categories/entities/category.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,

    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const { product_name, category_id } = createProductDto;

    const existingProducts = await this.productsRepository.find({ where: { product_name } });
    if (predicateHelpers.exists(existingProducts)) {
      return new ResponseFail(ResponseMessages.FAIL.EXISTS_ALREADY_NAME);
    }

    const category = await this.categoriesRepository.findOne({ where: { id: category_id } });
    if (!category) {
      return new ResponseFail(ResponseMessages.FAIL.EXIST_NO_ID(category_id));
    }

    const newProduct = this.productsRepository.create({ ...createProductDto, category });
    const result = await this.productsRepository.save(newProduct);
    return new ResponseSuccess(ResponseMessages.SUCCESS.CREATE_OBJECT(product_name), result);
  }

  async findAll() {
    return await this.productsRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  async update(createProductDto: CreateProductDto) {
    const { id, product_name, category_id } = createProductDto;
    const existingProducts = await this.productsRepository.find({ where: { product_name } });
    if (predicateHelpers.exists(existingProducts)) {
      return new ResponseFail(ResponseMessages.FAIL.EXISTS_ALREADY_NAME);
    }

    const category = await this.categoriesRepository.findOne({ where: { id: category_id } });
    if (!category) {
      return new ResponseFail(ResponseMessages.FAIL.EXIST_NO_ID(category_id));
    }

    return;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
