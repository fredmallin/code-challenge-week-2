import React from "react";

export default function Overview({ goals }) {
  const today = new Date();

  const totalGoals = goals.length;

  const totalSaved = goals.reduce(
    (total, goal) => total + goal.savedAmount,
    0
  );

  const completedGoals = goals.filter(
    (goal) => goal.savedAmount >= goal.targetAmount
  );

  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <h2 className="text-xl font-semibold mb-4">Overview</h2>

      <p><strong>Total Goals:</strong> {totalGoals}</p>
      <p><strong>Total Saved:</strong> ${totalSaved}</p>
      <p><strong>Completed Goals:</strong> {completedGoals.length}</p>

      <div className="mt-4">
        <h3 className="font-semibold mb-2">Deadlines</h3>
        {goals.map((goal) => {
          const deadline = new Date(goal.deadline);
          const diffTime = deadline - today;
          const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          const isCompleted = goal.savedAmount >= goal.targetAmount;
          const isOverdue = !isCompleted && daysLeft < 0;
          const isNear = !isCompleted && daysLeft > 0 && daysLeft <= 30;

          return (
            <div key={goal.id} className="mb-2">
              <p className="font-medium">{goal.name}</p>
              {isCompleted && (
                <span className="text-green-600">Goal Completed</span>
              )}
              {isOverdue && (
                <span className="text-red-500 font-semibold">
                  Overdue - deadline was {goal.deadline}
                </span>
              )}
              {isNear && (
                <span className="text-yellow-600">
                  {daysLeft} days left until deadline
                </span>
              )}
              {!isOverdue && !isNear && !isCompleted && (
                <span className="text-gray-600">
                  {daysLeft} days remaining
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
