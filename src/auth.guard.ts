import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common'
import {ENV, config} from 'db/setup'

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext,): boolean {
    const req = context.switchToHttp().getRequest()
    const {token} = req.headers

    return config[ENV].adminKeys.includes(token)
  }
}
