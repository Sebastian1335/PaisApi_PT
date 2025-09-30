'use client'
import "./paisModal.css";

export default function PaisModal({ pais, onClose }) {
  if (!pais) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose}>
          ✖
        </button>
        <h2>{pais.name.common}</h2>
        <img src={pais.flags.png} alt={`Bandera de ${pais.name.common}`} />
        <p><strong>Oficial:</strong> {pais.name.official}</p>
        <p><strong>Región:</strong> {pais.region}</p>
        <p><strong>Capital:</strong> {pais.capital?.[0] ?? "N/A"}</p>
        <p><strong>Población:</strong> {pais.population.toLocaleString()}</p>
      </div>
    </div>
  );
}