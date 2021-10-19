import {Injectable, PipeTransform} from '@nestjs/common'
import {isValidDate, newResponseError} from 'helpers'

@Injectable()
export class ParseDate implements PipeTransform {
  transform(value: any) {
    const date = new Date(value)

    if (!isValidDate(date)) {
      throw newResponseError({
        message: `Invalid date ${value}`,
        status: 500,
      })
    }

    return value
  }
}
