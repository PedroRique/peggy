import type {ExpoPushMessage} from "expo-server-sdk";
import {Expo} from "expo-server-sdk";

const expo = new Expo({accessToken: process.env.EXPO_ACCESS_TOKEN});

type SendPushNotificationProps = {
  pushToken: string;
  message: string;
};

const sendPushNotification = async ({
  pushToken,
  message,
}: SendPushNotificationProps): Promise<void> => {
  const messages: ExpoPushMessage[] = [];

  if (!Expo.isExpoPushToken(pushToken)) {
    console.error(`Push token ${pushToken} is not a valid Expo push token`);
    return;
  }

  messages.push({
    to: pushToken,
    sound: "default",
    body: message,
  });

  try {
    await expo.sendPushNotificationsAsync(messages);
  } catch (error) {
    console.error(error);
  }
};

export default sendPushNotification;
