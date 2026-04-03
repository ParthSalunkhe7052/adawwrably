export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  badge?: 'NEW' | 'SALE' | 'HOT';
  category: string;
}

export interface Collection {
  id: string;
  name: string;
  count: number;
  image: string;
}

export const announcements = [
  "FREE SHIPPING ON ORDERS OVER ₹999",
  "NEW ONE PIECE WANTED POSTER COLLECTION DROPPED",
  "GET 10% OFF ON YOUR FIRST ORDER — USE CODE: ANIME10",
  "LIMITED EDITION LUFFY GEAR 5 FIGURE IN STOCK",
  "KUROMI KEYCHAINS ARE BACK",
  "DEATH NOTE L KEYCHAIN — SELL OUT RISK",
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Blackbeard Wanted Poster',
    price: 549,
    originalPrice: 699,
    image: '/products/prod-1.png',
    badge: 'HOT',
    category: 'Posters',
  },
  {
    id: '2',
    name: 'Death Note L Keychain',
    price: 299,
    image: '/products/prod-2.png',
    badge: 'NEW',
    category: 'Keychains',
  },
  {
    id: '3',
    name: 'One Piece Compass Keychain',
    price: 349,
    image: '/products/prod-3.png',
    category: 'Keychains',
  },
  {
    id: '4',
    name: 'Portgas D. Ace Wanted Poster',
    price: 549,
    originalPrice: 699,
    image: '/products/prod-4.png',
    badge: 'SALE',
    category: 'Posters',
  },
  {
    id: '5',
    name: 'Kuromi Keychain Set',
    price: 399,
    image: '/products/prod-7.png',
    badge: 'NEW',
    category: 'Keychains',
  },
  {
    id: '6',
    name: 'Crayon Shin-chan Coin Bag',
    price: 449,
    image: '/products/prod-8.png',
    category: 'Accessories',
  },
  {
    id: '7',
    name: 'Trafalgar Law Wanted Poster',
    price: 549,
    originalPrice: 699,
    image: '/products/prod-6.png',
    badge: 'HOT',
    category: 'Posters',
  },
  {
    id: '8',
    name: 'Luffy Gear 5 Premium Figure',
    price: 2499,
    originalPrice: 3200,
    image: '/products/prod-13.png',
    badge: 'HOT',
    category: 'Figures',
  },
];

export const collections: Collection[] = [
  { id: '1', name: 'Keychains', count: 42, image: '/collections/collection-1.png' },
  { id: '2', name: 'Figures', count: 35, image: '/collections/collection-2.png' },
  { id: '3', name: 'Necklaces', count: 28, image: '/collections/collection-3.png' },
  { id: '4', name: 'Plushies', count: 24, image: '/collections/collection-4.png' },
  { id: '5', name: 'Blind Box', count: 18, image: '/collections/collection-5.png' },
  { id: '6', name: 'Die-Cast', count: 21, image: '/collections/collection-6.png' },
];
