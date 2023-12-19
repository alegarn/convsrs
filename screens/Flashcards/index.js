import { Text } from "react-native";
import ListComponent from "../../components/UI/List";

export default function FlashcardsScreen() {
  return (
    <>
      <Text>Flashcards</Text>
      <ListComponent data={flashcards} onPress={onPress} />
    </>
  );
}
