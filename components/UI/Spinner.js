import { ActivityIndicator, StyleSheet, View } from 'react-native';
//import { GlobalStyle } from '../../constants/theme';

export default function Spinner() {
  return(
    <View style={[styles.container]}>
      <ActivityIndicator size="large" color={"black"} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
