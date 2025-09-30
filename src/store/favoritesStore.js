import { create } from "zustand";
import { persist } from "zustand/middleware";

const useFavorites = create()(
    persist((set) => ({
        pais: [],
        paisFav: [],
        paisSel: null,
        agregarPais: (nuevoPais) =>
            set((state) => ({ paisFav: [...state.paisFav, nuevoPais] })),
        quitarPais: (cca3) => set((state) => ({paisFav: state.paisFav.filter((p) => p.cca3 !== cca3)})),
        fetchPaises: async () => {
            const res = await fetch(
                "https://restcountries.com/v3.1/all?fields=name,cca3,flags,region,population,capital"
            );
            const data = await res.json();
            set({ pais: data });
        },
        seleccionarPais: (pais) => set((state) => ({paisSel: pais})),
        quitarPaisSeleccionado: () => set((state) => ({paisSel: null}))
    }))
);

export default useFavorites;
