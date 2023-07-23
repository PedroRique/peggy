import { Feather } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import * as Device from "expo-device";
import { useFonts } from "expo-font";
import * as Notifications from "expo-notifications";
import * as SplashScreen from "expo-splash-screen";
import { User } from "firebase/auth";
import * as React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Alert, Platform, View } from "react-native";
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
import ProfileScreen from "./src/pages/ProfileScreen";
import RegisterScreen from "./src/pages/RegisterScreen";
import SearchScreen from "./src/pages/SearchScreen";
import { convertUserToUserData } from "./src/services/utils.service";
import { PColors } from "./src/shared/Colors";
import { persistor, store } from "./src/store";
import { userSlice } from "./src/store/slices/user.slice";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// Can use this function below OR use Expo's Push Notification Tool from: https://expo.dev/notifications
async function sendPushNotification(expoPushToken: any) {
  const message = {
    to: expoPushToken,
    sound: "default",
    title: "Original Title",
    body: "And here is the body!",
    data: { someData: "goes here" },
  };

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();

    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      Alert.alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync({
      projectId: 'peggy-app'
    })).data;
    console.log(token);
  } else {
    Alert.alert("Must use physical device for Push Notifications");
  }

  return token;
}

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export type StackNavigation = {
  Loans?: {
    initialTab: LoanType;
  };
  Profile: undefined;
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
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
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

  const [expoPushToken, setExpoPushToken] = useState<any>("2");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef<any>();
  const responseListener = useRef<any>();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification: any) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

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
              <ToastProvider duration={2000}>
                <Navigation></Navigation>
              </ToastProvider>
            </PaperProvider>
          </PersistGate>
        </Provider>
      </View>
    );
  }
}
