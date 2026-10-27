import { createContext, useContext, useState, type ReactNode } from 'react';

type TransferData = { amount: string; note: string };

type TransferContextValue = TransferData & {
  setTransfer: (data: TransferData) => void;
};

const TransferContext = createContext<TransferContextValue | null>(null);

export function TransferProvider({ children }: { children: ReactNode }) {
  const [transfer, setTransfer] = useState<TransferData>({ amount: '', note: '' });

  return (
    <TransferContext.Provider value={{ ...transfer, setTransfer }}>
      {children}
    </TransferContext.Provider>
  );
}

export function useTransfer() {
  const value = useContext(TransferContext);
  if (!value) {
    throw new Error('useTransfer must be used inside TransferProvider');
  }
  return value;
}