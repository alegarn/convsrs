import { createContext, useState } from "react";


export const AuthContext = createContext({
  token: '',
  client: '',
  uid: '',
  access_token: '',
  expiry: '',
  userId: '',
  scoreId: '',
  IsAuthenticated: false,
  authenticate: () => {},
  logout: () => {},
  tokenAuthentication: () => {},
  saveScoreId: () => {}
});

export default function AuthContextProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
/*   const [authToken, setAuthToken] = useState(null);
  const [client, setClient] = useState('');
  const [uid, setUid] = useState('');
  const [expiry, setExpiry] = useState('');
  const [access_token, setAccess_token] = useState('');
 */
  const [userId, setUserId] = useState('');
/*   const [scoreId, setScoreId] = useState('');
 */
/*   function tokenAuthentication(token) {
    setAuthToken(token);
  }; */

  async function authenticate({/* token, client, expiry, access_token, uid   */userId}) {
    /* setAuthToken(token);
    await SecureStore.setItemAsync('token', token);
    await SecureStore.setItemAsync('client', client);
    await SecureStore.setItemAsync('expiry', expiry);
    await SecureStore.setItemAsync('access_token', access_token);
    await SecureStore.setItemAsync('uid', uid);
    await SecureStore.setItemAsync('userId', userId);
    setClient(client);
    setUid(uid);
    setIsAuthenticated(true);
    setExpiry(expiry);
    setAccess_token(access_token); */
    setUserId(userId);
    console.log("context", /* token, expiry, access_token, client, uid,  */userId);
  };

  async function logout() {
    setUserId('');


   /*  setIsAuthenticated(false);
    setAuthToken(null);
    setClient('');
    setUid('');
    setExpiry('');
    setAccess_token('');
    setScoreId('');
    await SecureStore.deleteItemAsync('token');
    await SecureStore.deleteItemAsync('client');
    await SecureStore.deleteItemAsync('expiry');
    await SecureStore.deleteItemAsync('access_token');
    await SecureStore.deleteItemAsync('uid');
    await SecureStore.deleteItemAsync('userId'); */
  };

  const value = {
    token: authToken,
    client: client,
    uid: uid,
    access_token: access_token,
    expiry: expiry,
    userId: userId,
    scoreId: scoreId,
    IsAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
    tokenAuthentication: tokenAuthentication,
    saveScoreId: saveScoreId
  };
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
