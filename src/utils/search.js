/** True when the English or Arabic version of item[field] contains the (lower-cased) query. */
export const matches = (item, field, q) =>
  [item[field], item[`${field}Ar`]].some((v) => v && v.toLowerCase().includes(q));
