import { Text } from "react-native";

export default function FlashcardScreen({ route, navigation }) {

  const { id } = route.params;

  return(
    <>
      <Text>Flashcard {id}</Text>
    </>
  );
};
