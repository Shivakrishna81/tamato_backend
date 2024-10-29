import { Module } from '@nestjs/common';
import { MenusService } from './menus.service';
import { MenusController } from './menus.controller';
import { DatabaseModule } from 'src/database/database.module';


@Module({
  imports:[DatabaseModule],
  providers: [MenusService],
  controllers: [MenusController],
  exports:[MenusService]
})
export class MenusModule {}
