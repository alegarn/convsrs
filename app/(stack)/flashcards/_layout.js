import { Stack } from "expo-router";

export default function FlashcardsLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="[id]"
          options={{
            title: "Flashcard",
          }}
        />
      </Stack>
    </>
  );
}
