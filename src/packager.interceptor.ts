import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { IResponseError } from 'helpers';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class PackagerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const { statusCode: status } = context.switchToHttp().getResponse();

    return next.handle().pipe(
      map((data) => ({ status, data })),
      catchError((e: IResponseError) => of(e)),
    );
  }
}
