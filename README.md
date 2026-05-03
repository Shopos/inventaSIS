# 🛒 Sistema de Gestión de Productos (Admin & Store)

Este proyecto es una plataforma Fullstack para la administración de inventario y visualización de productos, integrando **Firebase** para la base de datos y **Supabase** para el almacenamiento de imágenes.

## 🚀 Características
- **Panel de Administración:** CRUD completo (Crear, Leer, Actualizar, Eliminar) de productos.
- **Galería de Imágenes:** Carrusel interactivo y visor de miniaturas optimizado.

## 🛠️ Tecnologías utilizadas
- **Frontend:** React + TypeScript.
- **Estilos:** CSS3.
- **Base de Datos:** Google Firebase (Firestore).
- **Almacenamiento de Imágenes:** Supabase Storage.


## ⚙️ Instalación y Configuración

1. Clonar el repositorio:
   ```bash
   git clone [https://github.com/tu-usuario/tu-repositorio.git](https://github.com/tu-usuario/tu-repositorio.git)
```
2. Instalar dependencias
```bash
    npm install
```
3. Configura las variables de entorno
   En este caso al estar usando Firebase y Supabase se deben cambiar las variables de estas herramientas creando un archivo .env
   [!TIP]
   Las variables deben llevar el prefijo `VITE_`, esto último debido a que se utiliza **VITE+TYPESCRIPT**

4.Ejecutar el proyecto
  Una vez configurada tanto las credenciales e instalado las dependencias ejecuta
  ```bash
      npm run dev
  ```
   
