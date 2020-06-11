import { ExecutionContext, CanActivate, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { verify } from 'jsonwebtoken';
/* A simple bearer authentication */
@Injectable()
export class AuthGuardService implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const { authorization } = request.headers as any;

    if (authorization)
      return !!verify(authorization.split('Bearer')[1].trim(), process.env.SECRET_JWT);

    return false;
  }
}
