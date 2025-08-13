import { useState } from "react";

const TodoCard = ({ title, description, status, id, onContextMenu, onDragStart, dueAt, onSetDueAt }) => {

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

    const [dueInput, setDueInput] = useState(dueAt ? new Date(dueAt).toISOString().slice(0, 16) : "")

    return (
        <div
            onContextMenu={onContextMenu}
            draggable
            onDragStart={(e) => onDragStart?.(e, { id, status })}
            className={`rounded-lg p-3 bg-white border border-slate-200 hover:border-slate-300 dark:bg-slate-800 dark:border-slate-700 dark:hover:border-slate-600 transition-colors cursor-pointer ${accentBorders[status]} border-l-4`}
        >
            <div className='flex justify-between items-center'>
                <h3 className="font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
                <span className={`text-xs rounded-full px-2 py-0.5 ${badgeClasses[status]} dark:${badgeClasses[status]}`}>
                    {status}
                </span>
            </div>
            {description && (
                <p className="text-sm text-slate-700 dark:text-slate-300 mt-1">{description}</p>
            )}

            {status === 'ongoing' && (
                <div className="mt-2 flex items-center gap-2">
                    <input
                        type="datetime-local"
                        className="text-sm px-2 py-1 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                        value={dueInput}
                        onChange={(e) => setDueInput(e.target.value)}
                    />
                    <button
                        className="text-xs px-2 py-1 rounded bg-amber-600 text-white hover:bg-amber-500"
                        onClick={() => onSetDueAt?.(id, dueInput ? new Date(dueInput).toISOString() : null)}
                    >
                        Set Due
                    </button>
                </div>
            )}

            {status === 'ongoing' && dueAt && new Date(dueAt) <= new Date() && (
                <p className="text-xs text-red-600 dark:text-red-400 mt-1">Overdue</p>
            )}

        </div>
    )
}

export default TodoCard