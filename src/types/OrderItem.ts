import {Product} from "@/types/product";

export interface OrderItem extends Product {
  quantity: number;
}