import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home">
      <h1>Welcome to Daily Win Tracker</h1>
      <p>Track your three wins each day: Physical, Mental, and Spiritual</p>

      <div style={{ display: "flex", gap: "1rem" }}>
        <button onClick={() => navigate("/add-task?type=physical")}>Add Physical Task</button>
        <button onClick={() => navigate("/add-task?type=mental")}>Add Mental Task</button>
        <button onClick={() => navigate("/add-task?type=spiritual")}>Add Spiritual Task</button>
      </div>

      <br />
      <button onClick={() => navigate("/checklist")}>Go to Checklist</button>
      <button onClick={() => navigate("/progress")}>View Progress</button>
    </div>
  );
};

export default Home;
