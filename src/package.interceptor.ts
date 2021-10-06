/* eslint-disable no-ternary */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common'
import {IMaybeResponse, INonNullResponse} from 'typings'
import {Observable, from, lastValueFrom} from 'rxjs'

import {ResponseError} from 'helpers'
import {map} from 'rxjs/operators'

export const pack =
(status: number) => <T>(data: T): IMaybeResponse<T> => {
  const isError = data instanceof ResponseError

  if (isError) {
    return {...data,
      status: data.status || 500}
  }

  const r = {
    data,
    status,
    message: 'Successful',
  }

  return r as INonNullResponse<T>
}

export const intercept: <T>(status: number) => (o: Observable<T>) =>
  Observable<IMaybeResponse<T>> =
  status => map(pack(status))

export const interceptPromise = <T>(p: Promise<T>) => from(p).
    pipe(intercept(200))

export const packagePromise: <T>(p: Promise<T>) => Promise<IMaybeResponse<T>> =
  p => lastValueFrom(interceptPromise(p))
@Injectable()
export class PackageInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const {statusCode: status} = context.switchToHttp().getResponse()

    return next.handle().
        pipe(intercept(status))
  }
}
