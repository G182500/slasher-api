import { Injectable, UseGuards } from '@nestjs/common';
import { AuthGuard } from './modules/auth/auth.guard';

@Injectable()
export class AppService {
  @UseGuards(AuthGuard)
  getHello(): string {
    return 'Hello World!';
  }
}
