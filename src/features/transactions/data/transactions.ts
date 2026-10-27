import { formatMoney } from '@/utils/formatMoney';

export type Transaction = {
  id: string;
  type: 'sent' | 'received' | 'bill';
  group: 'Today' | 'Earlier';
  title: string;
  subtitle: string;
  amount: number;
  reference: string;
  date: string;
  from: string;
  to: string;
  method: string;
  fee: number;
};

export const TYPE_ICON_LABELS = {
  sent: 'Send',
  received: 'Received',
  bill: 'Bill',
};

export const TRANSACTIONS: Transaction[] = [
  {
    id: '1',
    type: 'sent',
    group: 'Today',
    title: 'Transfer to Ahmed Mohamed',
    subtitle: '2:30 PM',
    amount: -1000,
    reference: 'TRX-20261026-4821',
    date: 'Oct 26, 2026 • 2:30 PM',
    from: 'Main Account ••4521',
    to: 'ahmed.m@ipa',
    method: 'Transfer by IPA',
    fee: 0,
  },
  {
    id: '2',
    type: 'bill',
    group: 'Earlier',
    title: 'Electricity Bill',
    subtitle: 'Oct 20, 2026 • Egypt Electricity',
    amount: -350,
    reference: 'TRX-20261020-3377',
    date: 'Oct 20, 2026 • 9:15 AM',
    from: 'Main Account ••4521',
    to: 'Egypt Electricity',
    method: 'Bill payment',
    fee: 0,
  },
  {
    id: '3',
    type: 'received',
    group: 'Earlier',
    title: 'Received from Sara Ali',
    subtitle: 'Oct 19, 2026 • IPA Transfer',
    amount: 2500,
    reference: 'TRX-20261019-5120',
    date: 'Oct 19, 2026 • 6:40 PM',
    from: 'sara.ali@ipa',
    to: 'Main Account ••4521',
    method: 'IPA Transfer',
    fee: 0,
  },
  {
    id: '4',
    type: 'sent',
    group: 'Earlier',
    title: 'Transfer to Bank Account',
    subtitle: 'Oct 18, 2026 • CIB',
    amount: -5000,
    reference: 'TRX-20261018-2209',
    date: 'Oct 18, 2026 • 1:05 PM',
    from: 'Main Account ••4521',
    to: 'CIB ••8802',
    method: 'Bank transfer',
    fee: 0,
  },
];

export function signedAmount(item: Transaction) {
  const sign = item.amount < 0 ? '−' : '+';
  return `${sign} ${formatMoney(Math.abs(item.amount))} EGP`;
}
