import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { config, ENV } from 'db/setup';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const { token } = req.headers;

    return config[ENV].adminKeys.includes(token);
  }
}
