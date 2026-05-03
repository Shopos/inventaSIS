import { useEffect, useState } from "react";
import ProductCard from "../components/productCard";
import ProductModal from "../components/productModal";

import { getData } from "../services/firebase.js"


import "./public.css"
function Public() {
  const [productos, setProductos] = useState([]);
  const [productoSelected, setProductoSelected] = useState(null)

  useEffect(() => {
    const cargarData = async() =>{
        try{
          const productosQuery = await getData()
          const filtrados = productosQuery.filter(
            p => p.estado && (p.estado=== "Disponible" || p.estado === "Pocas unidades")
          )
          console.log(productosQuery)
          setProductos(filtrados)

          
        }catch(e){
          console.log(e)
        }
    }
    cargarData()
  }, []);

  return (
    <div className="componentePublic">
      <h2>Inventario Productos</h2>

      <div className="gridPublicProductos">
        {productos.map((p) => (
          <ProductCard key={p.id} producto={p} onClick={()=>setProductoSelected(p)}/>
        ))}
      </div>

      {productoSelected && (
        <ProductModal
          producto={productoSelected}
          onClose={()=>setProductoSelected(null)}
        />
      )}
    </div>
  );
}

export default Public;