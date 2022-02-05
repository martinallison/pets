<script>
  import SignIn from "./SignIn.svelte";
</script>

<main>
  <h1>Doglog</h1>
  <p>Record the stuff your pet does</p>

  <SignIn />
</main>

<style>
  main {
    margin: 0 auto;
    text-align: center;
  }

  @media (min-width: 640px) {
    main {
      max-width: 68%;
    }
  }
</style>
