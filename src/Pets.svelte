<script>
  import { link } from "svelte-navigator";
  import { getPets } from "./pets";

  export let userId;
  let pets;

  $: pets = getPets(userId);
</script>

<div>
  <h2>Your pets</h2>
  <a href="/add-pet" use:link>Add a pet</a>

  <ul>
    {#each $pets as pet}
      <li><a href="/{pet.id}" use:link>{pet.name}</a></li>
    {/each}
  </ul>
</div>
