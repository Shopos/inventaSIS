import { useState } from "react";
import { addProducto, updateProducto } from "../services/firebase";
import { supabaseService } from "../services/supabaseFunctions";

import "./modalProductAdmin.css"

type Producto = {
  nombre: string;
  precio: number | string;
  precioActual: number | string;
  estado: string;
  condicion: string;
  imagenes: imagenProducto[];
};

type ProductoDB = Producto & {
  id:string;
}

type imagenProducto = {
  url:string;
  path:string;
}

type Props = {
  isOpen: boolean;
  onClose: () => void;
  modo: string;
  producto: ProductoDB | null;
  onSuccess: () => void;
};


function ModalProductAdmin({ isOpen, onClose, modo, producto, onSuccess }: Props) {

  const [form, setForm] = useState<Producto>({
    nombre: producto?.nombre || "",
    precio: producto?.precio || "",
    precioActual: producto?.precioActual || "",
    estado: producto?.estado || "",
    condicion: producto?.condicion || "",
    imagenes: producto?.imagenes || [],
  });
  const [load, setLoad] = useState(false);
  const [imgUp, setImgUp] = useState(false);

  const listaEstado = [
    "Disponible",
    "Pocas unidades",
    "Vendido",
    "En trámite"
  ]
  const listaCondicion = ["Nuevo","Reparado","Usado"]
  if (!isOpen) return null;

  const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
) => {
  const { name, value } = e.target;

  setForm(prev => ({
    ...prev,
    [name]: value
  }));
};

  const manejoSubidaImagen = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const files = e.target.files
  if (!files || files.length === 0) return

  setImgUp(true)

  try {
    const file = files[0]

    const result = await supabaseService.uploadImage(file)

    if (!result.url) {
      throw new Error(result.error)
    }

    setForm(prev => ({
      ...prev,
      imagenes: [...prev.imagenes, {
        url:result.url,
        path:result.path
      }]
    }))

  } catch (e) {
    console.error(e)
  } finally {
    setImgUp(false)
  }
}


  const manejoEliminarImagenProducto = async (img) => {
    
  try {
    await supabaseService.deleteImage(img.path)

    setForm(prev => ({
      ...prev,
      imagenes: prev.imagenes.filter(i => i.path !== img.path)
    }))

  } catch (error) {
    console.error("Error eliminando imagen:", error)
  }
}


  const manejoGuardado = async () => {
  setLoad(true);

  try {
    if (modo === "editar" && producto?.id) {
      await updateProducto(producto.id, form);
    } else {
      await addProducto(form);
    }

    onSuccess();
    onClose();

  } catch (e) {
    console.log(e);
  }

  setLoad(false);
};

  return (
    <div className="modalAdminAdd-Overlay">
        <div className="modalAdmin-Container">
            <h2>{modo === "editar" ? "Editar Producto":"Agregar Producto"}</h2>
            <div className="modalAdmin-body">
                <div className="grupoInput">
                    <label>Nombre</label>
                    <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre" />
                </div>
                <div className="grupoInput">
                    <label>Precio original</label>
                    <input name="precio" disabled={modo==="editar"} type="number" value={form.precio} onChange={handleChange} placeholder="Precio" />
                
                </div>
                <div className="grupoInput">
                    <label>Precio actual</label>
                    <input name="precioActual" type="number" value={form.precioActual} onChange={handleChange} placeholder="Precio actual" />
                
                </div>
                <div className="grupoInput">
                    <label>Estado</label>
                    <select
                    name="estado"
                    value={form.estado}
                    onChange={handleChange}>
                      <option value={""}>Seleccionar</option>
                      {listaEstado.map(e=>(
                        <option key={e} value={e}>{e}</option>
                      ))}
                    </select>
                </div>
                <div className="grupoInput">
                    <label>Condición</label>
                    <select
                      name="condicion"
                      value={form.condicion}
                      onChange={handleChange}
                      >
                        <option value={""}>Seleccionar</option>
                        {listaCondicion.map(e=>(
                          <option key={e} value={e}>{e}</option>
                        ))}
                      </select>
                </div>
                
                <div className="grupoInput">
            <label>Imágenes del Producto</label>
            <div className="upload-container">
              <input 
                type="file" 
                id="file-upload"
                onChange={manejoSubidaImagen} 
                accept="image/*"
                style={{ display: 'none' }} 
              />
              <label htmlFor="file-upload" className="btn-upload">
                {imgUp ? "Subiendo..." : "Añadir Imagen +"}
              </label>
            </div>

            <div className="previewImagen-galeria">
              {form.imagenes.map((img, i) => (
                <div key={i} className="imagenContainer">
                  <img 
                    src={img.url} 
                    alt="producto" 
                    onClick={() => window.open(img.url, '_blank')} 
                    title="Click para ver en grande"
                  />
                  <button 
                    className="btn-delete-img"
                    onClick={() => manejoEliminarImagenProducto(img)}
                    type="button"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
        </div>  



            </div>
            <div className="modalAdmin-foot">
                <button onClick={onClose}>Cancelar</button>
                <button onClick={manejoGuardado} disabled={load}>
                    {load ? "Guardando..." : "Guardar"}
                </button>
            </div>
        </div>
    </div>
);
}
export default ModalProductAdmin