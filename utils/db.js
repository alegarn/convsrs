import * as FileSystem from "expo-file-system";
import * as SQLite from "expo-sqlite";
import { openDatabase } from "expo-sqlite";


export function createNewDeck({db, title, description, userId}) {
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO decks (title, description, user_id) VALUES (?, ?, ?)",
      [title, description, userId],
    );
  });

};

export function createFlashcard({db, recto, verso, deckId, retrievalStep}) {
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO flashcards (recto, verso, deck_id, retrievalStep) VALUES (?, ?, ?, ?)",
      [recto, verso, deckId, retrievalStep],
    );
  });
};

export function updateFlashcard({db, id, recto, verso, retrievalStep}) {
  // TODO: update retrievalStep || recto || verso, with the id
  db.transaction((tx) => {
    tx.executeSql(
      "UPDATE flashcards SET recto = ?, verso = ?, retrievalStep = ? WHERE id = ?",
      [recto, verso, retrievalStep, id],
    );

  });
}

function seedNewDb(db) {
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO decks (title, description, user_id) VALUES ('My Deck', 'My deck description', 1)",
    );
    tx.executeSql(
      "INSERT INTO flashcards (recto, verso, deck_id, user_id, retrievalStep) VALUES ('recto', 'verso', 1, 1, 0)",
      "INSERT INTO flashcards (recto, verso, deck_id, user_id, retrievalStep) VALUES ('recto2', 'verso2', 1, 1, 0)",
      "INSERT INTO flashcards (recto, verso, deck_id, user_id, retrievalStep) VALUES ('recto3', 'verso3', 1, 1, 0)",
    );
  });
};


function initializeNewDb(db) {
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT, username TEXT, password TEXT)",

      "CREATE TABLE IF NOT EXISTS decks (id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT, title TEXT DEFAULT '', description TEXT DEFAULT '', user_id INTEGER NOT NULL, creation_date DATETIME, last_retrieval_date DATETIME, )",
      "CREATE INDEX IF NOT EXISTS deck_title ON decks (title)",

      "CREATE TABLE IF NOT EXISTS flashcards (id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT, text_recto TEXT, text_verso TEXT, image_recto TEXT, image_verso TEXT, audio_recto TEXT, audio_verso TEXT, recto TEXT, verso TEXT, deck_id INTEGER NOT NULL, retrievalStep INTEGER NOT NULL, creationDate DATETIME NOT NULL, lastRetrievalDate DATETIME NOT NULL, CONSTRAINT fk_deck FOREIGN KEY (deck_id) REFERENCES decks(id) ON DELETE CASCADE)",

      "CREATE TABLE IF NOT EXISTS deck_flashcard (deck_id INTEGER NOT NULL, flashcard_id INTEGER NOT NULL, PRIMARY KEY (deck_id, flashcard_id), FOREIGN KEY (deck_id) REFERENCES decks(id) ON DELETE CASCADE, FOREIGN KEY (flashcard_id) REFERENCES flashcards(id) ON DELETE CASCADE);",
      "CREATE INDEX IF NOT EXISTS idx_deck_id ON deck_flashcard (deck_id)",
      "CREATE INDEX IF NOT EXISTS idx_flashcard_id ON deck_flashcard (flashcard_id)",

      "CREATE TABLE IF NOT EXISTS user_flashcard (id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT, user_id INTEGER, flashcard_id INTEGER, FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE, FOREIGN KEY (flashcard_id) REFERENCES flashcards(id) ON DELETE CASCADE)",
      "CREATE INDEX IF NOT EXISTS idx_user_id ON user_flashcard (deck_id)",
      "CREATE INDEX IF NOT EXISTS idx_flashcard_id ON user_flashcard (deck_id)",

      "CREATE TABLE IF NOT EXISTS conversations (id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT, date TEXT, data TEXT, first_user_id INTEGER, second_user_id INTEGER)",
      "CREATE INDEX IF NOT EXISTS idx_first_user_id ON conversations (first_user_id)",
      "CREATE INDEX IF NOT EXISTS idx_second_user_id ON conversations (first_user_id, second_user_id)",


      "CREATE TABLE IF NOT EXISTS parameters (id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT, user_id INTEGER, retrieval INTEGER, conversation INTEGER)",
    );
  })

  /*  */
  // seed
  seedNewDb(db);
  /*  */
  return db;
};

export async function deleteDatabase({ username, id }) {
  await FileSystem.deleteAsync(FileSystem.documentDirectory + 'SQLite' + `localDatabase-${username}-${id.toString()}.db`);
};

export async function openDatabase({ username, id }) {
  /*   if (Platform.OS === "web") {
      return {
        transaction: () => {
          return {
            executeSql: () => {},
          };
        },
      };
    }; */
  if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite')).exists) {
    await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'SQLite');
    if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite' + 'localDatabaseUserId.db')).exists) {
      const db = SQLite.openDatabase(`localDatabase-${username}-${id.toString()}.db`);
      initializeNewDb(db);
      return db;
    }
  };
  return SQLite.openDatabase(`localDatabase-${username}-${id.toString()}.db`);
};

