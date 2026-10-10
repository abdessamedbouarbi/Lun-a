export type Language = 'fr' | 'ar';

export type Category = 'accessoires' | 'cosmetique' | 'vetements';

export interface Product {
  id: number;
  nameFr: string;
  nameAr: string;
  category: Category;
  price: number;
  image: string;
  descriptionFr: string;
  descriptionAr: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface OrderInfo {
  firstName: string;
  lastName: string;
  phone: string;
  wilaya: string;
}

export type Page = 'home' | 'products' | 'cart';
