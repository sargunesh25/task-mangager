import { useState } from "react";
import "./TodoList.css";
import { Trash2 } from "lucide-react";
import Axios from "axios";
export default function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");

  const addTask = () => {
    if (task.trim() !== "") {
      setTasks([...tasks, task]);
      setTask("");
    }
    signup(task)
  };

  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
    deleteTask(tasks.filter((_, i) => i == index)[0])
  };

  const backend = "http://localhost:5000";

  const signup = (username)=>{

    if (!username) {
      window.alert("Task required!");
      return;
    }
    console.log(username)
    Axios.post(`${backend}/task/post`,{
      task: username
    })
    .then(()=>{
      window.alert("Successfully Registered");
    })
    .catch((error) => {
      window.alert("Sorry! There Was An Error");
      console.error('Error fetching data:', error);
    });
}

const deleteTask = (index) => {
    if (!index) {
      window.alert("Task ID required!");
      return;
    }
  
    console.log(`Deleting task with ID: ${index}`);
  
    Axios.delete(`${backend}/task/delete/${index}`)
      .then(() => {
        window.alert("Task successfully deleted");
      })
      .catch((error) => {
        window.alert("Sorry! There was an error deleting the task");
        console.error("Error deleting task:", error);
      });
  };

  return (
    <div className="todo-container">
      <h1 className="todo-title">To-Do List</h1>
      <div className="todo-input-container">
        <input
          type="text"
          className="todo-input"
          placeholder="Enter a task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button className="todo-button" onClick={addTask} >Add</button>
      </div>
      <ul className="todo-list">
        {tasks.map((t, index) => (
          <li key={index} className="todo-item">
            <span>{t}</span>
            <button className="delete-button" onClick={() => removeTask(index)}>
              <Trash2 className="delete-icon" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
