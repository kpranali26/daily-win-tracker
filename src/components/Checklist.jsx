// src/components/Checklist.jsx
import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";


 // 👈 Force reload to fetch new progress & heatmap


const markTaskAsDone = async (category, task, index, isChecked, userId) => {
  const today = new Date().toISOString().split("T")[0]; // yyyy-mm-dd

  await setDoc(doc(db, "users", userId, "completions", today), {
    [category]: {
      [index]: isChecked,
    },
  }, { merge: true });
};
const Checklist = () => {
  const [tasks, setTasks] = useState({ physical: [], mental: [], spiritual: [] });
  const [checked, setChecked] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setTasks(data.tasks || {});
      }
    };

    fetchTasks();
  }, []);

  const handleCheck = (category, index) => {
    const key = `${category}_${index}`;
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }));
  };
   
  const [checkedItems, setCheckedItems] = useState({
  physical: [],
  mental: [],
  spiritual: [],
});

  const handleSubmit = async () => {
  const user = auth.currentUser;
  if (!user) return;

  const today = new Date().toISOString().split("T")[0];

  // Count how many boxes were checked per category
  const counts = {
    physical: checkedItems.physical.filter(Boolean).length,
    mental: checkedItems.mental.filter(Boolean).length,
    spiritual: checkedItems.spiritual.filter(Boolean).length,
  };

  const todayCount = counts.physical + counts.mental + counts.spiritual;

  const docRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(docRef);
  const existingData = docSnap.exists() ? docSnap.data() : {};

  const updatedStreak = {
    ...(existingData.streakLog || {}),
    [today]: todayCount,
  };

  await setDoc(docRef, {
    completed: checkedItems,
    lastMarked: today,
    streakLog: updatedStreak,
  }, { merge: true });

  navigate("/progress");
};

  return (
    <div className="checklist-container">
      <h2>Mark Completed Tasks</h2>
      {["physical", "mental", "spiritual"].map((category) => (
        <div key={category}>
          <h3>{category.charAt(0).toUpperCase() + category.slice(1)} Win</h3>
          {tasks[category]?.map((task, index) => {
            const key = `${category}_${index}`;
            return (
              <label key={key}>
                <input
                  type="checkbox"
                  checked={checked[key] || false}
                  onChange={() => handleCheck(category, index)}
                />
                {task}
              </label>
            );
          })}
        </div>
      ))}
      <button onClick={handleSubmit}>Submit Progress</button>
    </div>
  );
};

export default Checklist;
