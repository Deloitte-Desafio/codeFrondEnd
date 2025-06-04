import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDate',
})
export class FormatDatePipe implements PipeTransform {
  transform(value: Date | string, format: string = 'medium'): string {
    const datePipe = new DatePipe('pt-BR');
    const formatted = datePipe.transform(value, format);
    return formatted || '';
  }
}
