import { View, StyleSheet} from 'react-native';
//import { useFocusEffect } from '@react-navigation/native';

import BigButton from '../../components/UI/BigButton';
//import { handleOrientation } from '../utils/orientation';

// with animations
// 1: modal little tuto ? 2 button to tuto: link  ?
export default function HomeScreen({ navigation }) {

  /* useFocusEffect(() => {
    handleOrientation("portrait");
  }); */

  function navigationHandler(screenName) {
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.homeContainer}>
      <BigButton text="Flashcards" onPress={() => navigationHandler("DecksScreen")} />
      <BigButton text="Convsrs" onPress={() => navigationHandler("ConvsrsScreen")} />
      <BigButton text="Parameters" onPress={() => navigationHandler("ParametersScreen")} />
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
