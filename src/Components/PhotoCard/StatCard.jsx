export default function StatCard({ value, label }) {
  return (
    <div className="bg-blue-100 text-center p-4 rounded">
      <h2 className="text-3xl font-bold">{value}</h2>
      <p>{label}</p>
    </div>
  );
}
