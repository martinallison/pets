<script>
  import { writable } from "svelte/store";
  import { EVENT_TYPES, createEvent, getEvents } from "./events";
  import { getPet } from "./pets";
  import { formatTimestamp } from "./utils";

  export let id;

  $: pet = getPet(id);
  $: events = $pet ? getEvents(id) : writable([]);
</script>

{#if $pet}
  <h2>{$pet.emoji} {$pet.name}</h2>

  <p>Record something</p>

  {#each Object.values(EVENT_TYPES) as event}
    <button on:click={() => createEvent(id, event.type)}
      >{event.emoji} {event.label}</button
    >
  {/each}

  {#if $events.length}
    <p>What your {$pet.label.toLowerCase()}'s been doing today:</p>

    <ul>
      {#each $events as event}
        <li>
          {event.emoji}
          {event.label}
          {formatTimestamp(event.occurredAt)}
        </li>
      {/each}
    </ul>
  {:else}
    <p>No events today yet.</p>
  {/if}
{:else}
  <p>Loading</p>
{/if}
