interface TimeStamp {
  createdAt: Date;
  updatedAt: Date;
}

interface Car extends TimeStamp {
  licensePlate: string;
}

type Lot = TimeStamp;
