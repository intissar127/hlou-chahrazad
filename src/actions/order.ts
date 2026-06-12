"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { OrderItem } from "@/types/OrderItem";

interface CheckoutData {
  customerName: string;
  customerPhone: string;
  shippingAddress: string;
  city: string;
  items: OrderItem[];
  totalAmount: number;
}

export async function createOrder(data: CheckoutData) {
  try {
    const user = await getCurrentUser(); // null si invité

    const order = await prisma.order.create({
      data: {
        userId: user?.id ?? null,
        customerName: data.customerName,
        customerPhone: data.customerPhone,
        shippingAddress: data.shippingAddress,
        city: data.city,
        totalAmount: data.totalAmount,
        paymentMethod: "COD",
        status: "PENDING",
        items: {
          create: data.items.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
            unitPrice: item.price,
          })),
        },
      },
    });

    return { success: true, orderId: order.id };
  } catch (error) {
    console.error("Erreur createOrder:", error);
    return { error: "Erreur lors de la création de la commande." };
  }
}