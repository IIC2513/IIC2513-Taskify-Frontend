import { useEffect, useRef, useState } from "react";
import "./Task.css";

export default function Tarea({
  id,
  title,
  desc,
  done = false,
  onChange = () => {}, 
}) {
  const [t, setT] = useState(title ?? "");
  const [d, setD] = useState(desc ?? "");
  const [editing, setEditing] = useState({ title: false, desc: false });

  const titleRef = useRef(null);
  const descRef  = useRef(null);

  // Enfocar al entrar a edición
  useEffect(() => {
    if (editing.title && titleRef.current) focusContentEditable(titleRef.current);
    if (editing.desc && descRef.current) focusContentEditable(descRef.current, { end: true });
  }, [editing]);

  function focusContentEditable(el, { end = true } = {}) {
    el.focus();
    const range = document.createRange();
    range.selectNodeContents(el);
    range.collapse(!end);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  }

  // ---- Title handlers
  const startEditTitle = () => setEditing((s) => ({ ...s, title: true }));
  const commitTitle = () => {
    const newVal = (titleRef.current?.innerText ?? "").trim();
    setT(newVal);
    setEditing((s) => ({ ...s, title: false }));
    onChange({ id, title: newVal, desc: d });
  };
  const cancelTitle = () => {
    if (titleRef.current) titleRef.current.innerText = t;
    setEditing((s) => ({ ...s, title: false }));
  };
  const onKeyTitle = (e) => {
    if (e.key === "Enter") { e.preventDefault(); commitTitle(); }
    if (e.key === "Escape") { e.preventDefault(); cancelTitle(); }
  };

  // ---- Desc handlers
  const startEditDesc = () => setEditing((s) => ({ ...s, desc: true }));
  const commitDesc = () => {
    const newVal = (descRef.current?.innerText ?? "").trim();
    setD(newVal);
    setEditing((s) => ({ ...s, desc: false }));
    onChange({ id, title: t, desc: newVal });
  };
  const cancelDesc = () => {
    if (descRef.current) descRef.current.innerText = d;
    setEditing((s) => ({ ...s, desc: false }));
  };
  const onKeyDesc = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); commitDesc(); }
    if (e.key === "Escape") { e.preventDefault(); cancelDesc(); }
  };

  return (
    <article className={`ti-card ${done ? "is-done" : ""}`} data-id={id}>
      <div className="ti-left">
        <span className={`ti-chk ${done ? "on" : ""}`} aria-hidden="true">
          <span className="box" />
        </span>

        <div className="ti-text">
          <h3
            className={`ti-title ti-ce ${editing.title ? "is-editing" : ""}`}
            contentEditable={editing.title}
            suppressContentEditableWarning
            onClick={startEditTitle}
            onBlur={commitTitle}
            onKeyDown={onKeyTitle}
            ref={titleRef}
            data-placeholder="Escribe un título…"
          >
            {t}
          </h3>

          <p
            className={`ti-desc ti-ce ${editing.desc ? "is-editing" : ""}`}
            contentEditable={editing.desc}
            suppressContentEditableWarning
            onClick={startEditDesc}
            onBlur={commitDesc}
            onKeyDown={onKeyDesc}
            ref={descRef}
            data-placeholder="Añade una descripción…"
          >
            {d}
          </p>
        </div>
      </div>

      <div className="ti-actions">
        <button type="button" className="chip chip-ok" >
          {done ? "Completada" : "Completar"}
        </button>
        <button type="button" className="chip chip-danger">
          Eliminar
        </button>
      </div>
    </article>
  );
}
