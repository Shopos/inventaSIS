import { useState } from "react";
import "./productCard.css";

function ProductCard({ producto, onClick }) {
  const [currentImg, setCurrentImg] = useState(0);
  const imagenes = producto.imagenes || [];
  const tieneDescuento = Number(producto.precioActual) < Number(producto.precio);

  const nextImage = (e) => {
    e.stopPropagation(); // Evita abrir el modal
    setCurrentImg((prev) => (prev === imagenes.length - 1 ? 0 : prev + 1));
  };

  const prevImage = (e) => {
    e.stopPropagation(); // Evita abrir el modal
    setCurrentImg((prev) => (prev === 0 ? imagenes.length - 1 : prev - 1));
  };

  return (
    <div className="productCard" onClick={onClick}>
      <div className="hoverCard">
        <h4>{producto.nombre}</h4>
        
        <div className="carrusel-container">
          {imagenes.length > 1 && (
            <>
              <button className="carrusel-btn prev" onClick={prevImage}>❮</button>
              <button className="carrusel-btn next" onClick={nextImage}>❯</button>
            </>
          )}
          <img
            src={imagenes[currentImg]?.url || "placeholder.png"}
            className="productImage"
            alt={producto.nombre}
          />
          {imagenes.length > 1 && (
            <div className="carrusel-dots">
              {imagenes.map((_, i) => (
                <span key={i} className={`dot ${i === currentImg ? "active" : ""}`} />
              ))}
            </div>
          )}
        </div>

        <p className="condicion">Condición: {producto.condicion}</p>
        <div className="precios">
          {tieneDescuento && <span className="precio-original">${producto.precio}</span>}
          <span className="precio-actual">${producto.precioActual}</span>
        </div>
      </div>
    </div>
  );
}
export default ProductCard