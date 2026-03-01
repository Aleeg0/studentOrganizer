export type TaskSubject = {
  id: number;
  name: string;
  color: string;
  icon?: string;
};

export type Task = {
  id: number;
  name: string;
  description: string;
  subject: TaskSubject;
  deadLine: string;
};
