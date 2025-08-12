const TodoCard = ({ title, description, status, onContextMenu }) => {

    const statusColors = {
        "new": "bg-blue-400",
        "ongoing": "bg-orange-400",
        "done": "bg-green-400",
    };

    return (
        <div
            onContextMenu={onContextMenu}
            className={` ${statusColors[status]} rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer`}
        >
            <div className='flex justify-between items-center'>
                <h3 className="font-semibold text-blue-950">{title}</h3>
                {/* <span
                    className={`${statusColors[status]} text-white text-sm px-2 py-1 rounded`}
                >
                    {status}
                </span> */}
            </div>
            {description && (
                <p className="text-sm text-gray-700 mt-1">{description}</p>
            )}
        </div>
    )
}

export default TodoCard