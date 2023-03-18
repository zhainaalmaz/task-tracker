import { ITask, TaskStates } from "@/store/tasksSlice";
import React, { useMemo, useState } from "react";
import { Task } from "../task";
import styles from "./column.module.scss";

interface IColumnProps {
  name: string;
  tasks: ITask[];
  columnName: TaskStates;
}

export const Column = ({ name, tasks, columnName }: IColumnProps) => {
  const filteredData = useMemo(() => {
    return tasks.filter((elem) => elem.status === columnName);
  }, [tasks, columnName]);

  return (
    <div className={styles.content}>
      <div className={styles.content__block}>
        <p className={styles.title}>{name}</p>
        <p className={styles.number}>{filteredData.length}</p>
      </div>
      {filteredData.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </div>
  );
};
