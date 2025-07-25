import TrackerItem from "./TrackerItem";

export default function TrackerList({ goals, setGoals }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {goals.map((goal) => (
        <TrackerItem key={goal.id} goal={goal} setGoals={setGoals} />
      ))}
    </div>
  );
}
