import type {ExpoPushMessage} from "expo-server-sdk";
import {Expo} from "expo-server-sdk";
import admin = require("firebase-admin");

const expo = new Expo({accessToken: process.env.EXPO_ACCESS_TOKEN});

type SendPushNotificationProps = {
  userId: string;
  message: string;
};

const sendPushNotification = async ({
  userId,
  message,
}: SendPushNotificationProps): Promise<void> => {
  const doc = await admin.firestore().collection("users").doc(userId).get();

  if (!doc.exists) {
    console.log(`No profile found for ${userId}.`);
    return;
  }

  console.log(`Found user profile for ${userId}...`);

  const data = doc.data();

  if (typeof data?.pushToken !== "string") {
    console.log(`No push token found for ${userId}.`);
    return;
  }

  console.log(`Sending push notification to ${userId}...`);
  const messages: ExpoPushMessage[] = [];

  if (!Expo.isExpoPushToken(data.pushToken)) {
    console.error(
      `Push token ${data.pushToken} is not a valid Expo push token`
    );
    return;
  }

  messages.push({
    to: data.pushToken,
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
