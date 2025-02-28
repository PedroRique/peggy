import { Feather } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import * as Notifications from "expo-notifications";
import * as SplashScreen from "expo-splash-screen";
import { User } from "firebase/auth";
import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { PaperProvider } from "react-native-paper";
import { ToastProvider } from "react-native-toast-notifications";
import { Provider, useDispatch } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { FIREBASE_AUTH } from "./firebaseConfig";
import { LoanType } from "./src/models/Loan";
import CategoryScreen from "./src/pages/CategoryScreen";
import EditProfileScreen from "./src/pages/EditProfileScreen";
import HomeScreen from "./src/pages/HomeScreen";
import LoansScreen from "./src/pages/LoansScreen";
import LoginScreen from "./src/pages/LoginScreen";
import { NearbyScreen } from "./src/pages/NearbyScreen";
import NewAddressScreen from "./src/pages/NewAddressScreen";
import NewLoanRequestScreen from "./src/pages/NewLoanRequestScreen";
import NewProductScreen from "./src/pages/NewProductScreen";
import ProductScreen from "./src/pages/ProductScreen";
import UserProfileScreen from "./src/pages/UserProfileScreen";
import ProfileScreen from "./src/pages/ProfileScreen";
import RegisterScreen from "./src/pages/RegisterScreen";
import SearchScreen from "./src/pages/SearchScreen";
import { generatePushNotificationsToken } from "./src/services/notifications.service";
import { updateUserPushToken } from "./src/services/user.service";
import { convertUserToUserData } from "./src/services/utils.service";
import { PColors } from "./src/shared/Colors";
import { persistor, store } from "./src/store";
import { userSlice } from "./src/store/slices/user.slice";
import ForgotScreen from "./src/pages/ForgotScreen ";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export type StackNavigation = {
  Loans?: {
    initialTab: LoanType;
  };
  Profile: {uid:string};
  UserProfile: {uid:string};
  Chat: {chatroomId:string};
  Main: undefined;
  Product: undefined;
  Login: undefined;
  Register: undefined;
  Search: undefined;
  NewProduct: {
    onAdd: () => void;
  };
  NewAddress: {
    onAdd: () => void;
  };
  NewLoanRequest: undefined;
  Category: undefined;
  Nearby: undefined;
  EditProfile: undefined;
  Forgot: undefined;
};

const TabBarIconMapping: Record<string, string> = {
  Home: "home",
  Profile: "user",
  Loans: "repeat",
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
        tabBarActiveTintColor: PColors.Orange,
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
  const dispatch = useDispatch();
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    const subscriber = FIREBASE_AUTH.onAuthStateChanged((user) => {
      setUser(user);
      const userData = convertUserToUserData(user);

      if (userData) {
        dispatch(userSlice.actions.setUserData(userData));

        generatePushNotificationsToken().then((token) =>
          updateUserPushToken(token)
        );
      }

      if (initializing) setInitializing(false);
    });
    return subscriber;
  }, []);

  if (initializing) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
          presentation: "card",
        }}
      >
        {user ? (
          <>
            <Stack.Screen name="Main" component={Main} />
            <Stack.Screen name="Product" component={ProductScreen} />
            <Stack.Screen name="Category" component={CategoryScreen} />
            <Stack.Screen name="Search" component={SearchScreen} />
            <Stack.Screen name="NewProduct" component={NewProductScreen} />
            <Stack.Screen name="NewAddress" component={NewAddressScreen} />
            <Stack.Screen name="EditProfile" component={EditProfileScreen} />
            <Stack.Screen
              name="NewLoanRequest"
              component={NewLoanRequestScreen}
            />
            <Stack.Screen name="Nearby" component={NearbyScreen} />
            <Stack.Screen name="UserProfile" component={UserProfileScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Forgot" component={ForgotScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    RedHatDisplay: require("./assets/fonts/RedHatDisplay.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <PaperProvider>
              <ToastProvider duration={2000} offsetBottom={75}>
                <Navigation></Navigation>
              </ToastProvider>
            </PaperProvider>
          </PersistGate>
        </Provider>
      </View>
    );
  }
}
