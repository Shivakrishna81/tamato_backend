import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { DatabaseModule } from 'src/database/database.module';
import { AbstractCategoryService } from './category.abstract';

@Module({
  imports: [],
  controllers: [CategoryController],
  providers: [{
    provide: AbstractCategoryService,
    useClass: CategoryService
  }],
  exports: [{
    provide: AbstractCategoryService,
    useClass: CategoryService
  }]
})
export class CategoryModule { }
