export default function GoalNode({ node, selected, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`w-52 rounded-2xl border-2 p-3 bg-white shadow-sm cursor-pointer transition-all
        ${selected ? "border-rose-500" : "border-gray-200"}`}
    >
      <p className="text-xs font-bold text-slate-700">{node.title}</p>
      <p className="text-[11px] text-slate-400 mt-2">
        {node.description}
      </p>

      {node.count !== undefined && (
        <p className="text-[10px] text-rose-400 mt-1 font-semibold">
          {node.count} leads
        </p>
      )}
    </div>
  );
}