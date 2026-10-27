import { Stack } from 'expo-router';
import '../../global.css';
import { TransferProvider } from '@/features/transfer/context/TransferContext';

// is the app's fram: it loads the styling and makes every screen slide on top of the previous one, with no header bar.
export default function RootLayout() {
  return (
    <TransferProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </TransferProvider>
  );
}