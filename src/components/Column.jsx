
// I have added the rightElement prop to show add task button beside the title (New only)
const Column = ({ title, children, rightElement, onDrop, onDragOver }) => {

    return (
        <div onDragOver={onDragOver} onDrop={onDrop} className="bg-gray-300 rounded-lg p-4 shadow flex flex-col h-full">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">{title}</h2>
                {rightElement}
            </div>
            <div className="flex flex-col gap-3 overflow-y-auto">
                {children}
            </div>
        </div>
    )
}

export default Column