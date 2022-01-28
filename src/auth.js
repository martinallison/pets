import { authState } from "rxfire/auth";
import { writable } from "svelte/store";
import { auth } from "./firebase";

export let user = writable(null);

authState(auth).subscribe(user.set);
