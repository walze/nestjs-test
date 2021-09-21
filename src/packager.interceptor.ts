import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common'
import {Observable, of} from 'rxjs'
import {catchError, map} from 'rxjs/operators'

import {IResponseError} from 'typings'

@Injectable()
export class PackagerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const {statusCode: status} = context.switchToHttp().getResponse()

    return next.handle().pipe(
        map((data) => ({
          data,
          status,
        })),
        catchError((e: IResponseError) => of(e)),
    )
  }
}
