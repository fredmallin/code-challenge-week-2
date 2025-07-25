import React, { useState } from "react";

export default function DepositForm({ goals, setGoals }) {
  const [depositData, setDepositData] = useState({
    goalId: "",
    amount: ""
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setDepositData({ ...depositData, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const goal = goals.find((g) => g.id === depositData.goalId);
    if (!goal) return;

    const newAmount = parseFloat(depositData.amount);
    const updatedGoal = {
      ...goal,
      savedAmount: goal.savedAmount + newAmount
    };

    fetch(`http://localhost:3000/goals/${goal.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ savedAmount: updatedGoal.savedAmount })
    })
      .then((res) => res.json())
      .then((data) => {
        setGoals((prevGoals) =>
          prevGoals.map((g) => (g.id === data.id ? data : g))
        );
        setDepositData({ goalId: "", amount: "" });
      });
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6">
      <h2 className="text-xl font-semibold mb-2">Make a Deposit</h2>

      <select
        name="goalId"
        value={depositData.goalId}
        onChange={handleChange}
        required
        className="block w-full p-2 mb-2 border"
      >
        <option value="">Select Goal</option>
        {goals.map((goal) => (
          <option key={goal.id} value={goal.id}>
            {goal.name}
          </option>
        ))}
      </select>

      <input
        type="number"
        name="amount"
        value={depositData.amount}
        onChange={handleChange}
        placeholder="Deposit Amount"
        required
        className="block w-full p-2 mb-2 border"
      />

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Deposit
      </button>
    </form>
  );
}
