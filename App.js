import React from 'react';
import { createContext } from 'react';
import { createStore, action } from 'easy-peasy';
import { StoreProvider } from 'easy-peasy';
import Navigation from './Navigation';

export const dataContext = createContext();

const store = createStore({
  userChecked: false,
  setUserChecked: action((state, payload) => {
    state.userChecked = payload;
  }),
  isLoggedIn: false,
  setIsLoggedIn: action((state, payload) => {
    state.isLoggedIn = payload;
  }),
  loading: true,
  setLoading: action((state, payload) => {
    state.loading = payload;
  }),
  userData: null,
  setUserData: action((state, payload) => {
    state.userData = payload;
  }),
  isAdmin: false,
  setIsAdmin: action((state, payload) => {
    state.isAdmin = payload;
  }),
  signedOut: false,
  setSignedOut: action((state, payload) => {
    state.signedOut = payload;
  }),
  adminMode: false,
  setAdminMode: action((state, payload) => {
    state.adminMode = payload;
  }),
});

export default function App() {
  return (
    <StoreProvider store={store}>
      <Navigation />
    </StoreProvider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'yellow',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
