import "./Progressbar.css";

export default function ProgressBar({ value, label = "Progreso del nivel" }) {
  const v = Math.max(0, Math.min(100, value));

  return (
    <div className="pg">
      <div className="pg-head">
        <span className="pg-label">{label}</span>
        <span className="pg-percent">{v}%</span>
      </div>

      <div
        className="pg-track"
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={v}
      >
        <div className="pg-fill" style={{ "--pg-progress": v }} />
      </div>
    </div>
  );
}