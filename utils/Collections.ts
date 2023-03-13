import { collection, doc } from "firebase/firestore";
import { db } from "./firebase";

export const ItemsCollection: any = (id?: any) =>
	id ? doc(db, "Inventory", id) : collection(db, "Inventory");
