import { GeoCoordinates } from './GeoCoordinates.interface';
import { Address } from './Address.interface';
import { PriceCategory } from './PriceCategory.enum';

export interface Business {
  id: string;
  name: string;
  url: string;
  imageUrls: string[];
  price: PriceCategory;
  rating: number;

  delivery: boolean;
  pickup: boolean;
  categories: Category[];

  coordinates: GeoCoordinates;
  address: Address;
}

type Category = {
  id: string;
  label: string;
};
