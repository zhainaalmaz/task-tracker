import React, { useMemo, useState } from "react";
import EditForm from "@/modules/main/edit-task/edit-task";

import { Button, Modal } from "@/shared/ui";
import { useAppDispatch } from "@/store/store";
import { changeTaskStatus, ITask, TaskStates } from "@/store/tasksSlice";
import styles from "./task.module.scss";
import { getTaskStatusStyles } from "@/shared/lib";

interface TaskProps {
  task: ITask;
}

export const Task: React.FC<TaskProps> = ({ task }) => {
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { backgroundColor, color, buttonLabel, nextStep } = useMemo(
    () => getTaskStatusStyles(task.status),
    [task.status]
  );

  const handleTaskClick = (status: TaskStates) => {
    dispatch(changeTaskStatus({ id: task.id, status }));
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const canEditTask = task.status === "new" || task.status === "inProgress";

  const containerStyles = { backgroundColor, color };

  return (
    <div className={styles.container} style={containerStyles}>
      <h3 className={styles.taskTitle}>Тема: {task.title}</h3>
      <p className={styles.taskDescription}>Описание: {task.description}</p>
      <p> Создан: {task.createdAt}</p>
      {task.completedAt && <p> Завершен: {task.completedAt}</p>}
      {task.cancelledAt && <p> Отменен: {task.cancelledAt}</p>}

      {task.status !== "completed" && (
        <div className={styles.buttons}>
          <Button
            label={buttonLabel}
            color={color}
            borderColor={color}
            onClick={() => handleTaskClick(nextStep)}
          />
          {task.status !== "cancelled" && (
            <Button
              label="Отменить"
              color={color}
              borderColor={color}
              onClick={() => handleTaskClick("cancelled")}
            />
          )}
          {canEditTask && (
            <Button
              label="Edit"
              color={color}
              borderColor={color}
              onClick={toggleModal}
            />
          )}
        </div>
      )}

      {isModalOpen && (
        <Modal onClose={toggleModal}>
          <EditForm onClose={toggleModal} task={task} />
        </Modal>
      )}
    </div>
  );
};

export default Task;
