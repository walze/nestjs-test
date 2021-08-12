import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { BlacklistService } from 'blacklist/blacklist.service';
import { Observable } from 'rxjs';

@Injectable()
export class BlacklistGuard implements CanActivate {
  constructor(private readonly bs: BlacklistService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    return this.bs.isBanned(Number(req.params.id)).then((a) => !a);
  }
}
