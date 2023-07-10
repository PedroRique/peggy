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
import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import CategoryScreen from "./src/pages/CategoryScreen";
import HomeScreen from "./src/pages/HomeScreen";
import LoansScreen from "./src/pages/LoansScreen";
import LoginScreen from "./src/pages/LoginScreen";
import NewAddressScreen from "./src/pages/NewAddressScreen";
import NewLoanRequestScreen from "./src/pages/NewLoanRequestScreen";
import NewProductScreen from "./src/pages/NewProductScreen";
import ProductScreen from "./src/pages/ProductScreen";
import ProfileScreen from "./src/pages/ProfileScreen";
import RegisterScreen from "./src/pages/RegisterScreen";
import SearchScreen from "./src/pages/SearchScreen";
import { Colors } from "./src/shared/Colors";
import { AppState, persistor, store } from "./src/store";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

type StackNavigation = {
  Main: undefined;
  Product: undefined;
  Login: undefined;
  Register: undefined;
  Search: undefined;
  NewProduct: undefined;
  NewAddress: undefined;
  NewLoanRequest: undefined;
  Category: undefined;
};

const TabBarIconMapping: Record<string, string> = {
  Home: "home",
  Profile: "user",
  Loans: "inbox",
};

export type StackTypes = NativeStackNavigationProp<StackNavigation>;

function Main() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
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
        tabBarActiveTintColor: Colors.Orange,
        tabBarInactiveTintColor: "#444",
        headerShown: false,
      })}
    >
      <Tab.Screen name="Loans" component={LoansScreen} />
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const Navigation = () => {
  const user = useSelector((state: AppState) => state.user.profile);
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={user?.uid ? "Main" : "Login"}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="Product" component={ProductScreen} />
        <Stack.Screen name="Category" component={CategoryScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="NewProduct" component={NewProductScreen} />
        <Stack.Screen name="NewAddress" component={NewAddressScreen} />
        <Stack.Screen name="NewLoanRequest" component={NewLoanRequestScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  const [fontsLoaded] = useFonts({
    RedHatDisplay: require("./assets/fonts/RedHatDisplay.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <PaperProvider>
            <Navigation></Navigation>
          </PaperProvider>
        </PersistGate>
      </Provider>
    );
  }
}
