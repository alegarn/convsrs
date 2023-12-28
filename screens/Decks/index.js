import { useContext, useLayoutEffect, useEffect, useState } from 'react';
import { Text, TextInput, View } from 'react-native';

import ListComponent from '../../components/UI/List';
import IconButton from '../../components/UI/IconButton';
import CenteredModal from '../../components/UI/CenteredModal';
import { AuthContext } from '../../store/auth-context';
import { closeDb, createNewDeck, deleteDatabase, fetchDeckList } from '../../utils/db';

export default function DecksScreen({ navigation }) {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [deckList, setDeckList] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const context = useContext(AuthContext);

  useEffect(() => {
    fetchDecks();
  }, [deckList.length]); /* deckList length */

  const fetchDecks = async () => {
/*     const deckList = await openOrCreateDatabase();*/
    /* prendre decks du context */
    await fetchDeckList(setDeckList, context.username, context.userId);
  };


  const showModal = () => {
    setIsModalVisible(true);
  };

  const createDeck = async () => {
    createNewDeck({title: title, description: description, userId: context.userId, username: context.username});
    setIsModalVisible(false);
  };

  const deleteDeck = async (id) => {
    // long press / swipe for delete choice (modal)
  };

  const modalContent = () => {

    const modalStyles = {
      container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      },
      centerTitle: {
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10
      },
      centerView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      },
      inputView: {
        padding: 10,
        margin: 10
      },
      centerText: {
        textAlign: "center",
        marginBottom: 10
      },
      inputStyle: {
        borderColor: "black",
        padding: 10,
        borderBottomWidth: 1
      }
    };

    return (
      <View style={modalStyles.container}>
        <View style={modalStyles.centerView}>
          <Text style={modalStyles.centerTitle}>Create Deck</Text>
        </View>
        <View style={modalStyles.inputView}>
          <Text style={modalStyles.centerText}>Enter deck name</Text>
          <TextInput
            style={modalStyles.inputStyle}
            placeholder='Deck name'
            onChangeText={text => setTitle(text)} />
        </View>
        <View style={modalStyles.inputView}>
          <Text style={modalStyles.centerText}>Enter deck description</Text>
          <TextInput
            style={modalStyles.inputStyle}
            placeholder='Deck description'
            onChangeText={text => setDescription(text)} />
        </View>
      </View>
    )
  };

  const decks = [
    { id: 1, deckId: 1, title: "Deck 1"},
    { id: 2, deckId: 2, title: "Deck 2"},
    { id: 3, deckId: 3, title: "Deck 3"},
  ];



  const onPress = (item) => {
    console.log("DecksScreen onPress", item);
    navigation.navigate("DeckScreen", item);
  };

  const iconStyle = {
    size: 24,
    backgroundColor: "green",
    borderRadius: 50,
    padding: 10,
    position: "absolute",
    bottom: 10,
    right: 10
  };

  if (deckList.length !== 0) {
    return (
      <>
        <ListComponent data={deckList} onPress={onPress} />
        <IconButton icon="add" color="black" size={24} onPress={showModal} style={iconStyle} />
        <CenteredModal
          onPress={() => createDeck()}
          onCancel={() => setIsModalVisible(false)}
          isModalVisible={isModalVisible}
        >
          {modalContent()}
        </CenteredModal>
      </>
    );
  } else {
    return (
      <View>
        <Text>No deck</Text>
      </View>
    );
  }

};
