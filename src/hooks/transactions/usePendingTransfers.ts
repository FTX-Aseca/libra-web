import { useState, useEffect } from "react";

export type PendingTransfer = {
  id: string;
  type: "DEBIN" | "TOPUP";
  amount: number;
  timestamp: string;
  status: "PENDING";
};

const PENDING_TRANSFERS_KEY = "pendingTransfers";

export const usePendingTransfers = () => {
  const [pendingTransfers, setPendingTransfers] = useState<PendingTransfer[]>(
    [],
  );

  useEffect(() => {
    const storedTransfers = localStorage.getItem(PENDING_TRANSFERS_KEY);
    if (storedTransfers) {
      setPendingTransfers(JSON.parse(storedTransfers));
    }
  }, []);

  const addPendingTransfer = (transfer: Omit<PendingTransfer, "status">) => {
    const newTransfer: PendingTransfer = { ...transfer, status: "PENDING" };
    const updatedTransfers = [...pendingTransfers, newTransfer];
    setPendingTransfers(updatedTransfers);
    localStorage.setItem(
      PENDING_TRANSFERS_KEY,
      JSON.stringify(updatedTransfers),
    );
  };

  const removePendingTransfer = (id: string) => {
    const updatedTransfers = pendingTransfers.filter((t) => t.id !== id);
    setPendingTransfers(updatedTransfers);
    localStorage.setItem(
      PENDING_TRANSFERS_KEY,
      JSON.stringify(updatedTransfers),
    );
  };

  return { pendingTransfers, addPendingTransfer, removePendingTransfer };
};
