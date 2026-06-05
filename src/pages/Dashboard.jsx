import { useEffect, useState } from "react";
import api from "../services/api";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import "./Dashboard.css";
import {
  ClipboardList,
  Hourglass,
  CheckCircle,
  CalendarDays,
  AlertTriangle,
} from "lucide-react";


function Dashboard() {

  const [darkMode, setDarkMode] = useState(false);

  const [tasks, setTasks] = useState([
    {
      _id: 1,
      title: "Design Dashboard UI",
      priority: "High",
      dueDate: "2026-06-05",
      status: "Completed",
    },
    {
      _id: 2,
      title: "Connect Backend API",
      priority: "Medium",
      dueDate: "2026-06-08",
      status: "Pending",
    },
    {
      _id: 3,
      title: "Add Dark Mode",
      priority: "Low",
      dueDate: "2026-06-05",
      status: "Pending",
    },
    {
      _id: 4,
      title: "Dashboard settings",
      priority: "High",
      dueDate: "2026-06-02",
      status: "Overdue",
    },
        {
      _id: 5,
      title: "Profile settings",
      priority: "Low",
      dueDate: "2026-06-01",
      status: "Completed",
    },
  ]);


  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await api.get("/tasks");
        console.log(res.data);
        setTasks(res.data.tasks);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTasks();
  }, []);

  const totalTasks = tasks.length;

  const pendingTasks = tasks.filter(
      task => task.status === "Pending"
    ).length;

  const completedTasks = tasks.filter(
      task => task.status === "Completed"
    ).length;

  const overdueTasks = tasks.filter(
      task => task.status === "Overdue"
    ).length;

  const [showModal, setShowModal] = useState(false);

  const [newTask, setNewTask] = useState({
    title: "",
    priority: "Medium",
    dueDate: "",
    status: "Pending",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTask, setSelectedTask] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredTasks =
    statusFilter === "All"
      ? tasks
      : tasks.filter(
          (task) => task.status === statusFilter
        );

  const [visibleTasks, setVisibleTasks] = useState(4);

  return (
    <div className={darkMode ? "dashboard-layout dark" : "dashboard-layout"}>
      <Sidebar />

      <div className="main-content">
        <Header
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          tasks={tasks}
          setSelectedTask={setSelectedTask}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />

        <div className="dashboard">
          <div className="stats-container">
            <div className="stat-card">
              <div className="stat-header">
                <div className="stat-icon total-icon">
                  <ClipboardList size={20} />
                </div>

                <div>
                  <h3>Total Tasks</h3>
                  <h2>{totalTasks}</h2>
                </div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-header">
                <div className="stat-icon pending-icon">
                  <Hourglass size={20} />
                </div>

                <div>
                  <h3>Pending</h3>
                  <h2>{pendingTasks}</h2>
                </div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-header">
                <div className="stat-icon completed-icon">
                  <CheckCircle size={20} />
                </div>

                <div>
                  <h3>Completed</h3>
                  <h2>{completedTasks}</h2>
                </div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-header">
                <div className="stat-icon overdue-icon">
                  <AlertTriangle size={20} />
                </div>

                <div>
                  <h3>Overdue</h3>
                  <h2>{overdueTasks}</h2>
                </div>
              </div>
            </div>

          </div>

        </div>

        <div className="task-summary-container">

            {/* Left Side */}
            <div className="task-section">

              <div className="task-header">
                <h2 className="task-heading">Recent Tasks</h2>

                <button
                  className="new-task-btn"
                  onClick={() => setShowModal(true)}
                >
                  + New Task
                </button>
              </div>

              <table className="task-table">
                <thead>
                  <tr>
                    <th>Task</th>
                    <th>Priority</th>
                    <th>Due Date</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
              
                  {filteredTasks.slice(0, visibleTasks).map((task) => (
                    <tr
                      key={task._id}
                      className={
                        selectedTask === task.title
                          ? "highlight-row"
                          : ""
                      }
                    >         
                      <td>{task.title}</td>
                      <td>
                        <span
                          className={`priority-badge ${task.priority.toLowerCase()}`}
                        >
                          {task.priority}
                        </span>
                      </td>
                      <td>
                          <div className="date-cell">
                            <CalendarDays size={16} />
                            <span>
                              {new Date(task.dueDate).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </span>
                          </div>
                        </td>
                        <td>
                          <span
                            className={`status-badge ${task.status.toLowerCase()}`}
                          >
                            {task.status}
                          </span>
                        </td>
                    </tr>
                  ))}

                  {showModal && (
                    <div className="modal-overlay">
                      <div className="modal">
                        <h3>Create New Task</h3>

                        <input
                          type="text"
                          placeholder="Task Name"
                          value={newTask.title}
                          onChange={(e) =>
                            setNewTask({
                              ...newTask,
                              title: e.target.value,
                            })
                          }
                        />

                        <select
                          value={newTask.priority}
                          onChange={(e) =>
                            setNewTask({
                              ...newTask,
                              priority: e.target.value,
                            })
                          }
                        >
                          <option>High</option>
                          <option>Medium</option>
                          <option>Low</option>
                        </select>

                        <input
                          type="date"
                          value={newTask.dueDate}
                          onChange={(e) =>
                            setNewTask({
                              ...newTask,
                              dueDate: e.target.value,
                            })
                          }
                        />

                        <select
                          value={newTask.status}
                          onChange={(e) =>
                            setNewTask({
                              ...newTask,
                              status: e.target.value,
                            })
                          }
                        >
                          <option>Pending</option>
                          <option>Completed</option>
                          <option>Overdue</option>
                        </select>

                        <div className="modal-actions">
                          <button
                            className="cancel-btn"
                            onClick={() => setShowModal(false)}
                          >
                            Cancel
                          </button>

                          <button
                            className="save-btn"
                            onClick={() => {
                              setTasks([
                                ...tasks,
                                {
                                  _id: Date.now(),
                                  ...newTask,
                                },
                              ]);

                              setShowModal(false);

                              setNewTask({
                                title: "",
                                priority: "Medium",
                                dueDate: "",
                                status: "Pending",
                              });
                            }}
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                </tbody>
              </table>

                {visibleTasks < filteredTasks.length && (
                  <div
                    className="load-more-container"
                    onClick={() => setVisibleTasks((prev) => prev + 4)}
                  >
                    <div className="loader"></div>
                    <span>Load more tasks...</span>
                  </div>
                )}

            </div>

            {/* Right Side */}
            <div className="summary-card">
              <h3>Summary</h3>

              <div className="summary-circle">
                <div className="summary-center">
                  <h2>{totalTasks}</h2>
                  <span>Total</span>
                </div>
              </div>

              <div className="summary-list">
                <div>
                  <span className="dot done"></span>
                  Completed
                  <strong>{completedTasks}</strong>
                </div>

                <div>
                  <span className="dot pending"></span>
                  Pending
                  <strong>{pendingTasks}</strong>
                </div>

                <div>
                  <span className="dot overdue"></span>
                  Overdue
                  <strong>{overdueTasks}</strong>
                </div>
              </div>
            </div>

        </div>

      </div>
    </div>
  );
}

export default Dashboard;