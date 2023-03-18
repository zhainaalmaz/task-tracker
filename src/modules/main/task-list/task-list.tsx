import { Column } from "@/entities";
import { useAppSelector } from "@/store/store";
import style from "./task-list.module.scss";

export const TaskList = () => {
  const tasks = useAppSelector((state) => state.tasks);

  return (
    <div className={style.container}>
      <Column name="Новое" tasks={tasks} columnName="new" />
      <Column name="В процессе" tasks={tasks} columnName="inProgress" />
      <Column name="Отменённые" tasks={tasks} columnName="cancelled" />
      <Column name="Завершённые" tasks={tasks} columnName="completed" />
    </div>
  );
};
