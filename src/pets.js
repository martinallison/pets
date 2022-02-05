import { addDoc, collection, doc, query, where } from "firebase/firestore";
import { collectionData, docData } from "rxfire/firestore";
import { map, startWith } from "rxjs/operators";
import { db } from "./firebase";

const PET_TYPES = {
  DOG: {
    type: "DOG",
    emoji: "🐶",
    label: "Dog",
  },
};

export const petRef = (id) => doc(db, `pets/${id}`);

export const getPets = (userId) => {
  return collectionData(petQuery(userId), { idField: "id" }).pipe(
    startWith([]),
    map((pets) => [...pets.map(convert)])
  );
};

export const getPet = (id) => {
  return docData(petRef(id), { idField: "id" }).pipe(map(convert));
};

export const createPet = (name, userId) => {
  const petsRef = collection(db, "pets");
  return docData(addDoc(petsRef, { name, type: "DOG", owner_id: userId })).pipe(
    map(convert)
  );
};

const convert = (pet) => ({
  ...PET_TYPES[pet.type],
  ...pet,
});

const petQuery = (userId) => {
  const petsRef = collection(db, "pets");
  return query(petsRef, where("owner_id", "==", userId));
};
