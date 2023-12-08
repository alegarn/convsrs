import { Stack } from 'expo-router';
import { Text } from 'react-native';

export default function Page() {
  return (
    <>
      <Stack.Screen options={{ title:"Parameters"}} />
      <Text>Parameters</Text>
    </>
  );
};
