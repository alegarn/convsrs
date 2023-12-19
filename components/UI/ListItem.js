import { Link } from '@react-navigation/native';
import { View, Text, Button, StyleSheet } from 'react-native';
import BigButton from './BigButton';

export default function ListItem({ title, onPress }) {
  return (
    <View style={styles.listItem}>
      <Button title={title} onPress={onPress} color="black" style={styles.button}/>
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: '',
    borderColor: 'black',
    borderWidth: 1,
  },
  button: {
    borderWidth: 0,
    color: 'black',
  }
});
/* <Link href={`${pathname}/${params.id.toString()}`} asChild>
      <Text>{title}</Text>
    </Link> */
