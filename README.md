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

>1. Clonar el repositorio:
>   
>Clona el repositorio dentro de tu dispositivo

>2. Instalar dependencias
```bash
    npm install
```

>3. Configura las variables de entorno
>
>En este caso al estar usando Firebase y Supabase se deben cambiar las variables de estas herramientas creando un archivo .env
   
>[!TIP]
   Las variables deben llevar el prefijo `VITE_`, esto último debido a que se utiliza **VITE+TypeScript**.
>
#### Configuración de Acceso Administrativo
El sistema utiliza **Firebase Auth** para gestionar la identidad de los usuarios. Para restringir quién puede entrar al panel de administración:

1. Ve a tu consola de Firebase y crea un usuario en la sección de **Authentication**.
2. Copia el correo electrónico de ese usuario.
3. Declara la siguiente variable en tu archivo `.env`:
```env
VITE_SPECIAL_MAIL_ACCESS="correo@ejemplo.com"
```

>4.Ejecutar el proyecto
>
>Una vez configurada tanto las credenciales e instalado las dependencias.
  ```bash
      npm run dev
  ```
   
