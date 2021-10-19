import {OperatorFunction, map} from 'rxjs'
import {identity, ifElse, pipe} from 'ramda'

import {DataTypes} from 'sequelize'
import {IResponse} from 'typings'

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

export type ResponseErrorOptions = {message: string, status: number}
export class ResponseError extends Error implements IResponse<null> {
  status: number

  data: null

  override message: string

  constructor(options: ResponseErrorOptions) {
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

export const newResponseError =
(r: ResponseErrorOptions) => new ResponseError(r)

export const noLotError = (lot: unknown) => newResponseError({
  status: 404,
  message: `No available with ${lot}`,
})

export const assertThrow = <A extends Error>(throwable: A) => <B>(x: B) => {
  if (!x) throw throwable

  return x as NonNullable<B>
}

export const assertThrowOp: <T>(
  x: ResponseErrorOptions
) => OperatorFunction<T, NonNullable<T>> =
  x => map(assertThrow(newResponseError(x)))

export const ifElseOp: <T, R = T>(
    pred: (t: T) => boolean,
    e: (t: T) => ResponseErrorOptions,
    m?: (t: T) => NonNullable<R>,
  ) => OperatorFunction<T, R> =
  (p, e, m) => map(ifElse(
      p,
      m ?? identity,
      e,
  ))

export const throwe: <E extends Error>(x: E) => never =
    x => {
      throw x
    }

export const assertThrowFnOp: <T>(
  f: (t: T) => boolean,
  e: (t: T) => ResponseErrorOptions
) =>
  OperatorFunction<T, NonNullable<T>> =
   (p, e) => map(ifElse(
       p,
       identity,
       pipe(
           e,
           newResponseError,
           throwe
       ),
   ))
