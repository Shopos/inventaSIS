import { useState } from "react";
import "./productModal.css"

function ProductModal({ producto, onClose }) {
  const [imagenPrincipal,setImagenPrincipal] =useState(0)
  const hayDescuento =
    Number(producto.precioActual) < Number(producto.precio);

  return (
    <div className="overlayPM">
      <div className="modalPM">
        <h2>{producto.nombre}</h2>

        <div className="galeria-admin-container">
          {/* Visor Principal */}
          <div className="main-image-viewer">
            {producto.imagenes.length > 0 ? (
              <img src={producto.imagenes[imagenPrincipal].url} alt="Principal" />
            ) : (
              <div className="no-image">Sin imágenes</div>
            )}
          </div>

          {/* Fila de Miniaturas */}
          <div className="miniaturas-row">
            {producto.imagenes.map((img, i) => (
              <div 
                key={i} 
                className={`miniatura-item ${i === imagenPrincipal ? 'active' : ''}`}
                onClick={() => setImagenPrincipal(i)}
              >
                <img src={img.url} alt={`Thumb ${i}`} />
              </div>
            ))}
          </div>
        </div>

        <p>Estado: {producto.condicion}</p>

        <div className="precioContainer">
          {hayDescuento ? (
            <>
              <span className="precioOriginal">
                ${producto.precio}
              </span>
              <span className="precioDescuento">
                ${producto.precioActual}
              </span>
            </>
          ) : (
            <span className="precioNormal">
              ${producto.precioActual}
            </span>
          )}
        </div>

        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
}

export default ProductModal