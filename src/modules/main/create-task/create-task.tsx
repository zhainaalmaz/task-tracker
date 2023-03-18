import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "@/store/tasksSlice";
import styles from "./create-task.module.scss";

const TaskForm = ({ onClose }: any) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (event: any) => {
    event.preventDefault();

    if (title.trim() !== "" && description.trim() !== "") {
      dispatch(
        addTask({
          title: title.trim(),
          description: description.trim(),
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

export default TaskForm;
