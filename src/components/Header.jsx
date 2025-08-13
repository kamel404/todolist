import ThemeToggle from "./ThemeToggle";

const Header = () => {
  return (
    <header className="px-6 py-4">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <h1 className="text-lg font-bold text-slate-900 dark:text-slate-200">My Todo List</h1>
        <ThemeToggle />
      </div>
    </header>
  )
}

export default Header