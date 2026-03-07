# API de Gestión Películas 🎬

**Desarrollado por:** Anderson Lopera Rodríguez  
*Estudiante de la Tecnología en Desarrollo de Software - IU Digital de Antioquia*

---

## 🎥 Explicación del Proyecto

> **Enlace al video explicativo:** [Haz clic aquí para ver la explicación detallada de la arquitectura y funcionamiento de la API](https://drive.google.com/file/d/1rm55i-iwT8J9tA8HghbtZG3LnTtdTRyi/view?usp=sharing).


---

## 🚀 Sobre este Proyecto

Una API RESTful desarrollada en Node.js y Express para la gestión integral de un catálogo de películas y series. Este backend implementa una arquitectura orientada a recursos y utiliza una base de datos no relacional (MongoDB) para gestionar referencias cruzadas (`populate`) entre múltiples colecciones de datos, demostrando habilidades sólidas en diseño de APIs como preparación para pruebas técnicas de prácticas profesionales.

## 🛠️ Tecnologías Utilizadas

* **Entorno de ejecución:** Node.js
* **Framework:** Express.js
* **Base de Datos:** MongoDB Atlas
* **ODM:** Mongoose
* **Gestión de variables:** Dotenv

## ⚙️ Instalación y Configuración local

1. Clona este repositorio en tu máquina local:
   ```bash
   git clone 
   ```

2. Ingresa a la carpeta del proyecto e instala las dependencias:
   ```bash
   cd backend
   npm install
   ```

3. Crea un archivo `.env` en la raíz del proyecto basándote en esta estructura:
   ```env
   PORT=4000
   MONGO_URI=tu_cadena_de_conexion_de_mongodb_atlas
   ```

4. Inicia el servidor en entorno de desarrollo:
   ```bash
   npm run dev
   ```

## 🔌 Estructura de Endpoints

La API cuenta con 5 módulos principales bajo el prefijo `/api/`:

* **Géneros (`/api/generos`):** `GET`, `POST`, `PUT`
* **Directores (`/api/directores`):** `GET`, `POST`, `PUT`
* **Productoras (`/api/productoras`):** `GET`, `POST`, `PUT`
* **Tipos (`/api/tipos`):** `GET`, `POST`, `PUT`
* **Media (`/api/media`):** `GET`, `POST`, `PUT`, `DELETE`