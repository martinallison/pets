import { addDoc, collection, orderBy, query, where } from "firebase/firestore";
import { db } from "./firebase";

export const getEvents = (petRef) => {
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

export const createEvent = (petRef, type) => {
  const now = new Date();
  const eventsRef = collection(db, "events");
  addDoc(eventsRef, { occurred_at: now, pet_ref: petRef, type });
};
