import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import IconButton from './components/UI/IconButton';

import HomeScreen from './screens/HomeScreen';

const Stack = createNativeStackNavigator();


function AuthenticatedStack() {
  //const authContext = useContext(AuthContext);
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
            title: "Home Screen",
            headerRight: ({tintColor}) => (
              <IconButton
                icon="exit"
                color={tintColor}
                size={24}
                //onPress={authContext.logout}
              />)
          }} />

{/*         <Stack.Screen
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
          })} /> */}

      </Stack.Navigator>
    </>
  );
};

function Navigation() {
  //const authContext = useContext(AuthContext);
  return (
    <NavigationContainer>
      {/* authContext.IsAuthenticated ? <AuthenticatedStack /> : <AuthStack /> */}
      <AuthenticatedStack />
    </NavigationContainer>
  );
};


function Root() {
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

  return <Navigation />

};


export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      {/* <AuthContextProvider> */}
        <Root />
      {/* </AuthContextProvider> */}
    </>
  );
};
