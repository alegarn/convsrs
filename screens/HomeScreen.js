import { View, StyleSheet} from 'react-native';
//import { useFocusEffect } from '@react-navigation/native';

import BigButton from '../components/UI/BigButton';
//import { handleOrientation } from '../utils/orientation';


export default function HomeScreen({ navigation }) {


  /* useFocusEffect(() => {
    handleOrientation("portrait");
  }); */


  const toFlashcardsPathScreen = () => {
    navigation.navigate('FlashcardsPathScreen');
  };

  const toConvsrsPathScreen = () => {
    navigation.replace('ConvsrsPathScreen');
  };

  const toParametersPathScreen = () => {
    navigation.navigate('ParametersPathScreen');
  };

  return (
    <View style={styles.homeContainer}>
      <BigButton
        text="Flashcards"
        onPress={toFlashcardsPathScreen}
         />
      <BigButton
        text="Convsrs"
        onPress={toConvsrsPathScreen}
         />
      <BigButton
        text="Parameters"
        onPress={toParametersPathScreen}
         />
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
