import ListComponent from '../../components/UI/List';
import { useLayoutEffect, useState } from 'react';
fet
export default function DeckScreen({ navigation, route }) {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [flashcardList, setFlashcardList] = useState([]);

  const flashcards = [
    { id: 1, flashcardId: 1, title: "Flashcard 1"},
    { id: 2, flashcardId: 2, title: "Flashcard 2"},
    { id: 3, flashcardId: 3, title: "Flashcard 3"},
  ];

  const { user_id, creation_date, id } = route.params;
  console.log("data", user_id, creation_date, id);

  const getFlashcards = async () => {
    const deck_id = id;
    await getFlashcards(setFlashcardList, deck_id, user_id, username);
  };

  useEffect(() => {
    getFlashcards();
  }, [flashcardList.length]);

  const onPress = (params) => {
    navigation.navigate("FlashcardScreen", params);
  };

  return (
    <>
      <ListComponent data={flashcards} onPress={onPress} />
    </>
  );
};
