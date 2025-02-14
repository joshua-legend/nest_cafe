import { BadRequestException, Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { NonEmptyBodyPipe } from 'src/pipe/non-emtpy-body.pipe';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { DeleteCategoryDto } from './dto/delete-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  getAllCategories() {
    return this.categoriesService.getAllCategories();
  }

  @Post('/create')
  createCategory(@Body(new NonEmptyBodyPipe(['category_name'])) createCategory: CreateCategoryDto) {
    return this.categoriesService.createCategroies(createCategory);
  }

  @Put('/update')
  updateCategory(@Body(new NonEmptyBodyPipe(['id', 'category_name'])) updateCategory: UpdateCategoryDto) {
    return this.categoriesService.updateCategroy(updateCategory);
  }

  @Delete('/delete')
  deleteCategroy(@Body(new NonEmptyBodyPipe(['id'])) deleteCategory: DeleteCategoryDto) {
    return this.categoriesService.deleteCategory(deleteCategory);
  }
}
