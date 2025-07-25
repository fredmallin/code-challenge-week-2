import React, { useState } from "react";

export default function TrackerForm({ setGoals }) {
  const [formData, setFormData] = useState({
    name: "",
    targetAmount: "",
    category: "",
    deadline: "",
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newGoal = {
      ...formData,
      id: crypto.randomUUID(),
      savedAmount: 0,
      createdAt: new Date().toISOString().split("T")[0],
    };

    fetch("http://localhost:3000/goals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newGoal),
    })
      .then((res) => res.json())
      .then((data) =>
        setGoals((prevGoals) => [...prevGoals, data])
      );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6">
      <h2 className="text-xl font-semibold mb-2">Add New Goal</h2>
      <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
      <input type="number" name="targetAmount" placeholder="Target Amount" onChange={handleChange} required />
      <input type="text" name="category" placeholder="Category" onChange={handleChange} required />
      <input type="date" name="deadline" onChange={handleChange} required />
      <button type="submit">Add Goal</button>
    </form>
  );
}
