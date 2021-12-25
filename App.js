import React from 'react';
import { createContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStore, action } from 'easy-peasy';
import { StoreProvider } from 'easy-peasy';
import { useStoreState, useStoreActions } from 'easy-peasy';
import Navigation from './Navigation';

const Stack = createNativeStackNavigator();
export const dataContext = createContext();

const store = createStore({
  todos: ['Create store', 'Wrap application', 'Use store'],
  addTodo: action((state, payload) => {
    state.todos.push(payload);
  }),
  userChecked: false,
  setUserChecked: action((state, payload) => {
    state.userChecked = payload;
  }),
  isLoggedIn: false,
  setIsLoggedIn: action((state, payload) => {
    state.isLoggedIn = payload;
  }),
  loading: false,
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
  reset: action((state) => {
    state.userData = null;
    state.isLoggedIn = false;
    state.isAdmin = false;
  })
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
