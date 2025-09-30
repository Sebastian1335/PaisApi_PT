import useFavorites from "@/store/favoritesStore";
import "./paisCard.css";

export const PaisCard = ({pais}) => {

  const {paisFav, agregarPais, quitarPais, seleccionarPais} = useFavorites()
  const yaFavorito = paisFav.some((p) => p.cca3 === pais.cca3);
  const onClick = () => {
    seleccionarPais(pais)
  }
  return (
    <>
    <div className="pais-card" onDoubleClick={onClick}>
      <div className="pais-card-info">
        <p><strong>Nombre:</strong> {pais.name.common} </p>
        <p><strong>Región:</strong> {pais.region} </p>
        <p><strong>Capital:</strong> {pais.capital?.[0]} </p>
        <p><strong>Población:</strong> {pais.population} </p>
      </div>
      <img src={pais.flags.png} alt="Bandera" />
      {yaFavorito ? (
        <button
        className="card-button quitar"
        onClick={(e) => {
          quitarPais(pais.cca3)
        }}
        onDoubleClick={(e) => e.stopPropagation()}
        >
          Quitar de favoritos
        </button>
      ) : (
        <button
        className="card-button"
        onClick={(e) => {
          agregarPais(pais)
        }}
        onDoubleClick={(e) => e.stopPropagation()}  
        >
          Agregar a favoritos
        </button>
      )}
    </div>
    </>
  );
};
