import { FlatList, View } from 'react-native';
import ListItem from './ListItem';

export default function ListComponent({ data, onPress }) {
  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ListItem title={item.title} onPress={(item) => onPress(item)} />}
      />
    </View>
  );
};
