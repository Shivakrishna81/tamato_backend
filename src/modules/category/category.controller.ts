import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard';
import { RoleGuard } from 'src/core/guards/role.guard';
import { Roles } from 'src/core/decorators/role.decorator';
import { AddCategoryDto } from './dtos/addCategory.dto';
import { AbstractCategoryService } from './category.abstract';

@ApiTags('Categories')
@Controller('categories')
export class CategoryController {
    constructor(private readonly categoryService:AbstractCategoryService){} 

    @ApiBearerAuth() 
    @ApiOperation({summary:'Adding new category'})
    @ApiBody({description:"Category details to add",type:AddCategoryDto})
    @UseGuards(JwtAuthGuard,RoleGuard) 
    @Roles('admin') 
    @Post()
    async addCategory(@Body() category:any){
        return this.categoryService.addCategory(category)
    }

    @ApiBearerAuth() 
    @ApiOperation({summary:"Fetching all categories"}) 
    @UseGuards(JwtAuthGuard) 
    @Get()
    async getAllCategories(){
        return this.categoryService.getAllCategories()
    }

}
