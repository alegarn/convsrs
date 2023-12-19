import { Stack } from "expo-router";

export default function StackLayout() {
    return(
      <Stack screenOptions={{ headerShown: true }} >
        <Stack.Screen name="home/index"
          options={{
            // https://reactnavigation.org/docs/headers#setting-the-header-title
            title: 'Home Screen',
            // https://reactnavigation.org/docs/headers#adjusting-header-styles
            headerStyle: { backgroundColor: '#000000' },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            // https://reactnavigation.org/docs/headers#replacing-the-title-with-a-custom-component
          }}
        />
        <Stack.Screen name="decks"
          options={{
            // https://reactnavigation.org/docs/headers#setting-the-header-title
            title: 'Decks',
            // https://reactnavigation.org/docs/headers#adjusting-header-styles
            headerStyle: { backgroundColor: '#000000' },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            // https://reactnavigation.org/docs/headers#replacing-the-title-with-a-custom-component
          }}
        />
        <Stack.Screen name="decks/[id]"
          options={{
            // https://reactnavigation.org/docs/headers#setting-the-header-title
            title: 'Flashcards',
            // https://reactnavigation.org/docs/headers#adjusting-header-styles
            headerStyle: { backgroundColor: '#000000' },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            // https://reactnavigation.org/docs/headers#replacing-the-title-with-a-custom-component
          }}
        />
        <Stack.Screen name="flashcards"
          options={{
            // https://reactnavigation.org/docs/headers#setting-the-header-title
            title: 'Flashcard',
            // https://reactnavigation.org/docs/headers#adjusting-header-styles
            headerStyle: { backgroundColor: '#000000' },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            // https://reactnavigation.org/docs/headers#replacing-the-title-with-a-custom-component
          }}
        />
        <Stack.Screen name="flashcards/[id]"
          options={{
            // https://reactnavigation.org/docs/headers#setting-the-header-title
            title: 'Flashcard',
            // https://reactnavigation.org/docs/headers#adjusting-header-styles
            headerStyle: { backgroundColor: '#000000' },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            // https://reactnavigation.org/docs/headers#replacing-the-title-with-a-custom-component
          }}
        />
        <Stack.Screen name="convsrs/index"
          options={{
            // https://reactnavigation.org/docs/headers#setting-the-header-title
            title: 'Convsrs',
            // https://reactnavigation.org/docs/headers#adjusting-header-styles
            headerStyle: { backgroundColor: '#000000' },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            // https://reactnavigation.org/docs/headers#replacing-the-title-with-a-custom-component
          }}
        />
        <Stack.Screen name="parameters/index"
          options={{
            // https://reactnavigation.org/docs/headers#setting-the-header-title
            title: 'Parameters',
            // https://reactnavigation.org/docs/headers#adjusting-header-styles
            headerStyle: { backgroundColor: '#000000' },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            // https://reactnavigation.org/docs/headers#replacing-the-title-with-a-custom-component
          }}
          />
      </Stack>
    )
}
