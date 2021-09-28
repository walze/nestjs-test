import {OperatorFunction, map} from 'rxjs'

import {DataTypes} from 'sequelize'
import {IResponse} from 'typings'
import {pipe} from 'ramda'

export const defaultAttributes = {
  createdAt: {
    defaultValue: new Date(),
    type: DataTypes.DATE,
  },
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER.UNSIGNED,
  },
  updatedAt: {
    defaultValue: new Date(),
    type: DataTypes.DATE,
  },
}


export class ResponseError extends Error implements IResponse<null> {
  status: number

  data: null

  override message: string

  constructor(options: {message: string, status: number}) {
    const {message, status} = options

    super(message)

    this.status = status
    this.data = null
    this.message = message
  }
}


export const isValidDate = pipe(
    (d: Date | number) => Number(new Date(d)),
    Number.isNaN,
)

export const newRequestError =
(r: ConstructorParameters<typeof ResponseError>[0]) => new ResponseError(r)

export const noLotError = (lot: unknown) => newRequestError({
  status: 404,
  message: `No available with ${lot}`,
})

export const assertThrow = <A extends Error>(throwable: A) => <B>(x: B) => {
  if (!x) throw throwable

  return x as NonNullable<B>
}

export const assertThrowOp: <T>(
  x: Parameters<typeof newRequestError>[0]
) => OperatorFunction<T, NonNullable<T>> =
  x => map(assertThrow(newRequestError(x)))

export const ifThrowOp: <T>(f: (t: T) => boolean) => (
  x: Parameters<typeof newRequestError>[0]
) => OperatorFunction<T, T> =
  predicate => error => map(x => {
    if (predicate(x)) {
      throw newRequestError(error)
    }

    return x
  })

