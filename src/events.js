import { addDoc, collection, orderBy, query, where } from "firebase/firestore";
import { collectionData, docData } from "rxfire/firestore";
import { db } from "./firebase";
import { petRef } from "./pets";

export const getEvents = (petId) => collectionData(eventQuery(petRef(petId)));

export const createEvent = (petId, type) => {
  const now = new Date();
  const eventsRef = collection(db, "events");
  docData(
    addDoc(eventsRef, { occurred_at: now, pet_ref: petRef(petId), type })
  );
};

const eventQuery = (petRef) => {
  const thisMorning = new Date();
  thisMorning.setHours(0, 0, 0, 0);

  const tonight = new Date();
  tonight.setHours(23, 59, 59);

  const eventsRef = collection(db, "events");
  return query(
    eventsRef,
    where("pet_ref", "==", petRef),
    where("occurred_at", ">=", thisMorning),
    where("occurred_at", "<=", tonight),
    orderBy("occurred_at", "desc")
  );
};
