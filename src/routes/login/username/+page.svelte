<script lang="ts">
    import { SignedIn, userStore } from "sveltefire";
    import { doc, getDoc, writeBatch } from "firebase/firestore";
    import { user, userData, firestore } from "$lib/firebase";

    let username = "";
    let loading = false;
    let isAvailable = false;

    let debounceTimer: NodeJS.Timeout;

    async function checkAvailability() {
        isAvailable = false;
        clearTimeout(debounceTimer);

        loading = true;

        // debounce - i.e. don't check availability on every keypress, instead wait for 500ms of inactivity
        debounceTimer = setTimeout(async () => {
            console.log("checking availability of", username);

            const ref = doc(firestore, "usernames", username);
            const exists = await getDoc(ref).then((doc) => doc.exists());

            isAvailable = !exists;
            loading = false;
        }, 500);
    }

    async function confirmUsername() {
        const batch = writeBatch(firestore);
        batch.set(doc(firestore, "usernames", username), { uid: $user?.uid });
        batch.set(doc(firestore, "users", $user!.uid), {
            username,
            photoURL: $user?.photoURL ?? null,
            published: true,
            bio: "I am the Walrus",
            links: [
                {
                    title: "Test Link",
                    url: "https://kung.foo",
                    icon: "custom",
                },
            ],
        });
        await batch.commit();

        username = "";
        isAvailable = false;
    }

    const re = /^(?=[a-zA-Z0-9._]{3,16}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    $: isValid =
        username?.length > 2 && username.length < 16 && re.test(username);
    $: isTouched = username.length > 0;
    $: isTaken = isValid && !isAvailable && !loading;
</script>

{#if $userData?.username}
    <p>You ({$userData.displayName}) already have a username, @{$userData.username}</p>
    <p>Do you want to change it?</p>
{/if}
<form class="w-2/5" on:submit|preventDefault={confirmUsername}>
    <input
        type="text"
        placeholder="Username"
        class="input w-full"
        bind:value={username}
        on:input={checkAvailability}
        class:input-error={!isValid && isTouched}
        class:input-warning={isTaken}
        class:input-success={isAvailable && isValid && !loading}
    />

    <div class="my-4 min-h-16 px-8 w-full">
        {#if loading}
            <p class="text-secondary">
                Checking availability of @{username}...
            </p>
        {/if}

        {#if !isValid && isTouched}
            <p class="text-error text-sm">
                must be 3-16 characters long, alphanumeric only
            </p>
        {/if}

        {#if isValid && !isAvailable && !loading}
            <p class="text-warning text-sm">
                @{username} is not available
            </p>
        {/if}

        {#if isAvailable}
            <button class="btn btn-success"
                >Confirm username @{username}
            </button>
        {/if}
    </div>
</form>
