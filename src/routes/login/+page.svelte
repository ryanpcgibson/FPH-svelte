<script lang="ts">
    import { auth } from "$lib/firebase";
    import { SignedIn, SignedOut, Doc, Collection } from 'sveltefire';
    import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

    async function signInWithGoogle() {
            const provider = new GoogleAuthProvider();
            const user = await signInWithPopup(auth, provider);
            console.log(user)
        }

</script>

<h2>Login</h2>

<SignedIn let:user let:signOut>
    <p>Hello {user.displayName}</p>
    <button on:click={signOut}>Sign Out</button>
</SignedIn>

<SignedOut let:auth>
    <button on:click={signInWithGoogle}>Sign In</button>
</SignedOut>