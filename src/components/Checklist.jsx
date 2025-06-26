// src/components/Checklist.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Checklist = () => {
  const [tasks, setTasks] = useState({ physical: [], mental: [], spiritual: [] });
  const [checkedItems, setCheckedItems] = useState({
    physical: [],
    mental: [],
    spiritual: [],
  });
  const navigate = useNavigate();

  useEffect(() => {
    const storedTasks = {
      physical: JSON.parse(localStorage.getItem("physical")) || [],
      mental: JSON.parse(localStorage.getItem("mental")) || [],
      spiritual: JSON.parse(localStorage.getItem("spiritual")) || [],
    };
    setTasks(storedTasks);

    // Initialize checkedItems with false values
    setCheckedItems({
      physical: new Array(storedTasks.physical.length).fill(false),
      mental: new Array(storedTasks.mental.length).fill(false),
      spiritual: new Array(storedTasks.spiritual.length).fill(false),
    });
  }, []);

  const handleCheck = (category, index) => {
    setCheckedItems((prev) => {
      const updated = [...prev[category]];
      updated[index] = !updated[index];
      return { ...prev, [category]: updated };
    });
  };

  const handleSubmit = () => {
    const today = new Date().toISOString().split("T")[0];

    // Save checked items & streak count to localStorage
    const counts = {
      physical: checkedItems.physical.filter(Boolean).length,
      mental: checkedItems.mental.filter(Boolean).length,
      spiritual: checkedItems.spiritual.filter(Boolean).length,
    };

    const todayCount = counts.physical + counts.mental + counts.spiritual;
    const streakLog = JSON.parse(localStorage.getItem("streakLog")) || {};
    streakLog[today] = todayCount;

    localStorage.setItem("completedTasks", JSON.stringify(checkedItems));
    localStorage.setItem("streakLog", JSON.stringify(streakLog));
    localStorage.setItem("lastMarked", today);

    navigate("/progress");
  };

  return (
    <div className="checklist-container">
      <h2>Mark Completed Tasks</h2>
      {["physical", "mental", "spiritual"].map((category) => (
        <div key={category}>
          <h3>{category.charAt(0).toUpperCase() + category.slice(1)} Win</h3>
          {tasks[category]?.map((task, index) => (
            <label key={`${category}_${index}`} style={{ display: "block", marginBottom: "8px" }}>
              <input
                type="checkbox"
                checked={checkedItems[category]?.[index] || false}
                onChange={() => handleCheck(category, index)}
              />
              {" "}{task}
            </label>
          ))}
        </div>
      ))}
      <button onClick={handleSubmit} style={{ marginTop: "1rem" }}>
        Submit Progress
      </button>
    </div>
  );
};

export default Checklist;
