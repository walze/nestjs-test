import {Injectable, PipeTransform} from '@nestjs/common'
import {isValidDate, newRequestError} from 'helpers'

@Injectable()
export class ParseDate implements PipeTransform {
  transform(value: any) {
    const date = new Date(value)

    if (!isValidDate(date)) {
      throw newRequestError({
        message: `Invalid date ${value}`,
        status: 500,
      })
    }

    return value
  }
}
