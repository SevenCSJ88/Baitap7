import React, { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all");

  const addTask = () => {
    if (newTask.trim() === "") return;

    if (!tasks.includes(newTask)) {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const deleteTask = (taskText) => {
    const updatedTasks = tasks.filter((task) => task.text !== taskText);
    setTasks(updatedTasks);
  };

  const toggleTaskStatus = (taskText) => {
    const updatedTasks = tasks.map((task) => {
      if (task.text === taskText) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const filteredTasks =
    filter === "active"
      ? tasks.filter((task) => !task.completed)
      : filter === "completed"
      ? tasks.filter((task) => task.completed)
      : tasks;

  return (
    <div className="App">
      <h1>To do list</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
      </div>
      <div className="buttons">
        <div className="buttons-task">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("active")}>Active</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
        </div>
        <button className="add-btn" onClick={addTask}>Add</button>
      </div>
      <ul className="TaskList">
        {filteredTasks.map((task) => (
          <li
            key={task.text}
            className={`TaskItem ${task.completed ? "completed" : ""}`}
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTaskStatus(task.text)}
            />
            <span>{task.text}</span>
            <button className="delete-btn" onClick={() => deleteTask(task.text)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
