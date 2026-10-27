export function formatMoney(value) {
  const [int, dec] = Math.abs(Number(value) || 0).toFixed(2).split('.');
  return `${int.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}.${dec}`;
}

// InstaPay-style transfer fee: 0.1% of the amount, min 0.50, max 20 EGP.
export function transferFee(amount) {
  if (!amount) return 0;
  return Math.min(20, Math.max(0.5, amount * 0.001));
}

export function billFee(amount) {
  if (!amount) return 0;
  return amount >= 1000 ? 5 : 2.5;
}

export function refNumber() {
  return `IPN${Date.now().toString().slice(-10)}`;
}

const MONTHS = {
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  ar: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
};

export function nowLabel(lang = 'en') {
  const d = new Date();
  const h = d.getHours() % 12 || 12;
  const m = String(d.getMinutes()).padStart(2, '0');
  const am = d.getHours() < 12;
  if (lang === 'ar') {
    return `${d.getDate()} ${MONTHS.ar[d.getMonth()]} ${d.getFullYear()} • ${h}:${m} ${am ? 'ص' : 'م'}`;
  }
  return `${MONTHS.en[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()} • ${h}:${m} ${am ? 'AM' : 'PM'}`;
}

export const isValidIPA = (v) => /^[a-z0-9._-]{3,}@instapay$/i.test(v.trim());
export const isValidEgMobile = (v) => /^01[0125]\d{8}$/.test(v.replace(/\s/g, ''));
export const initials = (name) =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0].toUpperCase())
    .join('');
