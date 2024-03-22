<script lang="ts">
    import { getFirebaseContext, SignedIn, SignedOut } from "sveltefire";
    import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

    const { auth } = getFirebaseContext();

    async function signInWithGoogle(auth: any) {
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
    <button on:click={signInWithGoogle(auth)}>Sign In</button>
</SignedOut>