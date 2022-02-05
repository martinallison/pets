import { addDoc, collection, orderBy, query, where } from "firebase/firestore";
import { collectionData, docData } from "rxfire/firestore";
import { map } from "rxjs/operators";
import { db } from "./firebase";
import { petRef } from "./pets";

export const EVENT_TYPES = {
  AWAKE: {
    type: "AWAKE",
    emoji: "👀",
    label: "Awake",
  },
  POOPING: {
    type: "POOPING",
    emoji: "💩",
    label: "Poopies",
  },
  PEEING: {
    type: "PEEING",
    emoji: "💦",
    label: "Pee",
  },
  WALKING: {
    type: "WALKING",
    emoji: "🗺",
    label: "Walk",
  },
  PLAYING: {
    type: "PLAYING",
    emoji: "🎾",
    label: "Play",
  },
  EATING: {
    type: "EATING",
    emoji: "🍔",
    label: "Eat",
  },
  SLEEPING: {
    type: "SLEEPING",
    emoji: "😴",
    label: "Sleep",
  },
  VET_VISIT: {
    type: "VET_VISIT",
    emoji: "🏥",
    label: "Vets",
  },
};

export const getEvents = (petId) =>
  collectionData(eventQuery(petRef(petId))).pipe(
    map((events) => [...events].map(convert))
  );

export const createEvent = (petId, type) => {
  const now = new Date();
  const eventsRef = collection(db, "events");
  docData(
    addDoc(eventsRef, { occurred_at: now, pet_ref: petRef(petId), type })
  ).pipe(map(convert));
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

const convert = (event) => ({
  ...EVENT_TYPES[event.type],
  occurredAt: event.occurred_at,
});
