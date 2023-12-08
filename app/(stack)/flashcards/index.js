import { Stack } from 'expo-router';
import { Text } from 'react-native';

export default function Page() {
  return (
    <>
      <Stack.Screen options={{ title:"Flashcards"}} />
      <Text>Flashcards</Text>
    </>
  );
};
