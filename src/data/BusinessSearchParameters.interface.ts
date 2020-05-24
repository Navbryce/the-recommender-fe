import {GeoCoordinates} from './GeoCoordinates.interface';
import {PriceCategory} from './PriceCategory.enum';

export interface BusinessSearchParameters {
    readonly geoCoordinates: GeoCoordinates;
    readonly searchTerm: string;
    readonly priceCategories: PriceCategory[];
    readonly attributes: string[];
    readonly searchRadius: number;
}
