import { View, StyleSheet} from 'react-native';
//import { useFocusEffect } from '@react-navigation/native';

import BigButton from '../../../components/UI/BigButton';
import { Stack } from 'expo-router';
//import { handleOrientation } from '../utils/orientation';

// with animations
// 1: modal little tuto ? 2 button to tuto: link  ?
export default function Page() {

  /* useFocusEffect(() => {
    handleOrientation("portrait");
  }); */

  return (
    <View style={styles.homeContainer}>
      <Stack.Screen options={{ title:"Home"}} />
      <BigButton text="Flashcards" onPress={() => {}} passRef={"/flashcards"} />
      <BigButton text="Convsrs" onPress={() => {}} passRef={"/convsrs"} />
      <BigButton text="Parameters" onPress={() => {}} passRef={"/parameters"} />
    </View>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
