import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import ProgressBar from "../../components/Progressbar/Progressbar";
import TaskItem from "../../components/Task/Task";
import TaskForm from "../../components/Task/TaskForm";
import "./Index.css";
import axios from "axios";

export default function Index() {
  const [showCompleted, setShowCompleted] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(() => {
  const stored = localStorage.getItem("user");
  return stored ? JSON.parse(stored) : null;
});

  // Carga las tareas del usuario actual
  useEffect(() => {
    if (!currentUser) {
      // Si no hay sesión -> volver al login
      navigate("/login");
      return;
    }
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/tasks/${currentUser.id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        // Mapea las tareas para cambiar "ACTIVE" a "pending"
        const tasksWithPending = response.data.map(task => {
        if (task.status === "ACTIVE") {
          return { ...task, status: "pending" };
        }
        return task;
        });

        setTasks(tasksWithPending);
        console.log("Tareas cargadas:", response.data);
      } catch (error) {
        console.error("Error al cargar tareas:", error);
      }
    };

    fetchTasks();
  }, [currentUser, navigate]);


if (!currentUser) return null; 
  // Añade una nueva tarea
const handleAddTask = async (newTask) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/tasks`,
      newTask
    );

    const taskWithPending =
      response.data.status === "ACTIVE"
        ? { ...response.data, status: "pending" }
        : response.data;

    // Esto actualiza el estado inmediatamente, sin refrescar
    setTasks((prev) => [...prev, taskWithPending]);
  } catch (error) {
    console.error("Error al agregar tarea:", error);
  }
};

// Actualiza tarea en el estado local
const handleUpdateTask = (updatedTask) => {
  setTasks((prevTasks) =>
    prevTasks.map((t) => (t.id === updatedTask.id ? { ...t, ...updatedTask } : t))
  );
};

// Elimina tarea en el estado local
const handleDeleteTask = (taskId) => {
  setTasks((prevTasks) => prevTasks.filter((t) => t.id !== taskId));
};

  const pending = tasks.filter(t => t.status === "pending");
  const completed = tasks.filter(t => t.status === "COMPLETED");

  return (
    <>
      <main className="home">
        <section className="welcome-card">
          <header className="welcome-head">
            <div className="welcome-title">
              <h1>
                ¡Bienvenido,<span className="muted"> {currentUser.username} </span>!
              </h1>
              <span className="badge">Nivel {currentUser.level}</span>
            </div>

            <button className="fab-btn" onClick={() => setIsModalOpen(true)}>
              Crear tarea
            </button>

            <button
              type="button"
              className="pill-btn"
              aria-pressed={showCompleted}
              aria-controls="completed-grid"
              onClick={() => setShowCompleted((s) => !s)}
            >
              {showCompleted ? "Ocultar completadas" : `Mostrar completadas (${completed.length})`}
            </button>
          </header>

          <div className="panel">
            <ProgressBar value={currentUser.experience} label="Progreso del nivel" />
          </div>
        </section>

        <section className="tasks">
          <div className="tasks-head">
            <h2 className="tasks-title">Tus tareas</h2>
          </div>

          <div className="tasks-grid">
            {/* Grid 1: NO completadas */}
            <div className="tasks-group tasks-group--pending">
              {pending.length ? (
                pending.map(t => (
                  <TaskItem
                    key={t.id}
                    id={t.id}                    
                    title={t.title}
                    desc={t.description}
                    done={t.status === "COMPLETED"}
                    onChange={(updatedTask) => handleUpdateTask(updatedTask)}
                    onDelete={(id) => handleDeleteTask(id)}
                    userId={currentUser.id}    
                  />
                ))
              ) : (
                <p className="tasks-empty">No tienes tareas pendientes 🎉</p>
              )}
            </div>

            {/* Grid 2: Completadas (toggle) */}
            {showCompleted && (
              completed.length > 0 ? (
                <>
                  <div id="completed-grid" className="tasks-group tasks-group--done">
                    {completed.map(t => (
                      <TaskItem
                        key={t.id}
                        id={t.id}
                        title={t.title}
                        desc={t.description}
                        done={t.status === "COMPLETED"}
                        onDelete={(id) => handleDeleteTask(id)}
                        userId={currentUser.id}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <p className="tasks-empty">No tienes tareas completadas 😞</p>
              )
            )}
          </div>
        </section>

        {/* Modal */}
        <TaskForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddTask}
        currentUserId={currentUser.id}
        />
      </main>
    </>
  );
}
