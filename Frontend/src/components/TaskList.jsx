import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get(
          "http://localhost:4000/api/tasks/test/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(response);

        setTasks(response.data); // Assuming response.data contains the tasks array
      } catch (error) {
        console.error(
          "Error fetching tasks",
          error.response?.data || error.message
        );
      }
    };

    fetchTasks();
  }, []); // Empty dependency array to run only once when the component mounts

  return (
    <div>
      <h1>Task List</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {task.title} - {task.completed ? "Completed" : "Not Completed"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
