import { createContext, useState } from 'react';

export const BANKS = ['CIB', 'National Bank of Egypt', 'Banque Misr', 'QNB'];
export const ACCOUNT_TYPES = ['Savings', 'Current'];

export const formatMoney = (n) =>
  Number(n).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const maskNumber = (num) => `•••• ${String(num).slice(-4)}`;

const startingAccounts = [
  {
    id: '1',
    bank: 'CIB',
    holder: 'Ahmed Saied',
    number: '1000234567891',
    type: 'Savings',
    balance: 15430,
    currency: 'EGP',
    status: 'Active',
    linkedOn: 'Oct 12, 2026',
  },
  {
    id: '2',
    bank: 'National Bank of Egypt',
    holder: 'Ahmed Saied',
    number: '2000987654321',
    type: 'Current',
    balance: 10000,
    currency: 'EGP',
    status: 'Active',
    linkedOn: 'Oct 20, 2026',
  },
];

export const AccountsContext = createContext();

export function AccountsProvider({ children }) {
  const [accounts, setAccounts] = useState(startingAccounts);

  const addAccount = (account) => {
    const [month, day, year] = new Date().toDateString().slice(4).split(' ');
    const today = `${month} ${Number(day)}, ${year}`;
    const newAccount = { ...account, id: String(Date.now()), currency: 'EGP', status: 'Active', linkedOn: today };
    setAccounts((current) => [newAccount, ...current]);
  };

  const accountExists = (number) => accounts.some((a) => a.number === number);

  return (
    <AccountsContext.Provider value={{ accounts, addAccount, accountExists }}>
      {children}
    </AccountsContext.Provider>
  );
}
