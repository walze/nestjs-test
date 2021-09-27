import {OperatorFunction, map} from 'rxjs'

import {DataTypes} from 'sequelize'
import {IResponseError} from 'typings'
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

export const isValidDate = pipe(
    (d: Date | number) => Number(new Date(d)),
    Number.isNaN,
)

export const RequestError = ({
  message,
  status = 500,
}: {
  message: string;
  status: number;
}): IResponseError => ({
  ...new Error(message),
  data: null,
  message,
  status,
})

export const noLotError = (lot: unknown) => RequestError({
  status: 404,
  message: `No available with ${lot}`,
})

export const assertThrow = <A extends Error>(throwable: A) => <B>(x: B) => {
  if (!x) throw throwable

  return x as NonNullable<B>
}

export const assertThrowOp: <T>(
  x: Parameters<typeof RequestError>[0]
) => OperatorFunction<T, NonNullable<T>> =
  x => map(assertThrow(RequestError(x)))

export const ifThrowOp: <T>(f: (t: T) => boolean) => (
  x: Parameters<typeof RequestError>[0]
) => OperatorFunction<T, T> =
  predicate => error => map(x => {
    if (predicate(x)) {
      throw RequestError(error)
    }

    return x
  })
