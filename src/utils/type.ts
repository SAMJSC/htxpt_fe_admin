export interface IFormLogin {
  user_name: string;
  password: string;
}
export interface IFormParamGarden {
  first_name: string;
}
export interface IFormCreateGarden {
  first_name: string;
  last_name: string;
  phone: string;
  password: string;
  confirm_password: string;
  date_of_birth: string;
}

export interface DataFruit {
  _id?:string,
  fruit_categories: string;
  fruit_name: string;
  quantity: string;
  created_at: string;
  action: any
}
export interface HeadCellFruit {
  disablePadding: boolean;
  key: keyof DataFruit;
  label: string;
  numeric: boolean;
}

export interface DataBonsai {
  _id: string;
  tree_name: string;
  quantity: string;
  created_at: string;
  action: any
}
export interface HeadCellBonsai {
  disablePadding: boolean;
  key: keyof DataBonsai;
  label: string;
  numeric: boolean;
}