import { getAuth, onAuthStateChanged } from "firebase/auth";

export namespace Session {
    export class SessionManager {
        auth = getAuth()

        constructor(private listener: Listener) { }

        initSession() {
            this.listener.onSyncStart();
            onAuthStateChanged(getAuth(), (user) => {
                this.listener.onSyncComplete();
            });
        }
    }

    export interface Listener {
        onSyncStart(): void
        onSyncComplete(): void
    }
}


