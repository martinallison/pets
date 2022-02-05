import { addDoc, collection, doc, query, where } from "firebase/firestore";
import { collectionData, docData } from "rxfire/firestore";
import { startWith } from "rxjs/operators";
import { db } from "./firebase";

export const petRef = (id) => doc(db, `pets/${id}`);

export const getPets = (userId) =>
  collectionData(petQuery(userId), { idField: "id" }).pipe(startWith([]));

export const getPet = (id) => docData(petRef(id), { idField: "id" });

export const createPet = (name, userId) => {
  const petsRef = collection(db, "pets");
  return addDoc(petsRef, { name, type: "DOG", owner_id: userId });
};

const petQuery = (userId) => {
  const petsRef = collection(db, "pets");
  return query(petsRef, where("owner_id", "==", userId));
};
