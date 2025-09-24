export type Category = {
  id: number;
  category_name: string;
  category_color: string;
  category_icon: string;
};

export type SubCategory = {
  id: number;
  subcategory_name: string;
  category_id: number;
  subcategory_icon: string;
};

export type UserAccount = {
  id: number;
  wallet_amount: number;
  user_id: string;
};

export type ExpenseTransaction = {
  id: number;
  sub_category_id: number;
  exchange_rate: number;
  usd: number;
  bs: number;
  user_id: string;
  wallet_id: number;
  created_at: string;
};
