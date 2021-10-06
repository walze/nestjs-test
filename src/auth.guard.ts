import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common'

const adminKeys = ['ABC123']

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext,): boolean {
    const req = context.switchToHttp().getRequest()
    const {token} = req.headers

    return adminKeys.includes(token)
  }
}
