import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { Note } from "../data/models/Note";

export namespace ResponseUtil {
    export function toNote(document: QueryDocumentSnapshot<DocumentData>): Note {
        return {
            id: document.id,
            title: document.data()["title"],
            description: document.data()["description"]
        }
    }
}