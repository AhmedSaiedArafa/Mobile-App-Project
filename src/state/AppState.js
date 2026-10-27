import React, { createContext, useContext, useMemo, useState } from 'react';
import { notifications as initialNotifications, recipients, trustedDevices, userIPAs } from '../data/mock';

/**
 * Client-side state shared across screens (notifications, IPAs, trusted devices).
 * When the backend is ready, load these from the API and call it inside the actions below.
 */
const AppStateContext = createContext(null);

export function AppStateProvider({ children }) {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [ipas, setIpas] = useState(userIPAs);
  const [devices, setDevices] = useState(trustedDevices);
  const [favoriteIds, setFavoriteIds] = useState(() => new Set(recipients.filter((r) => r.favorite).map((r) => r.id)));

  const value = useMemo(() => {
    const unreadCount = notifications.filter((n) => !n.read).length;
    const defaultIPA = ipas.find((i) => i.isDefault) ?? ipas[0];

    return {
      notifications,
      unreadCount,
      markRead: (id) => setNotifications((list) => list.map((n) => (n.id === id ? { ...n, read: true } : n))),
      markAllRead: () => setNotifications((list) => list.map((n) => ({ ...n, read: true }))),
      removeNotification: (id) => setNotifications((list) => list.filter((n) => n.id !== id)),

      ipas,
      defaultIPA,
      addIPA: (address, accountId) =>
        setIpas((list) => [
          ...list,
          { id: `ipa${Date.now()}`, address, accountId, isDefault: list.length === 0, createdAt: 'Today', createdAtAr: 'اليوم' },
        ]),
      setDefaultIPA: (id) => setIpas((list) => list.map((i) => ({ ...i, isDefault: i.id === id }))),
      removeIPA: (id) =>
        setIpas((list) => {
          const rest = list.filter((i) => i.id !== id);
          if (rest.length && !rest.some((i) => i.isDefault)) rest[0] = { ...rest[0], isDefault: true };
          return rest;
        }),

      devices,
      removeDevice: (id) => setDevices((list) => list.filter((d) => d.id !== id || d.current)),
      removeOtherDevices: () => setDevices((list) => list.filter((d) => d.current)),

      favoriteIds,
      isFavorite: (id) => favoriteIds.has(id),
      toggleFavorite: (id) =>
        setFavoriteIds((prev) => {
          const next = new Set(prev);
          if (next.has(id)) next.delete(id);
          else next.add(id);
          return next;
        }),
    };
  }, [notifications, ipas, devices, favoriteIds]);

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export const useAppState = () => useContext(AppStateContext);
