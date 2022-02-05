<script>
  import { Route, Router, link } from "svelte-navigator";
  import { user } from "./auth";
  import CreatePet from "./CreatePet.svelte";
  import Pet from "./Pet.svelte";
  import Pets from "./Pets.svelte";
  import Splash from "./Splash.svelte";
</script>

{#if $user}
  <main>
    <p class="header"><a href="/" use:link class="plain-link">Doglog</a></p>

    <Router>
      <Route path="/">
        <Pets userId={$user.uid} />
      </Route>
      <Route path="/:petId" let:params>
        <Pet id={params.petId} />
      </Route>
      <Route path="/add-pet">
        <CreatePet />
      </Route>
    </Router>
  </main>
{:else}
  <Splash />
{/if}

<style>
  main {
    padding: 1em;
    max-width: none;
    margin: 0 auto;
  }

  @media (min-width: 640px) {
    main {
      max-width: 68%;
    }
  }

  .header {
    margin: 0;
  }
</style>
