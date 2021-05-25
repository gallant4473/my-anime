import 'react-native-gesture-handler';
import { StyleSheet, } from 'react-native'
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import  GlobalProvider from './src/context/GlobalContext';
import Main from './src';

export default function App() {
  return (
    <SafeAreaProvider>
      <GlobalProvider >
        <Main />
      </GlobalProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
