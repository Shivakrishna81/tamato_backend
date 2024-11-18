import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from 'src/database/database.module';
import { JwtAuthService } from './jwt-auth.service';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { AbstractUserService } from './users.abstract';

@Module({
  imports: [ JwtModule.register({
    secret: "userDetails",
    signOptions: { expiresIn: '24h' }
  })],
  controllers: [UsersController],
  providers: [ JwtAuthService, JwtStrategy, {
    provide: AbstractUserService,
    useClass: UsersService
  }],
  exports: [JwtAuthService, {
    provide: AbstractUserService,
    useClass: UsersService
  }]
})
export class UsersModule { }
