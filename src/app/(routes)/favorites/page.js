'use client'

import { PaisCard } from "@/components/paisCard";
import PaisModal from "@/components/paisModal";
import useFavorites from "@/store/favoritesStore";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function Favorites() {
    const searchParams = useSearchParams();
    const {paisFav, paisSel, quitarPaisSeleccionado} = useFavorites();

    return (
        <div className="page">
            <div className="page-header">
                <h1>Paises favoritos</h1>
                <Link className="page-link" href={`/?${searchParams.toString()}`} >
                    Volver
                </Link>
            </div>
            <main className="pais-grid">
                {paisFav.length === 0 ? (
                    <p>No tienes paises favoritos</p>
                ) : (
                    paisFav.map((p) => (
                        <PaisCard pais={p} key={p.name.official}/>
                    ))
                )}
            </main>

            <PaisModal pais={paisSel} onClose={quitarPaisSeleccionado}/>
        </div>
    );
}
