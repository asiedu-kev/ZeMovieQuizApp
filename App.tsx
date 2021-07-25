import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Font from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { MainNavigator } from "./navigation";
import { Provider } from "react-redux";
import store, { persistor } from './store';
import { PersistGate } from "redux-persist/integration/react";

export default function App() {
  return (
    <Provider store={store} >
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <StatusBar backgroundColor={"transparent"} hidden={true} />
          <MainNavigator />
        </NavigationContainer>
      </PersistGate>
    </Provider>

  );
}
