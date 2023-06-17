import * as React from "react";
import HomeScreen from "./src/pages/HomeScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Vamos colaborar!" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
