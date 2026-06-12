import { Product } from "./product";

// src/types/category.ts
export interface Category {
  id: number;
  nameFr: string;
  nameAr: string;
  slug: string;
  products?: Product[];    // optional, only when needed
}