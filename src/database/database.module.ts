import { Module } from '@nestjs/common';
import { DatabaseConnection } from './mssql/connection/connection';
import { DatabaseService } from './database.service';
import { UserDao } from './mssql/dao/user.dao';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './mssql/models/user.model';
import { JwtAuthService } from 'src/modules/users/jwt-auth.service';
import { UsersModule } from 'src/modules/users/users.module';
import { AppConfigService } from 'src/config/appconfig.service';
import { ConfigModule } from '@nestjs/config';
import { MenuDao } from './mssql/dao/menu.dao';
import { MenuItem } from './mssql/models/menu.model';
import { Review } from './mssql/models/review.model';

@Module({
    imports:[DatabaseConnection,SequelizeModule.forFeature([User,MenuItem,Review]),DatabaseModule],
    exports:[DatabaseService,UserDao,MenuDao,AppConfigService],
    providers: [DatabaseService,UserDao,MenuDao,AppConfigService]
})
export class DatabaseModule {}
