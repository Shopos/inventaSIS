import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore, updateDoc,doc, deleteDoc, addDoc,getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { supabaseService } from "./supabaseFunctions";

const firebaseConfig = {
  apiKey:  import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:  import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:  import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:  import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId:  import.meta.env.VITE_FIREBASE_SENDER_ID,
  appId:  import.meta.env.VITE_FIREBASE_APP_ID
};

const CLOUD_NAME = "diqcv2v8p"
const UPLOAD_PRESET = "inventasis"

 

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)

export const getData= async()=>{
  const querySnapshot = await getDocs(collection(db,"productos"))
  return querySnapshot.docs.map(doc => ({
    id:doc.id,
    ...doc.data()
  }))
}

export const updateProducto = async (id: string, producto) => {
  try {
    if (!id) throw new Error("ID requerido para actualizar");

    const cleanData = cleanObject(producto);

    const docRef = doc(db, "productos", id);

    await updateDoc(docRef, cleanData);

  } catch (error) {
    console.error("Error actualizando producto:", error.message);
    throw error;
  }
};


//se borra documento de producto y imagenes asociadas a este
export const deleteProducto = async (id: string) => {
  try {
    const docRef = doc(db, "productos", id);
    const snapshot = await getDoc(docRef);

    if (!snapshot.exists()) {
      throw new Error("Producto no encontrado");
    }

    const data = snapshot.data();

    //eliminar imágenes
    //recorre arreglo de imagenes del producto
    if (data.imagenes && Array.isArray(data.imagenes)) {
      await Promise.all(
        data.imagenes.map((img) =>
          supabaseService.deleteImage(img.path)
        )
      );
    }
    //Elimina documento
    await deleteDoc(docRef);

  } catch (error) {
    console.error("Error eliminando producto:", error);
    throw error;
  }
};

export const addProducto = async (producto) => {
  try {
    const cleanData = cleanObject(producto);

    const docRef = await addDoc(
      collection(db, "productos"),
      cleanData
    );

    return docRef.id;

  } catch (error) {
    console.error("Error agregando producto:", error.message);
    throw error;
  }
};
const cleanObject = (obj)=>{
  return Object.fromEntries(
    Object.entries(obj).filter(([value])=>{
      if(value === undefined)return false
      if(typeof value === "string" && value.trim()==="")return false
      return true
    })
  )
}
export const subirImagenProducto = async (file: File, nombreProducto: string): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);
  formData.append("tags", nombreProducto);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) throw new Error("Error al subir a Cloudinary");

  const data = await response.json();
  return data.secure_url; // Esta es la URL que guardaremos en Firestore
};

