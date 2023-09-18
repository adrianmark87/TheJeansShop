/* eslint-disable camelcase */
const { Expo } = require("expo-server-sdk");

async function notificationSender({ expo_push_token }, title, body) {
  const expo = new Expo({ accessToken: process.env.EXPO_ACCESS_TOKEN });
  if (!Expo.isExpoPushToken(expo_push_token)) {
    return console.error(
      `Push token ${expo_push_token} is not a valid Expo push token`
    );
  }

  const message = {
    to: expo_push_token,
    sound: "default",
    body,
    data: { title },
  };

  try {
    await expo.sendPushNotificationsAsync([message]);
  } catch (error) {
    console.error(error);
  }
}

function kindChecker(kind, data) {
  switch (true) {
    case kind === "REGISTRATION":
      notificationSender(
        data,
        "Création de compte",
        "Votre compte a bien été crée"
      );
      break;
    case kind === "FORGOTTEN_PASSWORD":
      break;
    case kind === "SUCCESS_ORDER":
      break;
    default:
      return null;
  }
  return null;
}

module.exports = kindChecker;
