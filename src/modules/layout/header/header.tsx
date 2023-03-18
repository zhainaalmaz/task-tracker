import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "./header.module.scss";
import TaskForm from "@/modules/main/create-task/create-task";
import { Modal } from "@/shared/ui";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleTaskModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className={styles.wrapper}>
        <h1 className={styles.logo}>Logo</h1>
        <button className={styles.button} onClick={toggleTaskModal}>
          Создать
        </button>
      </div>
      {isOpen && (
        <Modal onClose={toggleTaskModal}>
          <TaskForm onClose={toggleTaskModal} />
        </Modal>
      )}
    </>
  );
};
