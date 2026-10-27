import React, { createContext, useContext, useMemo, useState } from 'react';
import en from './en';
import ar from './ar';
import { formatMoney } from '../utils/format';

const dictionaries = { en, ar };
const I18nContext = createContext(null);

const lookup = (dict, key) => key.split('.').reduce((node, k) => (node == null ? undefined : node[k]), dict);

/**
 * Language + direction for the whole app.
 *  t('profile.title')              -> translated text ({name} placeholders filled from params)
 *  loc(item, 'name')               -> item.nameAr in Arabic, item.name otherwise (for mock / API data)
 *  money(1250)                     -> "1,250.00 EGP" / "1,250.00 ج.م"
 *  icons.forward / icons.back      -> chevrons that point the right way in RTL
 */
export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en');

  const value = useMemo(() => {
    const isRTL = lang === 'ar';
    const t = (key, params) => {
      let text = lookup(dictionaries[lang], key) ?? lookup(en, key) ?? key;
      if (params && typeof text === 'string') {
        text = text.replace(/\{(\w+)\}/g, (_, k) => (params[k] != null ? String(params[k]) : ''));
      }
      return text;
    };
    return {
      lang,
      setLang,
      isRTL,
      direction: isRTL ? 'rtl' : 'ltr',
      t,
      loc: (item, field) => (isRTL && item?.[`${field}Ar`]) || item?.[field],
      money: (amount) => `${formatMoney(amount)} ${t('common.egp')}`,
      icons: {
        forward: isRTL ? 'chevron-back' : 'chevron-forward',
        back: isRTL ? 'chevron-forward' : 'chevron-back',
      },
    };
  }, [lang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export const useI18n = () => useContext(I18nContext);
