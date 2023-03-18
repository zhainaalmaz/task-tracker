import EditForm from "@/modules/main/edit-task/edit-task";
import { Modal } from "@/shared/ui";
import { useAppDispatch } from "@/store/store";
import { changeTaskStatus, ITask, TaskStates } from "@/store/tasksSlice";
import React, { useMemo, useState } from "react";
import styles from "./task.module.scss";

interface IProps {
  task: ITask;
}

export const Task = ({ task }: any) => {
  const dispatch = useAppDispatch();

  const handleClick = (status: TaskStates) => {
    dispatch(changeTaskStatus({ id: task.id, status }));
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleTaskModal = () => {
    setIsOpen(!isOpen);
  };

  const taskStatus = useMemo(() => {
    let backgroundColor;
    let buttonLabel;
    let nextStep: TaskStates;
    let color;

    switch (task.status) {
      case "new":
        backgroundColor = "white";
        color = "black";
        buttonLabel = "На работу";
        nextStep = "inProgress";
        break;
      case "inProgress":
        backgroundColor = "#02456b";
        color = "white";
        buttonLabel = "Завершить";
        nextStep = "completed";
        break;
      case "completed":
        backgroundColor = "green";
        color = "white";
        buttonLabel = null;
        nextStep = null;
        break;
      case "cancelled":
        backgroundColor = "red";
        color = "white";
        buttonLabel = "Вернуть";
        nextStep = "new";
        break;
      default:
        backgroundColor = "white";
        color = "black";
        buttonLabel = null;
        nextStep = "inProgress";
    }
    return { backgroundColor, buttonLabel, nextStep, color };
  }, [task]);

  return (
    <div
      className={styles.container}
      style={{
        backgroundColor: taskStatus.backgroundColor,
        color: taskStatus.color,
      }}
    >
      <h3 className={styles.taskTitle}>Тема: {task.title}</h3>
      <p className={styles.taskDescription}>Описание: {task.description}</p>
      <p> Создан: {task.createdAt}</p>
      <div>
        {task.status !== "completed" && (
          <div className={styles.buttons}>
            <button
              style={{
                color: taskStatus.color,
                border: `2px solid ${taskStatus.color}`,
              }}
              onClick={() => handleClick(taskStatus.nextStep)}
            >
              {taskStatus.buttonLabel}
            </button>
            {task.status !== "cancelled" && (
              <button
                style={{
                  color: taskStatus.color,
                  border: `2px solid ${taskStatus.color}`,
                }}
                onClick={() => handleClick("cancelled")}
              >
                Отменить
              </button>
            )}
            <button
              style={{
                color: taskStatus.color,
                border: `2px solid ${taskStatus.color}`,
              }}
              onClick={toggleTaskModal}
            >
              Edit
            </button>
          </div>
        )}
      </div>
      {isOpen && (
        <Modal onClose={toggleTaskModal}>
          <EditForm onClose={toggleTaskModal} task={task} />
        </Modal>
      )}
    </div>
  );
};
