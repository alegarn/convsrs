import ListComponent from '../../components/UI/List';
import IconButton from '../../components/UI/IconButton';


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

  const iconStyle = {
    size: 24,
    backgroundColor: "green",
    borderRadius: 50,
    padding: 10,
    position: "absolute",
    bottom: 10,
    right: 10
  }

  return (
    <>
      <ListComponent data={decks} onPress={onPress} />
      <IconButton icon="add" color="black" size={24} onPress={createDeck} style={iconStyle} />
    </>
  );
};
