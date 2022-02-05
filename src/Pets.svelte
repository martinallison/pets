<script>
  import { link } from "svelte-navigator";
  import { getPets } from "./pets";

  export let userId;

  $: pets = getPets(userId);
</script>

<div>
  <div class="main-header flex">
    <h1>Your pets</h1>
    <a href="/add-pet" class="btn btn-primary" use:link>Add a pet +</a>
  </div>

  <div class="section">
    <ul class="plain-list">
      {#each $pets as pet}
        <li class="plain-list-item">
          <a href="/{pet.id}" class="panel plain-link" use:link
            >{pet.emoji} {pet.name}</a
          >
        </li>
      {/each}
    </ul>
  </div>
</div>
