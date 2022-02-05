<script>
  import { writable } from "svelte/store";
  import { createEvent, getEvents } from "./events";
  import { getPet } from "./pets";

  export let id;

  $: pet = getPet(id);
  $: events = $pet ? getEvents(id) : writable([]);

  let possibleEvents = [
    { label: "💩 poopies", type: "POOPING" },
    { label: "💦 pee", type: "PEEING" },
    { label: "👀 awake", type: "AWAKE" },
    { label: "😴 sleep", type: "SLEEPING" },
    { label: "🍔 eat", type: "EATING" },
  ];
</script>

{#if $pet}
  <h2>{$pet.emoji} {$pet.name}</h2>

  <p>Record something</p>

  {#each possibleEvents as possibleEvent}
    <button on:click={() => createEvent(id, possibleEvent.type)}
      >{possibleEvent.label}</button
    >
  {/each}

  {#if $events.length}
    <p>What your {$pet.label.toLowerCase()}'s been doing today:</p>

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
