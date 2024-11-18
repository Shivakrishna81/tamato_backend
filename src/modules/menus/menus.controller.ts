import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { MenusService } from './menus.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard';
import { RoleGuard } from 'src/core/guards/role.guard';
import { Roles } from 'src/core/decorators/role.decorator';
import { CreateMenuItemDto } from './dtos/createmenuDto';
import { UpdateMenuItemDto } from './dtos/updatemenuItemDto';
import { AbstractMenuService } from './menus.abstract';


@ApiTags('Menus')
@Controller('items')
export class MenusController {
    constructor(private readonly menuService:AbstractMenuService){}
    
    @ApiBearerAuth()
    @ApiOperation({summary:'Adding an Item'})
    @ApiBody({description:"Item data for creating Item",type:CreateMenuItemDto})
    @UseGuards(JwtAuthGuard,RoleGuard)
    @Roles("admin")
    @Post()
    async addItem(@Body() body:any){
        return this.menuService.addItem(body)
    }

    @ApiBearerAuth()
    @ApiOperation({summary:'Fetching all Items'})
    @ApiParam({name:"category"})
    @UseGuards(JwtAuthGuard)
    @Get(':category')
    async getAllItemsByCategory(@Param('category') category:string){
        return this.menuService.getAllItemsByCategory(category)
    }

    @ApiBearerAuth()
    @ApiOperation({summary:'Fetching all Items'})
    @UseGuards(JwtAuthGuard)
    @Get()
    async getAllItems(){
        return this.menuService.getAllItems()
    }

    @ApiBearerAuth()
    @ApiOperation({summary:"Deleting Item By Id"})
    @ApiParam({name:"id"})
    @UseGuards(JwtAuthGuard,RoleGuard)
    @Roles('admin') 
    @Delete(':id')
    async deleteItemById(@Param('id') id:any){
        return this.menuService.deleteItemById(id)
    }
    
    @ApiBearerAuth()
    @ApiOperation({summary:"updating Item By Id"})
    @ApiParam({name:"itemId"})
    @ApiBody({description:"Item data for updating Item",type:UpdateMenuItemDto})
    @UseGuards(JwtAuthGuard,RoleGuard)
    @Roles('admin') 
    @Put(':itemId')
    async updateItemById(@Param('itemId') itemId:string, @Body() updateDetails:UpdateMenuItemDto){
        return this.menuService.updateItemById(itemId,updateDetails)
    }
}

