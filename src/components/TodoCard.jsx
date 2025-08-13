const TodoCard = ({ title, description, status, id, onContextMenu, onDragStart }) => {

    const accentBorders = {
        new: "border-blue-500/70",
        ongoing: "border-amber-500/70",
        done: "border-emerald-500/70",
    };

    const badgeClasses = {
        new: "bg-blue-500/10 text-blue-300 border border-blue-500/20",
        ongoing: "bg-amber-500/10 text-amber-300 border border-amber-500/20",
        done: "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20",
    };

    return (
        <div
            onContextMenu={onContextMenu}
            draggable
            onDragStart={(e) => onDragStart?.(e, {id, status})}
            className={`rounded-lg p-3 bg-slate-800 border border-slate-700 hover:border-slate-600 transition-colors cursor-pointer ${accentBorders[status]} border-l-4`}
        >
            <div className='flex justify-between items-center'>
                <h3 className="font-semibold text-slate-100">{title}</h3>
                <span className={`text-xs rounded-full px-2 py-0.5 ${badgeClasses[status]}`}>
                    {status}
                </span>
            </div>
            {description && (
                <p className="text-sm text-slate-300 mt-1">{description}</p>
            )}
        </div>
    )
}

export default TodoCard