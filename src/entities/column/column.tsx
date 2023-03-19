import { ITask, TaskStates } from "@/store/tasksSlice";
import React, { useMemo } from "react";
import { Task } from "../task";
import styles from "./column.module.scss";

interface ColumnProps {
  name: string;
  tasks: ITask[];
  columnName: TaskStates;
}

export const Column: React.FC<ColumnProps> = ({ name, tasks, columnName }) => {
  const filteredTasks: ITask[] = useMemo(() => {
    return tasks.filter((task: ITask) => task.status === columnName);
  }, [tasks, columnName]);

  return (
    <div className={styles.content}>
      <div className={styles.content__block}>
        <p className={styles.title}>{name}</p>
        <p className={styles.number}>{filteredTasks.length}</p>
      </div>
      {filteredTasks.map((task: ITask) => (
        <Task key={task.id} task={task} />
      ))}
    </div>
  );
};
