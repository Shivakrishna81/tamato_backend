import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from 'src/database/database.module';
import { JwtAuthService } from './jwt-auth.service';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[DatabaseModule,JwtModule.register({
    secret:"userDetails",
    signOptions:{expiresIn:'24h'}
  })],
  providers: [UsersService, JwtAuthService,JwtStrategy],
  controllers: [UsersController],
  exports:[UsersService,JwtAuthService]
})
export class UsersModule {}
