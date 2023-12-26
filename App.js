import { StatusBar } from "expo-status-bar";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import IconButton from './components/UI/IconButton';

import HomeScreen from "./screens/Home";
import ConvsrsScreen from "./screens/Convsrs";
import ParametersScreen from "./screens/Parameters";
import DeckScreen from "./screens/Decks/deck";
import DecksScreen from "./screens/Decks";
import FlashcardsScreen from "./screens/Flashcards";
import FlashcardScreen from "./screens/Flashcards/flashcard";

import { openOrCreateDatabase } from "./utils/db";
import { useLayoutEffect, useState, useContext } from "react";
import LoadingOverlay from "./components/UI/LoadingOverlay";
import AuthContextProvider, { AuthContext } from "./store/auth-context";

const Stack = createNativeStackNavigator();

function AuthenticatedStack() {
  const [dbIsLoading, setDbIsLoading] = useState(true);
  const authContext = useContext(AuthContext);

  useLayoutEffect(() => {
    openOrCreateDatabase({ username: "convsrs", id: authContext.userId });
    setDbIsLoading(false);
  })


  if (dbIsLoading) {
    return (
      <LoadingOverlay message="Opening database..." />
    );
  };

  return (
    <>
      <Stack.Navigator
        screenOptions={{
            headerTintColor: "white",
          }}>
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            presentation: "modal",
            headerShown: true,
            headerTintColor: "black",
            title: "Convsrs",
            headerRight: ({tintColor}) => (
              <IconButton
                icon="exit"
                color={tintColor}
                size={24}
                onPress={() => {}}
              />)
          }} />
        <Stack.Screen
          name="DecksScreen"
          component={DecksScreen}
          options={{
            presentation: "modal",
            headerShown: true,
            headerTintColor: "black",
            title: "My Decks",
          }} />
        <Stack.Screen
          name="DeckScreen"
          component={DeckScreen}
          options={
            ({ route }) => ({
            presentation: "modal",
            headerShown: true,
            headerTintColor: "black",
            title: `Deck ${route.params.deckId}`
          })} />
        <Stack.Screen
          name="FlashcardsScreen"
          component={FlashcardsScreen}
          options={{
            presentation: "modal",
            headerShown: true,
            headerTintColor: "black",
            title: "Flashcards",
          }} />
        <Stack.Screen
          name="FlashcardScreen"
          component={FlashcardScreen}
          options={({ route }) => ({
            presentation: "modal",
            headerShown: true,
            headerTintColor: "black",
            title: `Flashcard ${route.params.flashcardId}`,
          })} />
        <Stack.Screen
          name="ConvsrsScreen"
          component={ConvsrsScreen}
          options={{
            presentation: "modal",
            headerShown: true,
            headerTintColor: "black",
            title: "Convsrs",
          }} />
        <Stack.Screen
          name="ParametersScreen"
          component={ParametersScreen}
          options={{
            presentation: "modal",
            headerShown: true,
            headerTintColor: "black",
            title: "Parameters",
          }} />
      </Stack.Navigator>
    </>
  );

  /*         <Stack.Screen
          name="HidingPathScreen"
          component={HidingPathScreen}
          options={({ navigation }) => ({
            presentation: "modal",
            title:"Guess Path Screen",
            headerShown: false,
            headerLeft: () => (
              <IconButton
                icon="ios-arrow-back"
                color={"white"}
                size={24}
                style={{ marginRight: 20 }}
                onPress={() => navigation.replace("HomeScreen")} />)
          })} /> */
};

function Navigation() {
  const authContext = useContext(AuthContext);

  return (
    <NavigationContainer>
      {authContext.IsAuthenticated ? <AuthenticatedStack /> : <AuthStack />}
    </NavigationContainer>
  );
};


/*function Root() {
  /* const [isTryingLogging, setIsTryingLogging] = useState(true);
  const authContext = useContext(AuthContext);


  useEffect(() => {
    async function fetchToken() {
      const storedToken = await SecureStore.getItemAsync('token')
      if (storedToken) {
        authContext.tokenAuthentication(storedToken);
      }
      setIsTryingLogging(false);
    };
    fetchToken();

  });

  if (isTryingLogging) {
    const message = 'Logging in...';
    return <LoadingOverlay message={message} />
  }; */

  /* return <Navigation />

}; */

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <AuthContextProvider>
        <Navigation />
      </AuthContextProvider>
    </>
  );
};
