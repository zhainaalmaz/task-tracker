import { FC } from "react";
import { Column } from "@/entities";
import { useAppSelector } from "@/store/store";
import styles from "./task-list.module.scss";

export const TaskList: FC = () => {
  const tasks = useAppSelector((state) => state.tasks);

  return (
    <div className={styles.container}>
      <Column name="Новое" tasks={tasks} columnName="new" />
      <Column name="В процессе" tasks={tasks} columnName="inProgress" />
      <Column name="Отменённые" tasks={tasks} columnName="cancelled" />
      <Column name="Завершённые" tasks={tasks} columnName="completed" />
    </div>
  );
};
