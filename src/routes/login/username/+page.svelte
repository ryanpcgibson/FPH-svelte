<script lang="ts">
    import { getFirebaseContext, SignedIn, userStore } from "sveltefire";
    import { doc, getDoc, writeBatch } from "firebase/firestore";
    // const { auth, firestore } = getFirebaseContext();
    import { auth, firestore } from "$lib/firebase";

    const user = userStore(auth);
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
</script>

<SignedIn let:user>
    <h2>Username</h2>
    <form class="w-2/5" on:submit|preventDefault={confirmUsername}>
        <input
            type="text"
            placeholder="Username"
            class="input w-full"
            bind:value={username}
            on:input={checkAvailability}
        />

        <p>Is available? {isAvailable}</p>

        <button class="btn btn-success">Confirm username @{username} </button>
    </form>
</SignedIn>
