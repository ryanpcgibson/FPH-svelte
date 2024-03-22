<script>
    import "../app.css";
    import { FirebaseApp } from "sveltefire";
    import { auth, firestore, storage } from "$lib/firebase";

</script>

<FirebaseApp {auth} {firestore} {storage}>
    <div class="min-h-screen flex flex-col">
        <slot />
    </div>
</FirebaseApp>
