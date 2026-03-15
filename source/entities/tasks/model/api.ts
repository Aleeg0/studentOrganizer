import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "@/shared/firebase";
import { Task } from "./types";

export type NewTask = Omit<Task, "id">;

const COLLECTION_NAME = "tasks";

const getUid = () => {
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error("User is not authenticated");
  return uid;
};

export const tasksApi = {
  fetchAll: async (): Promise<Task[]> => {
    const uid = getUid();

    const querySnapshot = await getDocs(
      query(collection(db, COLLECTION_NAME), where("userId", "==", uid))
    );

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as NewTask),
    }));
  },

  create: async (task: NewTask): Promise<string> => {
    const uid = getUid();

    const taskWithUser = {
      ...task,
      userId: uid,
    };

    const docRef = await addDoc(collection(db, COLLECTION_NAME), taskWithUser);
    return docRef.id;
  },

  update: async (task: Task): Promise<void> => {
    const taskRef = doc(db, COLLECTION_NAME, task.id);
    const { id, ...dataToUpdate } = task;
    await updateDoc(taskRef, dataToUpdate);
  },

  remove: async (id: string): Promise<void> => {
    const taskRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(taskRef);
  },
};
