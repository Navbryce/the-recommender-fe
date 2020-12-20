import { GeoCoordinates } from './GeoCoordinates.interface';
import { PriceCategory } from './PriceCategory.enum';

export interface BusinessSearchParameters {
  readonly location: GeoCoordinates;
  readonly searchTerm: string | null;
  readonly priceCategories: PriceCategory[];
  readonly attributes: string[];
  readonly searchRadius: number;
}
