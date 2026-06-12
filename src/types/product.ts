import { Category } from "./Category";

export interface Product {
  id: number;
  nameFr: string;
  nameAr: string;
  descriptionFr?: string;
  descriptionAr?: string;
  price: number;
  oldPrice?: number;
  imageMain: string;
  isBestSeller: boolean;
  categoryId: number;
  image:string;
  category?: Category;
  createdAt: Date;
}