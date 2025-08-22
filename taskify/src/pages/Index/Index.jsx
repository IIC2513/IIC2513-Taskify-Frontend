import { useState } from "react";
import ProgressBar from "../../components/Progressbar/Progressbar";
import TaskItem from "../../components/Task/Task";
import "./Index.css";

// ===== Usuarios (mock) =====
const USERS = [
  { id: 1, username: "Pepita", password: "123456", level: 3, experience: 65 },
  { id: 2, username: "Pepito", password: "abcdef", level: 2, experience: 20 },
];

const CURRENT_USER_ID = 1;

export default function Index() {
  const [showCompleted, setShowCompleted] = useState(true);

  const currentUser =
    USERS.find((u) => u.id === CURRENT_USER_ID) ?? USERS[0];


  // ===== Tareas (mock) =====
  const TASKS = [
    { id: 1, userId: 1, title: "Configurar proyecto con Vite", description: "Crear app React, limpiar boilerplate, añadir rutas básicas.", status: "pending" },
    { id: 2, userId: 1, title: "Diseñar barra de progreso", description: "XP sube al completar tareas. Nivel 3 → 4 al 100%.", status: "pending" },
    { id: 3, userId: 1, title: "Crear tarjetas de tarea", description: "Title, descripción, acciones editar/eliminar/completar.", status: "pending" },
    { id: 4, userId: 1, title: "Instalar dependencias", description: "React Router, axios, íconos, tipografías.", status: "done" },
    { id: 5, userId: 1, title: "Definir paleta y estilos", description: "Colores, espaciados, radio bordes, sombras.", status: "done" },
    { id: 6, userId: 1, title: "Implementar navegación", description: "Rutas para tareas, login, registro (no funcional).", status: "pending" },
    { id: 7, userId: 1, title: "Añadir barra de progreso", description: "Mostrar progreso del nivel en la página principal.", status: "done" },
    { id: 8, userId: 2, title: "Crear navbar", description: "Enlazar a tareas, login, registro (no funcional).", status: "done" }, // otro user
    { id: 9, userId: 1, title: "Estilizar tarjetas de tarea", description: "Diseñar tarjetas con acciones y estados.", status: "pending" },
  ];

  const userTasks = TASKS.filter(t => t.userId === currentUser.id);
  const pending   = userTasks.filter(t => t.status === "pending");
  const completed = userTasks.filter(t => t.status === "done");

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
            <span className="tasks-hint">(borrador no funcional)</span>
          </div>

          <div className="tasks-grid">
            {/* Grid 1: NO completadas */}
            <div className="tasks-group tasks-group--pending">
              {pending.length ? (
                pending.map(t => (
                  <TaskItem
                    key={t.id}
                    title={t.title}
                    desc={t.description}          
                    done={t.status === "done"}      
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
                        title={t.title}
                        desc={t.description}
                        done={t.status === "done"}
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
      </main>
    </>
  );
}

{/* 
import "./Index.css";
export default function Index() {
  return <>hola</>;
}
*/}
