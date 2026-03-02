import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/shared/firebase";
import { Task } from "./types";

export type NewTask = Omit<Task, "id">;

const COLLECTION_NAME = "tasks";

export const tasksApi = {
  fetchAll: async (): Promise<Task[]> => {
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as NewTask),
    }));
  },

  create: async (task: NewTask): Promise<string> => {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), task);
    return docRef.id; // Возвращаем ID созданного документа
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
