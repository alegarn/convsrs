import * as FileSystem from "expo-file-system";
import * as SQLite from "expo-sqlite";


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

  /* ConvsrsDb.drawio */
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT, username TEXT, password TEXT)",

      "CREATE TABLE IF NOT EXISTS decks (id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT, title TEXT DEFAULT '', description TEXT DEFAULT '', user_id INTEGER NOT NULL, creation_date DATETIME, last_retrieval_date DATETIME, )",
      "CREATE INDEX IF NOT EXISTS deck_title_idx ON decks (title)",

      "CREATE TABLE IF NOT EXISTS flashcards (id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT, retrieval_step INT NOT NULL, ease DEC(4,2) NOT NULL , old_interval INT NOT NULL DEFAULT 1, name TEXT NOT NULL DEFAULT '', text_recto TEXT NOT NULL DEFAULT '', text_verso TEXT NOT NULL DEFAULT '', image_recto TEXT NOT NULL DEFAULT '', image_verso TEXT NOT NULL DEFAULT '', audio_recto TEXT NOT NULL DEFAULT '', audio_verso TEXT NOT NULL DEFAULT '', recto TEXT NOT NULL DEFAULT '', verso TEXT NOT NULL DEFAULT '', creation_date DATETIME NOT NULL, last_retrieval_date DATETIME NOT NULL, success_rate DEC NOT NULL DEFAULT 0.0, status CHAR(10) NOT NULL DEFAULT 'none',  CONSTRAINT fk_deck FOREIGN KEY (deck_id) REFERENCES decks(id) ON DELETE CASCADE)",
      "CREATE INDEX IF NOT EXISTS flashcard_name_idx ON flashcards (name)",

      "CREATE TABLE IF NOT EXISTS deck_flashcards (deck_id INTEGER NOT NULL, flashcard_id INTEGER NOT NULL, PRIMARY KEY (deck_id, flashcard_id), FOREIGN KEY (deck_id) REFERENCES decks(id) ON DELETE CASCADE, FOREIGN KEY (flashcard_id) REFERENCES flashcards(id) ON DELETE CASCADE);",
      "CREATE INDEX IF NOT EXISTS idx_deck_id ON deck_flashcard (deck_id)",
      "CREATE INDEX IF NOT EXISTS idx_flashcard_id ON deck_flashcard (flashcard_id)",

      "CREATE TABLE IF NOT EXISTS user_flashcards (id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT, user_id INTEGER, flashcard_id INTEGER, FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE, FOREIGN KEY (flashcard_id) REFERENCES flashcards(id) ON DELETE CASCADE)",
      "CREATE INDEX IF NOT EXISTS idx_user_id ON user_flashcard (deck_id)",
      "CREATE INDEX IF NOT EXISTS idx_flashcard_id ON user_flashcard (deck_id)",

      "CREATE TABLE IF NOT EXISTS conversations (id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT, date TEXT, data TEXT, first_user_id INTEGER, second_user_id INTEGER)",
      "CREATE INDEX IF NOT EXISTS idx_first_user_id ON conversations (first_user_id)",
      "CREATE INDEX IF NOT EXISTS idx_second_user_id ON conversations (first_user_id, second_user_id)",


      "CREATE TABLE IF NOT EXISTS srs_parameters (id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT, user_id INT NOT NULL, interval_nbr INT NOT NULL  DEFAULT 0, base_interval INT NOT NULL DEFAULT 1,  max_steps INT NOT NULL , min_interval INT NOT NULL DEFAULT 1, max_interval INT NOT NULL DEFAULT 365, steps_times TEXT NOT NULL DEFAULT '[1,15,180,720,1440,2880,5760]', steps_times TEXT NOT NULL DEFAULT '[1,15,720,1440,2880,5760]')",

      "CREATE TABLE IF NOT EXISTS retrieval_sessions (id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT, user_id INTEGER, success_rate DECIMAL(3,2) NOT NULL, creation_date DATETIME NOT NULL, duration INT NOT NULL DEFAULT 0, flashcards_id TEXT NOT NULL DEFAULT '[]', flashcards_steps TEXT NOT NULL DEFAULT '[]', flashcards_success TEXT NOT NULL DEFAULT '[]')",


      "CREATE TABLE IF NOT EXISTS retrieval_flashcards (id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT, flashcard_id int NOT NULL, retrieval_id int NOT NULL)",

    );
  })

  /*  */
  // seed
  /* seedNewDb(db); */
  /*  */

  console.log('new db created', db);
  return db;
};

export async function deleteDatabase({ username, id }) {
  await FileSystem.deleteAsync(FileSystem.documentDirectory + 'SQLite' + `localDatabase-${username}-${id.toString()}.db`);
};

export async function openOrCreateDatabase({ username, id }) {
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
    };
  };
  return SQLite.openDatabase(`localDatabase-${username}-${id.toString()}.db`);
};


export async function deleteDatabases({ username, id }) {
  const db = SQLite.openDatabase(`localDatabase-${username}-${id.toString()}.db`);
  await db.closeAsync();
  await db.deleteAsync();
};
