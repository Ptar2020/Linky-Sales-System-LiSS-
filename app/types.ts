// Are to be imported wherever needed for use.

export interface AboutInterface {
  _id: string;
  title: string;
  description: boolean;
  last_edited: Date;
}

export interface BusinessInterface {
  _id: string;
  name: string;
  subscribed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface SaleInterface {
  _id: string;
  sale_date: string;
  product: ProductInterface;
  seller: UserInterface;
  createdAt: string;
  updatedAt: string;
}

export interface ProductInterface {
  _id: string;
  name: string;
  price: number;
  description?: string;
  sale_date?: Date;
  available: boolean;
  sold_by: string | UserInterface; // Allow string (ID) or UserData (populated)
  business: BusinessInterface | string; // Allow string (ID) or Business (populated)
  added_by: string | UserInterface; // Allow string (ID) or UserData (populated)
  createdAt: Date;
  updatedAt: Date;
}

export type User = {
  _id: string;
  username: string;
  password: string;
  email: string;
  is_superuser: boolean;
  is_active: boolean;
  is_admin: boolean;
  gender: string;
  business: BusinessInterface;
  createdAt: Date;
  updatedAt: Date;
  last_login: Date;
};

export type UserInterface = User | null;

export interface EditUserInterface {
  params: { _id: string };
}
