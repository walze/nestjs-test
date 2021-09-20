import { PipeTransform, Injectable } from '@nestjs/common';
import { isValidDate } from 'helpers';
import { ValidationError } from 'sequelize';

@Injectable()
export class ParseDate implements PipeTransform {
  transform(value: any) {
    const date = new Date(value);

    if (!isValidDate(date)) throw new ValidationError(`Invalid date ${date}`);

    return value;
  }
}
