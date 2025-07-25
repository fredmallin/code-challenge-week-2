export default function TrackerItem({ goal }) {
  const { name, targetAmount, savedAmount, category, deadline } = goal;
  const progress = Math.min((savedAmount / targetAmount) * 100, 100);

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-bold text-lg">{name}</h3>
      <p>Category: {category}</p>
      <p>Deadline: {deadline}</p>
      <p>Saved: ${savedAmount} / ${targetAmount}</p>
      <div className="w-full bg-gray-200 h-4 rounded mt-2">
        <div
          className="bg-green-500 h-4 rounded"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
