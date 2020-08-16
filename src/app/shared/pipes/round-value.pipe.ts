import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roundValue',
})
export class RoundValuePipe implements PipeTransform {
  transform(value: number, precision: number = 1) {
    return +value.toFixed(precision);
  }
}
