import { PriceCategory } from '../models/PriceCategory.enum';
import { Business } from '../models/Business.interface';

export const TEST_BUSINESS: Business = {
  id: '0000',
  name: 'Test Business',
  url: 'https://www.google.com/',
  imageUrls: [
    'https://cdn.wallpapersafari.com/19/1/k7fGZb.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/d/d4/N.Tesla.JPG',
  ],

  price: PriceCategory.HIGH,
  pickup: false,
  delivery: true,
  categories: ['Category'],

  coordinates: {
    lat: 111.1,
    long: 111.2,
  },
  address: {
    country: 'US',
    region: 'CA',
    city: 'City',
    addressLine: '0000 Street',
    zipCode: '00000',
    displayString: '0000 Street, CA, US, 00000',
  },
};
