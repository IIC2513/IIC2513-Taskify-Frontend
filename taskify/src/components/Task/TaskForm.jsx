import { useState } from "react";
import "./TaskForm.css";

export default function TaskForm({ isOpen, onClose, onSubmit, currentUserId }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    userId: currentUserId,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación simple
    if (!formData.title || !formData.description || !formData.userId) {
      return alert("Completa todos los campos");
    }

    // Llamamos al handler del padre
    onSubmit({
      ...formData,
      status: "ACTIVE", // backend lo recibe como ACTIVE
      userId: Number(formData.userId),
    });

    // Reset y cerrar modal
    setFormData({ title: "", description: "", userId: currentUserId });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <header className="modal-header">
          <h2>Crear nueva tarea</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </header>

        <form className="modal-form" onSubmit={handleSubmit}>
          <label>
            Título
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Descripción
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Usuario (ID)
            <input
              type="number"
              name="userId"
              value={formData.userId}
              onChange={handleChange}
              required
            />
          </label>

          <button type="submit" className="submit-btn">
            Guardar tarea
          </button>
        </form>
      </div>
    </div>
  );
}
