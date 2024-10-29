import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { MenusService } from './menus.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorators/role.decorator';


@ApiTags('Menus')
@Controller('items')
export class MenusController {
    constructor(private readonly menuService:MenusService){}
    
    @ApiBearerAuth()
    @ApiOperation({summary:'Adding an Item'})
    @UseGuards(JwtAuthGuard,RoleGuard)
    @Roles("admin")
    @ApiBody({description:"Item data for creating Item"})
    @Post()
    async addItem(@Body() body:any){
        return this.menuService.addItem(body)
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
}
