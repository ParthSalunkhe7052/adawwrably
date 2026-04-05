export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  badge?: 'NEW' | 'SALE' | 'HOT';
  category: string;
  anime: string; // Added anime property for filtering
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
  "GET 10% OFF ON YOUR FIRST ORDER — USE CODE: FIRST10",
  "LIMITED EDITION LUFFY GEAR 5 FIGURE IN STOCK",
  "KUROMI KEYCHAINS ARE BACK",
  "DEATH NOTE L KEYCHAIN — SELL OUT RISK",
];

export const products: Product[] = [
  { id: '1', name: 'Blackbeard Wanted Poster', price: 549, originalPrice: 699, image: '/products/prod-1.png', badge: 'HOT', category: 'Posters', anime: 'One Piece' },
  { id: '2', name: 'Death Note L Keychain', price: 299, image: '/products/prod-2.png', badge: 'NEW', category: 'Keychains', anime: 'Death Note' },
  { id: '3', name: 'One Piece Compass Keychain', price: 349, image: '/products/prod-3.png', category: 'Keychains', anime: 'One Piece' },
  { id: '4', name: 'Portgas D. Ace Wanted Poster', price: 549, originalPrice: 699, image: '/products/prod-4.png', badge: 'SALE', category: 'Posters', anime: 'One Piece' },
  { id: '5', name: 'Kuromi Keychain Set', price: 399, image: '/products/prod-7.png', badge: 'NEW', category: 'Keychains', anime: 'Sanrio' },
  { id: '6', name: 'Crayon Shin-chan Coin Bag', price: 449, image: '/products/prod-8.png', category: 'Accessories', anime: 'Shinchan' },
  { id: '7', name: 'Trafalgar Law Wanted Poster', price: 549, originalPrice: 699, image: '/products/prod-6.png', badge: 'HOT', category: 'Posters', anime: 'One Piece' },
  { id: '8', name: 'Luffy Gear 5 Premium Figure', price: 2499, originalPrice: 3200, image: '/products/prod-13.png', badge: 'HOT', category: 'Figures', anime: 'One Piece' },
  { id: '9', name: 'Naruto Headband', price: 299, image: '/original/image.png', badge: 'NEW', category: 'Accessories', anime: 'Naruto' },
  { id: '10', name: 'Gojo Satoru Keychain', price: 349, image: '/original/image copy.png', category: 'Keychains', anime: 'Jujutsu Kaisen' },
  { id: '11', name: 'Pikachu Plushie', price: 799, originalPrice: 999, image: '/original/image copy 2.png', badge: 'SALE', category: 'Plushies', anime: 'Pokemon' },
  { id: '12', name: 'Zoro Katana Keychain', price: 399, image: '/original/image copy 3.png', category: 'Keychains', anime: 'One Piece' },
  { id: '13', name: 'Denji Pochita Figure', price: 1899, image: '/original/image copy 4.png', badge: 'HOT', category: 'Figures', anime: 'Chainsaw-Man' },
  { id: '14', name: 'Hello Kitty Bag Charm', price: 449, image: '/original/image copy 5.png', category: 'Accessories', anime: 'Sanrio' },
  { id: '15', name: 'Goku Super Saiyan Figure', price: 2199, originalPrice: 2500, image: '/original/image copy 6.png', badge: 'SALE', category: 'Figures', anime: 'Dragon Ball' },
  { id: '16', name: 'Demon Slayer Tanjiro Earrings', price: 249, image: '/original/image copy 7.png', category: 'Accessories', anime: 'Demon Slayer' },
  { id: '17', name: 'Anya Forger Plushie', price: 899, image: '/original/image copy 8.png', badge: 'NEW', category: 'Plushies', anime: 'OG Cartoons' },
  { id: '18', name: 'Totoro Night Light', price: 1299, image: '/original/image copy 9.png', category: 'Miscellaneous Merch', anime: 'Studio Ghibli' },
  { id: '19', name: 'Genshin Impact Vision Keychain', price: 349, image: '/original/image copy 10.png', category: 'Keychains', anime: 'Genshi Impact' },
  { id: '20', name: 'Minecraft Creeper Plush', price: 699, originalPrice: 899, image: '/original/image copy 11.png', badge: 'SALE', category: 'Plushies', anime: 'Minecraft' },
  { id: '21', name: 'Harry Potter Wand Replica', price: 1599, image: '/original/image copy 12.png', category: 'Accessories', anime: 'Harry Potter' },
  { id: '22', name: 'Nezuko Bamboo Muzzle', price: 199, image: '/dashboard/image.png', category: 'Accessories', anime: 'Demon Slayer' },
  { id: '23', name: 'Itachi Uchiha Figure', price: 2099, image: '/dashboard/image copy.png', badge: 'HOT', category: 'Figures', anime: 'Naruto' },
  { id: '24', name: 'Satoru Gojo Sleep Mask', price: 299, image: '/dashboard/image copy 2.png', category: 'Clothing', anime: 'Jujutsu Kaisen' },
  { id: '25', name: 'Pochita Chainsaw Plush', price: 1099, image: '/dashboard/image copy 3.png', badge: 'NEW', category: 'Plushies', anime: 'Chainsaw-Man' },
  { id: '26', name: 'Mini GT Skyline Die-Cast', price: 1499, originalPrice: 1799, image: '/dashboard/image copy 4.png', badge: 'SALE', category: 'Die-Cast Models', anime: 'Miscellaneous Merch' },
  { id: '27', name: 'Kaido House Datsun', price: 1899, image: '/dashboard/image copy 5.png', category: 'Die-Cast Models', anime: 'Miscellaneous Merch' },
  { id: '28', name: 'Tom & Jerry Best Friends Tee', price: 799, image: '/products/prod-1.png', category: 'Clothing', anime: 'Tom & Jerry' },
  { id: '29', name: 'Hinata Shoyo Volley Keychain', price: 249, image: '/products/prod-2.png', category: 'Keychains', anime: 'Haikyuu' },
  { id: '30', name: 'Sakamoto Days Action Figure', price: 2399, image: '/products/prod-3.png', badge: 'NEW', category: 'Figures', anime: 'Sakamoto Days' },
];

export const collections: Collection[] = [
  { id: '1', name: 'Keychains', count: 42, image: '/collections/collection-1.png' },
  { id: '2', name: 'Figures', count: 35, image: '/collections/collection-2.png' },
  { id: '3', name: 'Necklaces', count: 28, image: '/collections/collection-3.png' },
  { id: '4', name: 'Plushies', count: 24, image: '/collections/collection-4.png' },
  { id: '5', name: 'Blind Box', count: 18, image: '/collections/collection-5.png' },
  { id: '6', name: 'Die-Cast', count: 21, image: '/collections/collection-6.png' },
];

export const animeList = [
  'Berzerk', 'Chainsaw-Man', 'Death Note', 'Demon Slayer', 'Dragon Ball', 
  'Genshi Impact', 'Haikyuu', 'Harry Potter', 'Jujutsu Kaisen', 'Minecraft', 
  'Naruto', 'OG Cartoons', 'One Piece', 'Pokemon', 'Sakamoto Days', 
  'Sanrio', 'Shinchan', 'Studio Ghibli', 'Tom & Jerry'
];
