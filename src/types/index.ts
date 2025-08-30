export interface Product {
  id: number;
  name: string;
  weight: number;
}

export interface Customer {
  id: number;
  name: string;
  address: string;
  phone?: string;
}

export interface FormItem {
  id: number;
  name: string;
  weight: number;
  quantity: number;
}

export interface ShippingForm {
  id: number;
  customer: Customer;
  items: FormItem[];
  createdAt: string;
  totalWeight: number;
  totalQuantity: number;
}

export type ViewType = 'new_form' | 'forms_history' | 'settings';