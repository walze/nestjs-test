import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { config, ENV } from 'config';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const { 'admin-key': key } = req.headers;

    return config[ENV].adminKeys.includes(key);
  }
}
