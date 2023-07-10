import { Query, getDocs } from "firebase/firestore";

export const commonFetch = async <T>(q: Query) => {
  const snap = await getDocs(q);
  let result: T[] = [];
  snap.forEach((doc) => {
    if (doc.exists()) {
      result.push(doc.data() as T);
    }
  });
  return result;
};
