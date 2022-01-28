import { db } from "./firebase";
import { collection, doc, query, where } from "firebase/firestore";

export const getPets = (userId) => {
  const petsRef = collection(db, "pets");
  return query(petsRef, where("owner_id", "==", userId));
};

export const getPet = (id) => {
  return doc(db, "pets", id);
};
