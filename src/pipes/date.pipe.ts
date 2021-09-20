import { PipeTransform, Injectable } from '@nestjs/common';
import { isValidDate, RequestError } from 'helpers';

@Injectable()
export class ParseDate implements PipeTransform {
  transform(value: any) {
    const date = new Date(value);

    if (!isValidDate(date))
      throw RequestError({
        message: `Invalid date ${date}`,
        status: 500,
      });

    return value;
  }
}
