/**
 * Format a timestamp from Firestore.
 *
 * @param {Date} dt
 * @returns time formatted as HH:MM
 */
export const formatTimestamp = (dt) =>
  dt.toDate().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
