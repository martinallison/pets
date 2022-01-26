<script>
  import { auth, signIn, signOut } from "./firebase";
  import { authState } from "rxfire/auth";

  let user;
  let displayName;

  authState(auth).subscribe((u) => (user = u));

  $: displayName = user ? user.displayName.split(" ")[0] : "";
</script>

<main>
  <h1>Pets</h1>
  <p>Track pet stuff.</p>

  {#if user}
    <p>Welcome {displayName}</p>
    <button on:click={signOut}>Sign out</button>
  {:else}
    <button on:click={signIn}>Sign in/up with G</button>
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
