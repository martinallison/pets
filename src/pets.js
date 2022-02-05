import { addDoc, collection, doc, query, where } from "firebase/firestore";
import { db } from "./firebase";

export const getPets = (userId) => {
  const petsRef = collection(db, "pets");
  return query(petsRef, where("owner_id", "==", userId));
};

export const getPet = (id) => {
  return doc(db, "pets", id);
};

export const createPet = (name, userId) => {
  const petsRef = collection(db, "pets");
  return addDoc(petsRef, { name, type: "DOG", owner_id: userId });
};
