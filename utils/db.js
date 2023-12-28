import * as FileSystem from "expo-file-system";
import * as SQLite from "expo-sqlite";

export async function createNewDeck({ title, description, userId, username }) {
  /* TODO */
  // const db = SQLite.openDatabase(`localDatabase-${username}-${id.toString()}.db`);
  console.log("createNewDeck db", title, description, userId);
  const db = SQLite.openDatabase(`localDatabase-${username}-${userId.toString()}.db`);
  /* db.then((db) => */ /* {db, ...} = object + promise / (db, title..) = transaction directly? */
    db.transactionAsync((tx) => {
      const date = new Date();
      tx.executeSqlAsync(
        "INSERT INTO decks (title, description, user_id, creation_date) VALUES (?, ?, ?, ?)",
        [title, description, userId, date.toISOString()],
      );
  })/* ) */;

};

export async function deleteDeck({db, id}) {
  db.transactionAsync((tx) => {
    tx.executeSql(
      "DELETE FROM decks WHERE id = ?",
      [id],
    );
  });

}


export async function fetchFlashCardList (callback, deck_id, username, id) {

  const db = SQLite.openDatabase(`localDatabase-${username}-${id.toString()}.db`);
  const flashcards = db.executeSqlAsync("SELECT * FROM flashcards WHERE deck_id = ?", [deck_id]);
  callback(flashcards);

};

export async function createFlashcard({db, recto, verso, deckId, retrievalStep}) {
  db.transactionAsync((tx) => {
    tx.executeSql(
      "INSERT INTO flashcards (recto, verso, deck_id, retrievalStep) VALUES (?, ?, ?, ?)",
      [recto, verso, deckId, retrievalStep],
    );
  });
};

export async function updateFlashcard({db, id, recto, verso, retrievalStep}) {
  // TODO: update retrievalStep || recto || verso, with the id
  db.transactionAsync((tx) => {
    tx.executeSql(
      "UPDATE flashcards SET recto = ?, verso = ?, retrievalStep = ? WHERE id = ?",
      [recto, verso, retrievalStep, id],
    );

  });
};




export async function fetchDeckList(callback, username, id) {
//https://blog.stackademic.com/expo-sqlite-in-detail-0518e9deeaad
  //console.log("fetchDeckList db", db);
  const db1 = SQLite.openDatabase(`localDatabase-${username}-${id.toString()}.db`);

  /* const decks = db1.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO users (username, id) VALUES (?, ?)",
        [title, userId],
      [],
      (tx, results) => {
        console.log("fetchDeckList results", results);
        return results
      })
    }) */

    /* works */
  db1.transaction((tx) =>
    tx.executeSql(
      "SELECT * FROM decks",
      [],
      (_, results) => {
        console.log("fetchDeckList results", results);
        console.log("fetchDeckList results.rows", results.rows);
        console.log("fetchDeckList results.rows._array", results.rows._array);
        callback(results.rows._array);
      }
    )
  );
};

