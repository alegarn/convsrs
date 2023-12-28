import { FlatList, View } from 'react-native';
import ListItem from './ListItem';

export default function ListComponent({ data, onPress }) {
  console.log("ListComponent data", data);
  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ListItem title={item.title} onPress={() => onPress(item)} />}
      />
    </View>
  );
};
