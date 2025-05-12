// Are to be imported wherever needed for use.

export interface BusinessInterface {
  _id: string;
  name: string;
  subscribed: boolean;
}

export interface ProductInterface {
  _id: string;
  name: string;
  price: number;
  description?: string;
  sale_date?: Date;
  available: boolean;
  sold_by: string | UserInterface; // Allow string (ID) or UserData (populated)
  business: string | BusinessInterface; // Allow string (ID) or Business (populated)
  added_by: string | UserInterface; // Allow string (ID) or UserData (populated)
  createdAt: Date;
  updatedAt: Date;
}

export type UserInterface = {
  _id: string;
  username: string;
  email: string;
  is_superuser: boolean;
  is_active: boolean;
  is_admin: boolean;
  gender: string;
  business: string | BusinessInterface; // Allow string (ID) or Business object (populated)
  createdAt: Date;
  updatedAt: Date;
  last_login: Date;
} | null;
