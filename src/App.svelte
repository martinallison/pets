<script>
  import { Route, Router } from "svelte-navigator";
  import { user } from "./auth";
  import CreatePet from "./CreatePet.svelte";
  import Pet from "./Pet.svelte";
  import Pets from "./Pets.svelte";
  import SignIn from "./SignIn.svelte";
</script>

<main>
  <h1>Pawgress</h1>

  {#if $user}
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
  {:else}
    <SignIn />
  {/if}
</main>

<style>
  main {
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
