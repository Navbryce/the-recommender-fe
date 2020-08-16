import { GeoCoordinates } from './GeoCoordinates.interface';
import { Address } from './Address.interface';
import { PriceCategory } from './PriceCategory.enum';

export interface Business {
  id: string;
  name: string;
  url: string;
  imageUrls: string[];
  price: PriceCategory;

  delivery: boolean;
  pickup: boolean;
  categories: string[];

  coordinates: GeoCoordinates;
  address: Address;
}
