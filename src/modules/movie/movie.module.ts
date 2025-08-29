import { Module } from '@nestjs/common';
import { MovieController } from './movie.controller';
import { FormatCurrencyPipe } from '../../pipes/format-currency.pipe';

@Module({
  imports: [],
  controllers: [MovieController],
  providers: [FormatCurrencyPipe],
})
export class MovieModule {}