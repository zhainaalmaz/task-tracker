import React, { useState } from "react";
import { addTask, editTask } from "@/store/tasksSlice";
import styles from "./edit-task.module.scss";
import { useAppDispatch } from "@/store/store";

const EditForm = ({ onClose, task }: any) => {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [error, setError] = useState(false);

  const handleSubmit = (event: any) => {
    event.preventDefault();

    if (title.trim() !== "" && description.trim() !== "") {
      dispatch(
        editTask({
          title: title.trim(),
          description: description.trim(),
          id: task.id,
        })
      );
      setTitle("");
      setDescription("");
      onClose();
    } else {
      setError(true);
    }
  };

  const handleBlur = (event: any) => {
    if (event.target.value.trim() === "") {
      setError(true);
    } else {
      setError(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.form_title}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          placeholder="Enter a task title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          onBlur={handleBlur}
        />
      </div>
      {error && title.trim() === "" && (
        <p className={styles.error}>Please enter a title.</p>
      )}
      <div className={styles.form_description}>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          placeholder="Enter a task description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          onBlur={handleBlur}
        />
      </div>
      {error && description.trim() === "" && (
        <p className={styles.error}>Please enter a description.</p>
      )}
      <div className={styles.buttons}>
        <button type="submit">Add Task</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditForm;
