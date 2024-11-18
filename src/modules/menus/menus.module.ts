import { Module } from '@nestjs/common';
import { MenusService } from './menus.service';
import { MenusController } from './menus.controller';
import { DatabaseModule } from 'src/database/database.module';
import { AbstractMenuService } from './menus.abstract';


@Module({
  imports: [],
  controllers: [MenusController],
  providers: [{
    provide: AbstractMenuService,
    useClass: MenusService
  }],
  exports: [{
    provide: AbstractMenuService,
    useClass: MenusService
  }]
})
export class MenusModule { }
