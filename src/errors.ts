export const isAssignedError = (licensePlate: string) => ({status: 400,
  message: `${licensePlate} is already assigned`})
export const isBannedError = (licensePlate: string) => ({
  message: `Car ${licensePlate} is Banned`,
  status: 403,
})
