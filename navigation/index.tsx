import React from "react";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import Home from "../screens/Home";
import HelpScreen from "../screens/Help";
import GameScreen from "../screens/Game";
const Stack = createNativeStackNavigator();
export const MainNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={"Home"}
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen name={"Help"} component={HelpScreen} options={{}} />
      <Stack.Screen
        name={"Game"}
        component={GameScreen}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
};
