"use client";

import { deleteProduct } from "@/actions/product";
import { Trash2 } from "lucide-react";
import { useState } from "react";

interface DeleteProductButtonProps {
  productId: number;
  productName: string;
}

export default function DeleteProductButton({
  productId,
  productName,
}: DeleteProductButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    const hasConfirmed = confirm(
      `Êtes-vous sûr de vouloir définitivement supprimer "${productName}" ?`,
    );
    if (!hasConfirmed) return;

    setIsDeleting(true);

    // 🚀 La correction est ici : On prépare l'action avec .bind pour lui passer l'ID proprement
    const deleteActionWithId = deleteProduct.bind(null, productId);
    const result = await deleteActionWithId();

    setIsDeleting(false);

    if (result && "error" in result) {
      alert(result.error);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="p-3 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl transition-colors disabled:opacity-40"
      title="Supprimer le produit"
    >
      <Trash2 size={16} className={isDeleting ? "animate-pulse" : ""} />
    </button>
  );
}
