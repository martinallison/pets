<script>
  import { writable } from "svelte/store";
  import { EVENT_TYPES, createEvent, getEvents } from "./events";
  import { getPet } from "./pets";
  import { formatTimestamp } from "./utils";

  const BUTTON_COLOURS = {
    AWAKE: "purple",
    POOPING: "orange",
    PEEING: "yellow",
    WALKING: "sky",
    PLAYING: "grass",
    EATING: "mint",
    SLEEPING: "mauve",
    VET_VISIT: "crimson",
  };

  export let id;
  let pet;
  let events;

  $: pet = getPet(id);
  $: events = $pet ? getEvents(id) : writable([]);
</script>

{#if $pet}
  <div class="main-header">
    <h1>{$pet.emoji} {$pet.name}</h1>
  </div>

  <section class="section">
    <p>Record something</p>

    <div class="flex-inline">
      {#each Object.values(EVENT_TYPES) as event}
        <button
          class="btn {BUTTON_COLOURS[event.type]}"
          on:click={() => createEvent(id, event.type)}
          >{event.emoji} {event.label}</button
        >
      {/each}
    </div>
  </section>

  <section class="section">
    {#if $events.length}
      <p>What your {$pet.label.toLowerCase()}'s been doing today:</p>

      <ul class="plain-list">
        {#each $events as event}
          <li class="plain-list-item panel">
            {event.emoji}
            {event.label}
            {formatTimestamp(event.occurredAt)}
          </li>
        {/each}
      </ul>
    {:else}
      <p>No events today yet.</p>
    {/if}
  </section>
{:else}
  <section class="section">
    <p>Loading</p>
  </section>
{/if}
