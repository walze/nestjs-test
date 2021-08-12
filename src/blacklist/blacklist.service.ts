import { Injectable } from '@nestjs/common';
import { Blacklist } from 'db/models/Blacklist';

@Injectable()
export class BlacklistService {
  ban(carId: number) {
    return Blacklist.findOrCreate({ where: { carId } });
  }

  unban(carId: number) {
    return Blacklist.destroy({ where: { carId } });
  }
}
