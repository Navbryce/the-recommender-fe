export enum PriceCategory {
  FREE = 'FREE',
  LOW = 'LOW',
  MID_LOW = 'MID_LOW',
  MID_HIGH = 'MID_HIGH',
  HIGH = 'HIGH'
}
const PRICE_CATEGORY_USER_STRING_REPRESENTATION = {
  [PriceCategory.FREE]: 'Free',
  [PriceCategory.LOW]: '$',
  [PriceCategory.MID_LOW]: '$$',
  [PriceCategory.MID_HIGH]: '$$$',
  [PriceCategory.HIGH]: '$$$$'
};

export function toPriceCategoryString(priceCategory: PriceCategory): string {
  return PRICE_CATEGORY_USER_STRING_REPRESENTATION[priceCategory];
}

