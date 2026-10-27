import { Redirect } from 'expo-router';

// className: is where styling goes, one short word per style.
// items-center center sideways (left to right)
// justify-center centers up and down (top to bottom)

export default function Index() {
  return <Redirect href="/transfer/amount" />;
}