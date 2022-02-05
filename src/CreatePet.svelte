<script>
  import { firstValueFrom } from "rxjs";
  import { useNavigate } from "svelte-navigator";
  import { user } from "./auth";
  import { createPet } from "./pets";

  const navigate = useNavigate();

  let name;
  let submitting;

  const submit = async () => {
    submitting = true;

    try {
      await firstValueFrom(createPet(name, $user.uid));
    } catch (e) {
      submitting = false;
      return;
    }

    submitting = false;
    navigate("/");
  };
</script>

<form on:submit|preventDefault={submit}>
  <label for="name">Name</label>
  <input id="name" type="text" bind:value={name} />

  <button type="submit" class="btn btn-primary" disabled={submitting}
    >Add pet</button
  >
</form>
