import React, { useState, useEffect } from "react";
import TrackerForm from "./components/TrackerForm";
import TrackerList from "./components/TrackerList";
import DepositForm from "./components/DepositForm";
import Overview from "./components/Overview";


function App() {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/goals")
      .then((res) => res.json())
      .then((data) => setGoals(data));
  }, []);

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-6">Smart Goal Planner</h1>
      <TrackerForm setGoals={setGoals} />
      <DepositForm goals={goals} setGoals={setGoals} />
      <Overview goals={goals} />
      <TrackerList goals={goals} setGoals={setGoals} />
    </div>
  );
}

export default App;