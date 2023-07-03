import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import * as React from "react";
import HomeScreen from "./src/pages/HomeScreen";
import ProductScreen from "./src/pages/ProductScreen";
import ProfileScreen from "./src/pages/ProfileScreen";
import SearchScreen from "./src/pages/SearchScreen";
import { Feather } from "@expo/vector-icons";
import NewProductScreen from "./src/pages/NewProductScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

type StackNavigation = {
  Main: undefined;
  Product: undefined;
  Search: undefined;
  NewProduct: undefined;
};

const TabBarIconMapping: Record<string, string> = {
  Home: "home",
  Profile: "user",
};

export type StackTypes = NativeStackNavigationProp<StackNavigation>;

function Main() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          return (
            <Feather
              name={TabBarIconMapping[route.name] as any}
              size={40}
              color={color}
            />
          );
        },
        tabBarLabel: () => {
          return "";
        },
        tabBarStyle: { backgroundColor: "#f3f3f3", height: 70 },
        tabBarActiveTintColor: "#ff9900",
        tabBarInactiveTintColor: "#444",
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="Product" component={ProductScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="NewProduct" component={NewProductScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
