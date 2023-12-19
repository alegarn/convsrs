import ListComponent from '../../components/UI/List';

export default function DeckScreen({ navigation }) {

  const flashcards = [
    { id: 1, deckIds: [1], flashcardId: 1, title: "Flashcard 1"},
    { id: 2, deckIds: [1], flashcardId: 2, title: "Flashcard 2"},
    { id: 3, deckIds: [1], flashcardId: 3, title: "Flashcard 3"},
  ];

  const onPress = (params) => {
    navigation.navigate("FlashcardScreen", params);
  };

  return (
    <>
      <ListComponent data={flashcards} onPress={onPress} />
    </>
  );
};
