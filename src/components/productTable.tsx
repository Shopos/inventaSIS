import { useEffect, useState } from "react";
import "./productTable.css";
import { deleteProducto, getData } from "../services/firebase";
import ModalProductAdmin from "./modalProductAdmin";

function ProductTable() {
  const [productos, setProductos] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modo, setModo] = useState("crear");
  const [productoUse, setProductoUse] = useState(null);
  const [load,setLoad]=useState(false)
  const [productoEliminar, setProductoEliminar] = useState(null);
  const [llaveModal,setLLaveModal] = useState("llave")

  useEffect(() => {
    const getDataDB = async () => {
      try {
        const getQuery = await getData();
        setProductos(getQuery);
        console.log(getQuery);
      } catch (e) {
        console.log(e);
      }
    };
    getDataDB();
  }, []);

  const getDataProductos = async () => {
    try {
      const query = await getData();
      setProductos(query);
    } catch (e) {
      console.log(e);
    }
  };
  

  const editarStock = (p) => {
    setModo("editar");
    setProductoUse(p);
    setLLaveModal(p.id)
    setModalOpen(true);
  };
  const addNewProduct = () => {
    //AGREGA NUEVO ARCHIVO A LA TABLA DE PRODUCTOS
    setModo("agregar");
    setProductoUse(null);
    setLLaveModal(`llave-${Date.now()}`)
    setModalOpen(true);
  };

  const confirmarEliminarProducto = async () => {
    if (!productoEliminar) return;
    try {
      setLoad(true)
      await deleteProducto(productoEliminar.id);
      setLoad(false)
      getDataProductos();
    } catch (e) {
      console.log(e);
    } finally {
      setProductoEliminar(null);
    }
  };

  return (
    <div className="table-container">
      <div className="tabla-row">
        <h2>Gestión de Productos</h2>
        <button className="tabla-row-button" onClick={() => addNewProduct()}>
          {" "}
          +{" "}
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Precio actual</th>
            <th>Estado</th>
            <th>Condición</th>
            <th>Imágenes</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {productos.map((p) => (
            <tr key={p.id}>
              <td>{p.nombre}</td>
              <td>{p.precio}</td>
              <td>{p.precioActual}</td>
              <td>{p.estado}</td>
              <td>{p.condicion}</td>
              <td>imagenes</td>

              <td>
                <button
                  className="table-container-button"
                  onClick={() => setProductoEliminar(p)}
                >
                  Eliminar
                </button>
                <button
                  className="table-container-button"
                  onClick={() => editarStock(p)}
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ModalProductAdmin
        isOpen={modalOpen}
        modo={modo}
        onClose={() => setModalOpen(false)}
        onSuccess={() => getDataProductos()}
        producto={productoUse}
        key={llaveModal}
      />

      {productoEliminar && (
        <div className="confirmarOverlay">
          <div className="confirmarModal">
            <p>
              ¿Eliminar el producto <strong>{productoEliminar.nombre}</strong> ?
            </p>
            <div className="confirmActions">
            <button onClick={() => setProductoEliminar(null)}>Cancelar</button>
            <button disabled={load} onClick={confirmarEliminarProducto}>{load ? "Eliminando..." : "Eliminar"}</button>
          </div>
          </div>
          
        </div>
      )}
    </div>
  );
}

export default ProductTable;
