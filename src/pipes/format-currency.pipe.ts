import { PipeTransform, Injectable } from '@nestjs/common';

@Injectable()
export class FormatCurrencyPipe implements PipeTransform {
  transform(value: string | number): string {
    const number = typeof value === 'string' ? parseFloat(value) : value;

    return number.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  }
}