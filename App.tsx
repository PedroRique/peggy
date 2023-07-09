import { Feather } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import * as React from "react";
import { PaperProvider } from "react-native-paper";
import { Provider } from "react-redux";
import CategoryScreen from "./src/pages/CategoryScreen";
import HomeScreen from "./src/pages/HomeScreen";
import NewAddressScreen from "./src/pages/NewAddressScreen";
import NewLoanScreen from "./src/pages/NewLoanScreen";
import NewProductScreen from "./src/pages/NewProductScreen";
import ProductScreen from "./src/pages/ProductScreen";
import ProfileScreen from "./src/pages/ProfileScreen";
import SearchScreen from "./src/pages/SearchScreen";
import { store } from "./src/store";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

type StackNavigation = {
  Main: undefined;
  Product: undefined;
  Search: undefined;
  NewProduct: undefined;
  NewAddress: undefined;
  NewLoan: undefined;
  Category: undefined;
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
  const [fontsLoaded] = useFonts({
    RedHatDisplay: require("./assets/fonts/RedHatDisplay.ttf"),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <Provider store={store}>
        <PaperProvider>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Main" component={Main} />
              <Stack.Screen name="Product" component={ProductScreen} />
              <Stack.Screen name="Category" component={CategoryScreen} />
              <Stack.Screen name="Search" component={SearchScreen} />
              <Stack.Screen name="NewProduct" component={NewProductScreen} />
              <Stack.Screen name="NewAddress" component={NewAddressScreen} />
              <Stack.Screen name="NewLoan" component={NewLoanScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </Provider>
    );
  }
}
