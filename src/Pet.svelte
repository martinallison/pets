<script>
  import { collectionData } from "rxfire/firestore";
  import { docData } from "rxfire/firestore";
  import { writable } from "svelte/store";
  import { createEvent, getEvents } from "./events";
  import { getPet } from "./pets";

  export let id;

  let petRef = getPet(id);
  let pet = docData(petRef, { idField: "id" });

  $: events = $pet ? collectionData(getEvents(petRef)) : writable([]);

  let possibleEvents = [
    { label: "💩 poopies", type: "POOPING" },
    { label: "💦 pee", type: "PEEING" },
    { label: "👀 awake", type: "AWAKE" },
    { label: "😴 sleep", type: "SLEEPING" },
    { label: "🍔 eat", type: "EATING" },
  ];
  let recordEvent = (type) => {
    createEvent(petRef, type);
  };
</script>

{#if $pet}
  <h2>{$pet.name}</h2>

  <p>Record something</p>

  {#each possibleEvents as possibleEvent}
    <button on:click={() => recordEvent(possibleEvent.type)}
      >{possibleEvent.label}</button
    >
  {/each}

  {#if $events.length}
    <p>What your {$pet.type.toLowerCase()}'s been doing today:</p>

    <ul>
      {#each $events as event}
        <li>
          {event.occurred_at
            .toDate()
            .toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} - {event.type}
        </li>
      {/each}
    </ul>
  {:else}
    <p>No events today yet.</p>
  {/if}
{:else}
  <p>Loading</p>
{/if}
