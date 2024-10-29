import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from 'src/decorators/role.decorator';
import { messages } from 'src/shared/messages.shared';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector:Reflector){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
   const requiredRole=this.reflector.get<string>(ROLES_KEY,context.getHandler())
    if(!requiredRole){
      return true;
    }

    const request=context.switchToHttp().getRequest()
    const user=request.user 

    if(!user || !user.role){
      throw new HttpException(messages.CEUA,HttpStatus.UNAUTHORIZED)
    }
    if(user.role !== requiredRole){
      throw new HttpException(messages.CEF,HttpStatus.FORBIDDEN)
    }

    return true
  }
}
