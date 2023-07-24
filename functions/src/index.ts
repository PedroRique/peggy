import functions = require("firebase-functions");
import admin = require("firebase-admin");
import sendPushNotification from "./sendPushNotification";
import updateProductLockedStatus from "./updateProductLockedStatus";

admin.initializeApp();

exports.sendLoanRequestNotification = functions.firestore
  .document("loans/{loanId}")
  .onCreate(async (snapshot) => {
    const loanData = snapshot.data();

    const {lenderUserId} = loanData;

    const doc = await admin
      .firestore()
      .collection("users")
      .doc(loanData.lenderUserId)
      .get();

    if (!doc.exists) {
      console.log(`No profile found for ${lenderUserId}.`);
      return;
    }

    console.log(`Found user profile for ${lenderUserId}...`);

    const data = doc.data();

    if (typeof data?.pushToken !== "string") {
      console.log(`No push token found for ${lenderUserId}.`);
      return;
    }

    console.log(`Sending push notification to ${lenderUserId}...`);

    await sendPushNotification({
      pushToken: data.pushToken,
      message: "Nova solicitação de empréstimo!",
    });
  });

const loanStatusesToUpdateLocked = [2, 4];
const loanStatusesToUpdateUnlocked = [1, 3, 5, 6];

exports.updateProductLockedStatus = functions.firestore
  .document("loans/{loanId}")
  .onUpdate((change) => {
    const newValue = change.after.data();
    const previousValue = change.before.data();

    if (newValue.status !== previousValue.status) {
      const productId = newValue.productId;
      const loanStatus = newValue.status;

      if (loanStatusesToUpdateLocked.includes(loanStatus)) {
        return updateProductLockedStatus(productId, true);
      } else if (loanStatusesToUpdateUnlocked.includes(loanStatus)) {
        return updateProductLockedStatus(productId, false);
      }
    }

    return null;
  });
