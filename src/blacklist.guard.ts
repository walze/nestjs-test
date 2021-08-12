import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { BlacklistService } from 'blacklist/blacklist.service';
import { Observable } from 'rxjs';

@Injectable()
export class BlacklistGuard implements CanActivate {
  constructor(private readonly bs: BlacklistService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const {
      params: { id },
    } = context.switchToHttp().getRequest();
    if (!id) return true;

    console.log(id);

    return this.bs.isBanned(+id).then((a) => !a);
  }
}
