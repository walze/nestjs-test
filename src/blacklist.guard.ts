import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { BlacklistService } from 'blacklist/blacklist.service';
import { Observable } from 'rxjs';

@Injectable()
export class BlacklistGuard implements CanActivate {
  constructor(
    @Inject('BlacklistService')
    private readonly bs: BlacklistService,
  ) {
    console.log(this.bs);
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    console.log(req);

    return true;
  }
}
