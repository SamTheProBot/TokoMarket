export interface IproductsCard {
  name: string;
  price: number;
  category: string;
  image: string;
}

export interface IproductsData extends IproductsCard {
  id: number;
  description: string;
  features: string[];
}
