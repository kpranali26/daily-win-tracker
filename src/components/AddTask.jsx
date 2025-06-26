// src/components/AddTask.jsx
import React, { useState } from "react";
import { db, auth } from "../firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const AddTask = () => {
  const [tasks, setTasks] = useState({
    physical: "",
    mental: "",
    spiritual: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setTasks({ ...tasks, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) return;

    const taskData = {
      physical: tasks.physical.split(",").map((t) => t.trim()),
      mental: tasks.mental.split(",").map((t) => t.trim()),
      spiritual: tasks.spiritual.split(",").map((t) => t.trim()),
    };

    await setDoc(doc(db, "users", user.uid), { tasks: taskData }, { merge: true });
    navigate("/checklist");
  };

  return (
    <div className="add-task-container">
      <h2>Add Daily Tasks</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="physical"
          placeholder="Physical tasks (comma separated)"
          value={tasks.physical}
          onChange={handleChange}
        />
        <input
          name="mental"
          placeholder="Mental tasks"
          value={tasks.mental}
          onChange={handleChange}
        />
        <input
          name="spiritual"
          placeholder="Spiritual tasks"
          value={tasks.spiritual}
          onChange={handleChange}
        />
        <button type="submit">Save & Go to Checklist</button>
      </form>
    </div>
  );
};

export default AddTask;
