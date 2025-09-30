'use client'

import { PaisCard } from "@/components/paisCard";
import PaisModal from "@/components/paisModal";
import { useInput } from "@/hooks/useInput";
import useFavorites from "@/store/favoritesStore";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const {
    pais: paises,
    fetchPaises,
    paisSel,
    quitarPaisSeleccionado,
  } = useFavorites();

  const searchParams = useSearchParams();
  const router = useRouter();
  const { form, setForm, onInputChange, refreshForm } = useInput({
    nombre: "",
    region: "todos",
    minPoblacion: "",
    maxPoblacion: "",
  });

  useEffect(() => {
    fetchPaises();
  }, []);

  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries());
    setForm((prev) => ({ ...prev, ...params }));
  }, [searchParams, setForm]);

  useEffect(() => {
    const query = new URLSearchParams(form).toString();
    router.replace(`?${query}`);
  }, [form, router]);

  return (
    <div className="page">
      {/* Header */}
      <header className="page-header">
        <h1>Página de países</h1>
        <Link 
          href={`/favorites?${searchParams.toString()}`} 
          className="page-link"
        >
          Ir a favoritos
        </Link>
      </header>

      {/* Filtros */}
      <section className="filters">
        <input
          placeholder="Busqueda por nombre"
          name="nombre"
          value={form.nombre}
          onChange={onInputChange}
        />

        <div className="select-wrapper">
          <select
            className="select-custom"
            name="region"
            value={form.region}
            onChange={onInputChange}
          >
            <option value="todos">Todos</option>
            <option value="Africa">Africa</option>
            <option value="Americas">Americas</option>
            <option value="Antarctic">Antartic</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
        </div>

        <input
          type="number"
          placeholder="Población Minima"
          name="minPoblacion"
          value={form.minPoblacion}
          onChange={onInputChange}
        />
        <input
          type="number"
          placeholder="Población Maxima"
          name="maxPoblacion"
          value={form.maxPoblacion}
          onChange={onInputChange}
        />
        <button onClick={refreshForm}>Refrescar Filtros</button>
      </section>

      {/* Grid de países */}
      <main className="pais-grid">
        {paises
          .filter((p) =>
            form.nombre === ""
              ? p
              : p.name.common.toLowerCase().startsWith(form.nombre.toLowerCase())
          )
          .filter((p) => (form.region === "todos" ? p : p.region === form.region))
          .filter((p) =>
            form.minPoblacion === "" ? p : p.population >= +form.minPoblacion
          )
          .filter((p) =>
            form.maxPoblacion === "" ? p : p.population <= +form.maxPoblacion
          )
          .map((p) => (
            <PaisCard pais={p} key={p.name.official} />
          ))}
      </main>

      {/* Modal */}
      <PaisModal pais={paisSel} onClose={quitarPaisSeleccionado} />
    </div>
  );
}
