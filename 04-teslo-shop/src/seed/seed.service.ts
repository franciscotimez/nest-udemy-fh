import { Injectable } from '@nestjs/common';

@Injectable()
export class SeedService {
  async runSeed() {
    return 'ruun seed';
  }
}
