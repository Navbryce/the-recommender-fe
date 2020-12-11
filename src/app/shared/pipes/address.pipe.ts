import { Pipe, PipeTransform } from '@angular/core';
import { Address } from '../../data/models/Address.interface';

@Pipe({
  name: 'address',
})
export class AddressPipe implements PipeTransform {
  transform({ country, region, city, addressLine, zipCode }: Address) {
    return `${addressLine}, ${city}, ${region} ${zipCode}`;
  }
}
