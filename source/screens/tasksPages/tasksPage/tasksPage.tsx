import { useState } from "react";
import { Host, Label, List, Section } from "@expo/ui/swift-ui";
import {
  listSectionMargins,
  listSectionSpacing,
  tag,
} from "@expo/ui/swift-ui/modifiers";

type Task = { id: string; title: string };

const INITIAL_TASKS: Task[] = [
  { id: "1", title: "Task 1" },
  { id: "2", title: "Task 2" },
  { id: "3", title: "Task 3" },
  { id: "4", title: "Task 4" },
];

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleDelete = (indices: number[]) => {
    setTasks((prev) => prev.filter((_, i) => !indices.includes(i)));
  };

  return (
    <Host style={{ flex: 1 }}>
      <List
        selection={selectedIds}
        onSelectionChange={(ids) => setSelectedIds(ids.map(String))}
      >
        <Section
          title="Tasks"
          modifiers={[listSectionMargins(), listSectionSpacing(2)]}
        >
          <List.ForEach onDelete={handleDelete}>
            {tasks.map((task) => (
              <Label
                key={task.id}
                title={task.title}
                modifiers={[tag(task.id)]}
              />
            ))}
          </List.ForEach>
        </Section>
      </List>
    </Host>
  );
}
