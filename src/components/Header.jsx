import { Bell, Moon, Sun } from "lucide-react";
import "./Header.css";

function Header({
  darkMode,
  setDarkMode,
  searchTerm,
  setSearchTerm,
  tasks,
  setSelectedTask,
  statusFilter,
  setStatusFilter
}) {

  return (
    <div className="header">
      <div>
        <h2>Welcome Back 👋</h2>
        <p>Here's what's happening with your projects today</p>
      </div>

      <div className="header-actions">

        <div className="search-container">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

            {searchTerm && (
              <div className="search-dropdown">
                {tasks
                  .filter((task) =>
                    task.title
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  )
                  .map((task) => (
                    <div
                      key={task.id}
                      className="search-item"
                      onClick={() => {
                        setSelectedTask(task.title);
                        setSearchTerm("");
                      }}
                    >
                      {task.title}
                    </div>
                  ))}
              </div>
            )}
          </div>

          <select
          className="filter-select"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
          <option value="Overdue">Overdue</option>
        </select>

        <button className="icon-btn notification-btn">
          <Bell size={20} />
          <span className="badge">3</span>
        </button>

        <button
          className="icon-btn"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

      </div>
    </div>
  );
}

export default Header;