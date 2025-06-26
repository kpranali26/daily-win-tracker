// src/components/Progress.jsx
import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import StreakCalendar from "./StreakCalendar";
import "react-circular-progressbar/dist/styles.css";

const Progress = () => {
  const [percentages, setPercentages] = useState({
    physical: 0,
    mental: 0,
    spiritual: 0,
  });

  useEffect(() => {
    const updated = {};

    ["physical", "mental", "spiritual"].forEach((cat) => {
      const tasks = JSON.parse(localStorage.getItem(cat)) || [];
      const completed = JSON.parse(localStorage.getItem("completedTasks")) || {};
      const checked = completed[cat] || [];

      const total = tasks.length;
      const done = checked.filter((v) => v).length;

      updated[cat] = total > 0 ? Math.round((done / total) * 100) : 0;
    });

    setPercentages(updated);
  }, []);

  const colors = {
    physical: "#4caf50",   // green
    mental: "#2196f3",     // blue
    spiritual: "#ff9800",  // orange
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2 style={{ textAlign: "center" }}>Today's Progress</h2>

      <div style={{ display: "flex", gap: "2rem", justifyContent: "center", marginTop: "2rem" }}>
        {["physical", "mental", "spiritual"].map((cat) => (
          <div key={cat} style={{ width: 150, textAlign: "center" }}>
            <CircularProgressbar
              value={percentages[cat]}
              text={`${percentages[cat]}%`}
              styles={buildStyles({
                pathColor: colors[cat],
                textColor: "#333",
                trailColor: "#eee",
              })}
            />
            <p>{cat.toUpperCase()}</p>
          </div>
        ))}
      </div>

      <h2 style={{ textAlign: "center", marginTop: "3rem" }}>Streak Calendar</h2>
      <StreakCalendar />
    </div>
  );
};

export default Progress;
