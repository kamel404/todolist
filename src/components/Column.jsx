
const Column = ({ title, children }) => {

    return (
        <div className="bg-gray-300 rounded-lg p-4 shadow flex flex-col h-full">
            <h2 className="text-lg font-bold mb-4">{title}</h2>
            <div className="flex flex-col gap-3 overflow-y-auto">
                {children}
            </div>
        </div>
    )
}

export default Column