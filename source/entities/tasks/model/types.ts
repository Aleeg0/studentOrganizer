export type TaskSubject = {
  id: number;
  name: string;
  color: string;
  icon?: string;
};

export type Task = {
  id: string;
  name: string;
  description: string;
  //subject: TaskSubject;
  deadline: string | null;
};
