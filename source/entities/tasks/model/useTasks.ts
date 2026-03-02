import useSWR from "swr";
import { useCallback } from "react";
import { Task } from "./types";
import { NewTask, tasksApi } from "./api";

export const useTasks = () => {
  const { data, mutate, isLoading, isValidating } = useSWR(
    "tasks",
    tasksApi.fetchAll
  );

  const addTask = useCallback(
    async (newTaskData: NewTask) => {
      const tempId = Date.now().toString();
      const optimisticTask: Task = { id: tempId, ...newTaskData };

      await mutate(
        (currentTasks) => [optimisticTask, ...(currentTasks || [])],
        false
      );

      try {
        await tasksApi.create(newTaskData);
        await mutate();
      } catch (error) {
        console.error("Error adding task:", error);
        await mutate();
      }
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

      try {
        await tasksApi.update(updatedTask);
        await mutate();
      } catch (error) {
        console.error("Error updating task:", error);
        await mutate();
      }
    },
    [mutate]
  );

  const deleteTask = useCallback(
    async (id: Task["id"]) => {
      await mutate((currentTasks) => {
        return currentTasks?.filter((t) => t.id !== id);
      }, false);

      try {
        await tasksApi.remove(id);
        await mutate();
      } catch (error) {
        console.error("Error deleting task:", error);
        await mutate();
      }
    },
    [mutate]
  );

  const refresh = useCallback(async () => {
    await mutate();
  }, [mutate]);

  return {
    tasks: data,
    isLoading,
    isValidating,
    addTask,
    updateTask,
    deleteTask,
    refresh,
  };
};
