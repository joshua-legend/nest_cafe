import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ResponseFail, ResponseFailAPI, ResponseSuccess, ResponseSuccessAPI } from 'src/common/response/response.types';
import { ResponseMessages } from 'src/common/response/response-messages';
import { predicateHelpers } from 'src/common/response/response-predicates';
import { Product } from 'src/products/entities/product.entity';
import { DeleteCategoryDto } from './dto/delete-category.dto';
@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,

    @InjectRepository(Product) // 참조 엔티티 Repository 주입
    private readonly productsRepository: Repository<Product>,
  ) {}

  async getAllCategories(): Promise<ResponseSuccessAPI<Category[]> | ResponseFailAPI> {
    const list = await this.categoriesRepository.find();
    return new ResponseSuccess(ResponseMessages.SUCCESS.GET_OBJECT('카테고리'), list);
  }

  async createCategroies(createCategoryDto: CreateCategoryDto): Promise<ResponseSuccessAPI<Category> | ResponseFailAPI> {
    const { category_name } = createCategoryDto;

    const isNameExist = await this.categoriesRepository.find({ where: { category_name } });
    if (predicateHelpers.exists(isNameExist)) return new ResponseFail(ResponseMessages.FAIL.EXISTS_ALREADY_NAME);

    const newCategory = await this.categoriesRepository.create(createCategoryDto);
    const result = await this.categoriesRepository.save(newCategory);
    return new ResponseSuccess(ResponseMessages.SUCCESS.CREATE_OBJECT(category_name), result);
  }

  async updateCategroy(updateCategoryDto: UpdateCategoryDto): Promise<ResponseSuccessAPI<Category> | ResponseFailAPI> {
    const { id, category_name } = updateCategoryDto;
    const targetCategory = await this.categoriesRepository.findOne({ where: { id: id } });
    if (!targetCategory) {
      return new ResponseFail(ResponseMessages.FAIL.EXIST_NO_ID(id));
    }
    const conflictCategory = await this.categoriesRepository.findOne({ where: { category_name } });
    if (conflictCategory && conflictCategory.id !== id) {
      return new ResponseFail(ResponseMessages.FAIL.EXISTS_ALREADY_NAME);
    }
    targetCategory.category_name = category_name;
    const updatedCategory = await this.categoriesRepository.save(targetCategory);
    return new ResponseSuccess(ResponseMessages.SUCCESS.UPDATE_OBJECT(updatedCategory.category_name), updatedCategory);
  }

  async deleteCategory(deleteCategoryDto: DeleteCategoryDto) {
    const { id } = deleteCategoryDto;
    const targetCategory = await this.categoriesRepository.findOne({ where: { id } });
    if (!targetCategory) return new ResponseFail(ResponseMessages.FAIL.EXIST_NO_ID(id));

    const referencingProducts = await this.productsRepository.count({ where: { category: { id: id } } });
    if (referencingProducts > 0) return new ResponseFail(ResponseMessages.FAIL.REFERENCE_ERROR('category', 'product'));

    await this.categoriesRepository.delete(id);
    return new ResponseSuccess(ResponseMessages.SUCCESS.DELETE_ID(id));
  }
}
