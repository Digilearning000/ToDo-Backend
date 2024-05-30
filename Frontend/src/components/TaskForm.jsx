import axios from "axios";
import React, { useState } from "react";
import TaskList from "./TaskList";

const TaskForm = () => {
  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState(false);
  const handleSubmit = async (e) => {
    console.log(e);
    e.preventDefault();

    const token = localStorage.getItem("token");

    const response = await axios.post(
      "http://localhost:4000/api/tasks/test/",
      {
        title,
        completed,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setTitle("");
    setCompleted(false);

    console.log("response", response);
  };
  return (
    <>
      <h1>ADD TODO</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="checkbox"
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
        />
        <button>Add</button>
      </form>

      <TaskList />
    </>
  );
};

export default TaskForm;
