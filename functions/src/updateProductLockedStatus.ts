import admin = require("firebase-admin");

const updateProductLockedStatus = (
  productId: string,
  locked: boolean
) => {
  const productRef = admin.firestore().collection("products").doc(productId);

  return productRef.update({
    locked: locked,
  });
};

export default updateProductLockedStatus;
