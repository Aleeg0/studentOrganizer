import useSWR from "swr";
import { useCallback } from "react";
import { Task } from "./types";

type NewTask = Omit<Task, "id">;

let MOCK_DB: Task[] = [
  {
    id: "1",
    name: "Купить молоко",
    description: "2 пачки 3.2%",
    deadline: "2023-10-25",
  },
  {
    id: "2",
    name: "Сделать код ревью",
    description: "Проверить PR #42",
    deadline: "2023-10-26",
  },
];

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const firebaseFetcher = async (key: string) => {
  console.log(`Fetching ${key}...`);
  await delay(500); // Имитируем загрузку

  // TODO: Позже заменить на:
  // const snapshot = await getDocs(collection(db, 'tasks'));
  // return snapshot.docs.map(...)

  return [...MOCK_DB];
};

export const useTasks = () => {
  const { data, mutate, isLoading, isValidating } = useSWR(
    "tasks",
    firebaseFetcher
  );

  const addTask = useCallback(
    async (newTaskData: NewTask) => {
      const newTask: Task = {
        ...newTaskData,
        id: Math.floor(Math.random() * 100000).toString(),
      };

      await mutate((currentTasks) => [newTask, ...(currentTasks || [])], false);

      await delay(500);
      MOCK_DB.unshift(newTask);

      // TODO: Позже заменить на:
      // await addDoc(collection(db, 'tasks'), newTaskData);

      await mutate();
    },
    [mutate]
  );

  const updateTask = useCallback(
    async (updatedTask: Task) => {
      await mutate((currentTasks) => {
        return currentTasks?.map((t) =>
          t.id === updatedTask.id ? updatedTask : t
        );
      }, false);

      await delay(500);
      MOCK_DB = MOCK_DB.map((t) => (t.id === updatedTask.id ? updatedTask : t));

      // TODO: Позже заменить на:
      // await setDoc(doc(db, 'tasks', String(updatedTask.id)), updatedTask);

      await mutate();
    },
    [mutate]
  );

  const deleteTask = useCallback(
    async (id: Task["id"]) => {
      await mutate((currentTasks) => {
        return currentTasks?.filter((t) => t.id !== id);
      }, false);

      await delay(500);
      MOCK_DB = MOCK_DB.filter((t) => t.id !== id);

      // TODO: Позже заменить на:
      // await deleteDoc(doc(db, 'tasks', String(id)));

      await mutate();
    },
    [mutate]
  );

  return {
    tasks: data,
    isLoading,
    isValidating,
    addTask,
    updateTask,
    deleteTask,
  };
};