function seedNewDb(db) {
  db.transactionAsync((tx) => {
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


async function initializeNewDb(username, id) {
  /* always like this or with context ? */
  const db = SQLite.openDatabase(`localDatabase-${username}-${id.toString()}.db`);
  /* ConvsrsDb.drawio */
  /* with async: error infos, without async: no error logged */
  await db.transactionAsync((tx) => {
    tx.executeSqlAsync("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, username TEXT, password TEXT)");
    tx.executeSqlAsync("CREATE TABLE IF NOT EXISTS decks (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, title TEXT DEFAULT '', description TEXT DEFAULT '', user_id INTEGER NOT NULL, creation_date DATETIME, last_retrieval_date DATETIME )");
    tx.executeSqlAsync("CREATE INDEX IF NOT EXISTS deck_title_idx ON decks (title)");

    tx.executeSqlAsync("CREATE TABLE IF NOT EXISTS flashcards (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, deck_id INTEGER, retrieval_step INT NOT NULL, ease DEC(4,2) NOT NULL , old_interval INT NOT NULL DEFAULT 1, name TEXT NOT NULL DEFAULT '', text_recto TEXT NOT NULL DEFAULT '', text_verso TEXT NOT NULL DEFAULT '', image_recto TEXT NOT NULL DEFAULT '', image_verso TEXT NOT NULL DEFAULT '', audio_recto TEXT NOT NULL DEFAULT '', audio_verso TEXT NOT NULL DEFAULT '', recto TEXT NOT NULL DEFAULT '', verso TEXT NOT NULL DEFAULT '', creation_date DATETIME NOT NULL, last_retrieval_date DATETIME NOT NULL, success_rate DEC NOT NULL DEFAULT 0.0, status CHAR(10) NOT NULL DEFAULT 'none', CONSTRAINT fk_deck FOREIGN KEY (deck_id) REFERENCES decks(id) ON DELETE CASCADE)");
    tx.executeSqlAsync("CREATE INDEX IF NOT EXISTS flashcard_name_idx ON flashcards (name)");

    tx.executeSqlAsync("CREATE TABLE IF NOT EXISTS deck_flashcards (deck_id INTEGER NOT NULL, flashcard_id INTEGER NOT NULL, PRIMARY KEY (deck_id, flashcard_id), FOREIGN KEY (deck_id) REFERENCES decks(id) ON DELETE CASCADE, FOREIGN KEY (flashcard_id) REFERENCES flashcards(id) ON DELETE CASCADE)");
    tx.executeSqlAsync("CREATE INDEX IF NOT EXISTS idx_deck_id ON deck_flashcards (deck_id)");
    tx.executeSqlAsync("CREATE INDEX IF NOT EXISTS idx_flashcard_id ON deck_flashcards (flashcard_id)");

    tx.executeSqlAsync("CREATE TABLE IF NOT EXISTS user_flashcards (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, user_id INTEGER, flashcard_id INTEGER, FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE, FOREIGN KEY (flashcard_id) REFERENCES flashcards(id) ON DELETE CASCADE)");
    tx.executeSqlAsync("CREATE INDEX IF NOT EXISTS idx_user_id ON user_flashcards (user_id)");
    tx.executeSqlAsync("CREATE INDEX IF NOT EXISTS idx_flashcard_id ON user_flashcards (flashcard_id)");

    tx.executeSqlAsync("CREATE TABLE IF NOT EXISTS conversations (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, date TEXT, data TEXT, first_user_id INTEGER, second_user_id INTEGER)");
    tx.executeSqlAsync("CREATE INDEX IF NOT EXISTS idx_first_user_id ON conversations (first_user_id)");
    tx.executeSqlAsync("CREATE INDEX IF NOT EXISTS idx_second_user_id ON conversations (first_user_id, second_user_id)");


    tx.executeSqlAsync("CREATE TABLE IF NOT EXISTS srs_parameters (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, user_id INT NOT NULL, interval_nbr INT NOT NULL  DEFAULT 0, base_interval INT NOT NULL DEFAULT 1,  max_steps INT NOT NULL , min_interval INT NOT NULL DEFAULT 1, max_interval INT NOT NULL DEFAULT 365, steps_times TEXT NOT NULL DEFAULT '[1,15,180,720,1440,2880,5760]')");

    tx.executeSqlAsync("CREATE TABLE IF NOT EXISTS retrieval_sessions (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, user_id INTEGER, success_rate DECIMAL(3,2) NOT NULL, creation_date DATETIME NOT NULL, duration INT NOT NULL DEFAULT 0, flashcards_id TEXT NOT NULL DEFAULT '[]', flashcards_steps TEXT NOT NULL DEFAULT '[]', flashcards_success TEXT NOT NULL DEFAULT '[]')");


    tx.executeSqlAsync("CREATE TABLE IF NOT EXISTS retrieval_flashcards (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, flashcard_id int NOT NULL, retrieval_id int NOT NULL)");

  });

/*   await db.transactionAsync((tx) => {
    tx.executeSqlAsync("INSERT INTO users (username, password) VALUES (?, ?)", ["convsrs", "aaaaaa"]);
  }) */

/* it works */
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM users", [], (_, {rows: { _array }}) => {
        console.log("users", _array);
      }
    )
  })

/* it works */
/*   db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO decks (title, description, user_id) VALUES ('My Deck 4', 'My deck description 4 ', 1)",
    )
  }) */

  db.transaction((tx) => {
    tx.executeSql("SELECT * FROM decks", [], (_, results) => {
      console.log("decks", results.rows._array);
    });
  })

/*   db.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM users", null, (_, results) => {
        console.log("users", results.rows._array);
      }
    )
  }) */

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
        transactionAsync: () => {
          return {
            executeSql: () => {},
          };
        },
      };
    }; */
  if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite')).exists) {
    await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'SQLite');
  };

  if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite' + `/localDatabase-${username}-${id.toString()}.db`)).exists) {
    console.log("create new db");
    let db = await initializeNewDb(username, id);
    return db;
  };

  /*  */
  await initializeNewDb(username, id);
  /*  */
  return SQLite.openDatabase(`localDatabase-${username}-${id.toString()}.db`);
};

export async function closeDb(db) {
  await db.closeAsync();
};


export async function deleteDatabases({ username, id }) {
  const db = SQLite.openDatabase(`localDatabase-${username}-${id.toString()}.db`);
  await closeDb(db);
  await db.deleteAsync();
};
