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

    await sendPushNotification({
      userId: lenderUserId,
      message: "Nova solicitação de empréstimo!",
    });
  });

exports.sendAddProductNotification = functions.firestore
  .document("products/{productId}")
  .onCreate(async (snapshot) => {
    const productData = snapshot.data();

    const {userId} = productData;

    await sendPushNotification({
      userId,
      message:
        "Obrigado por adicionar mais um produto. Mais 50 peggies para você! 💰",
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
