import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  SafeAreaView
} from "react-native";

import { Provider } from "react-redux";
import { Provider as ThemeProvider} from "react-native-paper";

import { RootSiblingParent } from 'react-native-root-siblings';

import AppNavigation from 'views/shared/Nav/AppNavigation';
import Store from 'store/Store';

export default function App() {




  return (
    <Provider store={Store}>
      <ThemeProvider>
      <RootSiblingParent>

        <SafeAreaView style={[styles.container]}>
          <AppNavigation />

        </SafeAreaView>
      </RootSiblingParent>
      </ThemeProvider>

    </Provider>




  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});