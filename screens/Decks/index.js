import ListComponent from '../../components/UI/List';

export default function DecksScreen({ navigation }) {

  const createDeck = () => {
    navigation.navigate("CreateDeckScreen");
  };

  const decks = [
    { id: 1, deckId: 1, title: "Deck 1"},
    { id: 2, deckId: 2, title: "Deck 2"},
    { id: 3, deckId: 3, title: "Deck 3"},
  ];

  const onPress = (params) => {
    navigation.navigate("DeckScreen", params);
  };

  return (
    <>
      <ListComponent data={decks} onPress={onPress} />
    </>
  );
};
