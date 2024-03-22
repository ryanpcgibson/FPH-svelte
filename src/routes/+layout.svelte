<script>
    import { FirebaseApp } from 'sveltefire';
    import { auth, firestore } from "$lib/firebase";

    import "../app.css";
</script>

<FirebaseApp {auth} {firestore}>
<div class="min-h-screen flex flex-col">
    <slot />
</div>
</FirebaseApp>x
