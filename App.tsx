import * as React from "react";
import HomeScreen from "./src/pages/HomeScreen";
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import ProductScreen from "./src/pages/ProductScreen";
import SearchScreen from "./src/pages/SearchScreen";
import ProfileScreen from "./src/pages/ProfileScreen";

const Stack = createNativeStackNavigator();

type StackNavigation = {
  Home: undefined;
  Product: undefined;
  Profile: undefined;
  Search: undefined;
};

export type StackTypes = NativeStackNavigationProp<StackNavigation>;

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Product" component={ProductScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
