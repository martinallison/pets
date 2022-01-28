<script>
  import { collectionData } from "rxfire/firestore";
  import { startWith } from "rxjs/operators";
  import { link } from "svelte-navigator";
  import { getPets } from "./pets";

  export let userId;

  const pets = collectionData(getPets(userId), { idField: "id" }).pipe(
    startWith([])
  );
</script>

<div>
  <ul>
    {#each $pets as pet}
      <li><a href="/{pet.id}" use:link>{pet.name}</a></li>
    {/each}
  </ul>
</div>
