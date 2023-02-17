import { db } from "../../firebase";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";

const userExists = async (user) => {
  const docRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(docRef);
  return docSnap.exists();
};

const addDocWithDate = async (collectionName, document, object) => {
  await setDoc(doc(db, collectionName, document), {
    ...object,
    date: serverTimestamp(),
  });
};
const addDocWithoutDate = async (collectionName, document, object) => {
  await setDoc(doc(db, collectionName, document), {
    ...object,
  });
};

const getCollection = async (collectionName, document) => {
  const docRef = doc(db, collectionName, document);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No such document!");
  }
};

const getDocRef = (collectionName, document) => {
  return doc(db, collectionName, document);
};

const emailValidator = (email) => {
  return /^[a-z0-9.]{1,64}@[a-z0-9.]{1,64}[a-z0-9]{2,4}$/i.test(email);
};

export {
  userExists,
  addDocWithDate,
  addDocWithoutDate,
  getCollection,
  getDocRef,
  emailValidator,
};
