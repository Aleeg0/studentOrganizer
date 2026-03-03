export type Task = {
  id: string;
  name: string;
  description: string;
  deadlineDate: string | null;
  deadlineTime: string | null;
  reminder: number;
  notificationId: string | null;
};
