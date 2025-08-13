// I have added the rightElement prop to show add task button beside the title (New only)
const Column = ({ title, children, rightElement, onDragOver, onDrop }) => {
    return (
        <div
            onDragOver={onDragOver}
            onDrop={onDrop}
            className="rounded-lg p-3 shadow flex flex-col bg-white border border-slate-200 dark:bg-slate-900/60 dark:border-slate-800"
        >
            <div className="flex justify-between items-center mb-3">
                <h2 className="text-sm font-semibold tracking-wide uppercase text-slate-700 dark:text-slate-300">{title}</h2>
                {rightElement}
            </div>
            <div className="flex flex-col gap-2 overflow-y-auto">
                {children}
            </div>
        </div>
    )
}

export default Column