export enum PriceCategory {
  FREE = 'FREE',
  LOW = 'LOW',
  MID_LOW = 'MID_LOW',
  MID_HIGH = 'MID_HIGH',
  HIGH = 'HIGH',
}

const PRICE_CATEGORY_REPRESENTATIONS = {
  [PriceCategory.FREE]: { stringRepresentation: 'Free', value: 0 },
  [PriceCategory.LOW]: { stringRepresentation: '$', value: 1 },
  [PriceCategory.MID_LOW]: { stringRepresentation: '$$', value: 2 },
  [PriceCategory.MID_HIGH]: { stringRepresentation: '$$$', value: 3 },
  [PriceCategory.HIGH]: { stringRepresentation: '$$$$', value: 4 },
};

export function toPriceCategoryString(priceCategory: PriceCategory): string {
  return PRICE_CATEGORY_REPRESENTATIONS[priceCategory].stringRepresentation;
}

export function toPriceCategoryMagnitude(priceCategory: PriceCategory): number {
  return PRICE_CATEGORY_REPRESENTATIONS[priceCategory].value;
}
