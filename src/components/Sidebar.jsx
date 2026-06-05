import {
  Home,
  CheckSquare,
  BarChart3,
  Calendar,
  FileText,
  Settings,
  ChevronDown,
} from "lucide-react";

function Sidebar() {
  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="logo-icon">⬚</div>
        <h2>Dashly</h2>
      </div>

      {/* Menu */}
      <ul className="sidebar-menu">
        <li className="active">
          <Home size={18} />
          Dashboard
        </li>

        <li>
          <CheckSquare size={18} />
          Tasks
        </li>

        <li>
          <BarChart3 size={18} />
          Analytics
        </li>

        <li>
          <Calendar size={18} />
          Calendar
        </li>

        <li>
          <FileText size={18} />
          Reports
        </li>

        <li>
          <Settings size={18} />
          Settings
        </li>
      </ul>

      {/* User */}
      <div className="sidebar-user">
        <div className="avatar">JD</div>

        <div className="user-info">
          <h4>John Doe</h4>
          <p>Admin</p>
        </div>

        <ChevronDown size={16} />
      </div>
    </aside>
  );
}

export default Sidebar;