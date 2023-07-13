import functions = require("firebase-functions");
import admin = require("firebase-admin");
import sgMail = require("@sendgrid/mail");
admin.initializeApp();

// Configure SendGrid with your API key
sgMail.setApiKey("YOUR_SENDGRID_API_KEY");

exports.sendNotificationEmail = functions.firestore
  .document("users")
  .onCreate(async (snapshot, context) => {
    const userId = snapshot.data().userId;

    // Retrieve user's email from Firestore
    const userSnapshot = await admin
      .firestore()
      .collection("users")
      .doc(userId)
      .get();
    const userEmail = userSnapshot.data()?.email;

    const msg = {
      to: userEmail,
      from: "your_sender_email@example.com",
      subject: "Notification Subject",
      text: "Notification Body",
    };

    await sgMail.send(msg);
  });
