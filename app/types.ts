// Are to be imported wherever needed for use.
export interface Item {
  _id: string;
  name: string;
  user: string;
  completionDate: string;
  startDate: string;
  amount: string;
}

export type UserParams = {
  //Used in metaData for user/_id
  //For defining the property you need from the dynamic route
  params: {
    _id: string;
  };
};

export interface UserData {
  //api/users/itemData
  //api/users/userData
  _id: string;
  username: string;
  email: string;
  is_active: boolean;
  is_superuser: boolean;
  gender: string;
}

export type User = {
  //utils/AuthProvider
  _id: string;
  username: string;
  email: string;
  is_superuser: boolean;
  is_active: boolean;
  gender: string;
} | null;
