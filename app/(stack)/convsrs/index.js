import { Text } from 'react-native';
import { Stack } from 'expo-router';

export default function Page() {
  return (
    <>
      <Stack.Screen options={{ title:"Convsrs"}} />
      <Text>Convsrs</Text>
    </>
  );
};
