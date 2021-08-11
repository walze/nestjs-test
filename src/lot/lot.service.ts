import { Injectable } from '@nestjs/common';
import { Lot } from 'db/models';
import { WhereOptions } from 'sequelize/types';

@Injectable()
export class LotService {
  getAll(where?: WhereOptions<Lot>): Promise<Lot[]> {
    Lot.findAll().then(console.log);
    console.log('AAAAAAAAAAAAaaa');
    return Lot.findAll({ where });
  }

  get(id: number): Promise<Lot> {
    return Lot.findOne({
      where: {
        id,
      },
    });
  }
}
