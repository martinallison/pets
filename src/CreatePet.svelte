<script>
  import { useNavigate } from "svelte-navigator";
  import { user } from "./auth";
  import { createPet } from "./pets";

  const navigate = useNavigate();

  let name;
  let submitting;

  const submit = async () => {
    submitting = true;
    await createPet(name, $user.uid);
    submitting = false;
    navigate("/");
  };
</script>

<form on:submit|preventDefault={submit}>
  <label for="name">Name</label>
  <input id="name" type="text" bind:value={name} />

  <button type="submit"
    >{#if submitting}Submitting{:else}Add pet{/if}</button
  >
</form>
