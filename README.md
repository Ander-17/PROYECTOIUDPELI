# 🎬 CIUDA Cine: Banco de Películas IUDigital

**CIUDA Cine** es una aplicación web integral (*Full-Stack* MERN) desarrollada de manera individual para la **Institución Universitaria Digital de Antioquia (IU Digital)**, orientada a la gestión centralizada y consulta pública de un catálogo audiovisual universitario (películas, documentales y series).

El sistema articula una base de datos documental en **MongoDB Atlas**, una API RESTful segura construida en **Node.js y Express** (con autenticación mediante **JWT**, cifrado **`bcrypt`** y *cookies* **`HttpOnly`**), y una interfaz dinámica en **ReactJS** desplegada en producción sobre **Vercel**.

---

## 🌐 Enlaces en Producción y Recursos del Proyecto

* **Aplicación Web en Producción (Frontend):** [https://proyectoiudpelifront.vercel.app/](https://proyectoiudpelifront.vercel.app/)
* **API REST en Producción (Backend):** [https://proyectoiudpeliback.vercel.app/](https://proyectoiudpeliback.vercel.app/)
* **Repositorio Consolidado (GitHub):** [https://github.com/Ander-17/PROYECTOIUDPELI](https://github.com/Ander-17/PROYECTOIUDPELI)

---

## 🎥 Sustentación Audiovisual (Videos Demostrativos)

* **Video 1 — Desarrollo del Backend y API REST:** [Ver en Google Drive](https://drive.google.com/file/d/1rm55i-iwT8J9tA8HghbtZG3LnTtdTRyi/view)
* **Video 2 — Desarrollo de Interfaces en ReactJS:** [Ver en Google Drive](https://drive.google.com/file/d/1yCOETuaeA9-IHyj5zT8twQGIbW6mpWry/view?usp=sharing)
* **Video 3 — Despliegue en la Nube (Vercel):** [Ver en Google Drive](https://drive.google.com/file/d/1K8X1tJBNNjG6SuLBym60mgWv_37uVfrO/view?usp=sharing)
* **Video 4 — Demostración Consolidada del Sistema Completo:** [Ver en Google Drive](https://drive.google.com/file/d/1hTgGEn8FAuxEnqUABYE2ziKCiLG6qIVk/view?usp=sharing)

---

## 🚀 Características Principales y Perfiles de Acceso

### 1. Vista Pública (Consulta Libre)
* **Catálogo Audiovisual Dinámico:** Exploración de producciones disponibles con visualización de póster, año de estreno, sinopsis y metadatos asociados.
* **Filtros y Búsqueda:** Filtrado por **Género**, **Tipo**, **Director** y **Productora**, además de barra de búsqueda interactiva.
* **Navegación Fluida:** Arquitectura *Single Page Application* (SPA) con soporte para recarga de rutas en producción (`vercel.json`).

### 2. Panel Administrativo (Acceso Protegido)
* **Autenticación y Control de Acceso:** Inicio y cierre de sesión seguros mediante contraseñas cifradas con `bcrypt`, emisión de **JSON Web Tokens (JWT)** y almacenamiento en *cookies* `HttpOnly` con políticas CORS configuradas entre dominios.
* **Gestión Modular (CRUD Completo):**
  * **Módulo de Género:** Creación, edición y activación/inactivación de géneros cinematográficos.
  * **Módulo de Director:** Administración de directores principales y su estado activo/inactivo.
  * **Módulo de Productora:** Gestión de casas productoras, eslogan, descripción y estado.
  * **Módulo de Tipo:** Clasificación de formatos multimedia (película, serie, documental, etc.).
  * **Módulo de Media:** Registro, edición y eliminación de producciones con serial único, URL, portada y validación de entidades activas referenciadas.

---

## 🛠️ Stack Tecnológico

| Capa | Tecnologías y Librerías |
| :--- | :--- |
| **Frontend** | React.js, Vite, Bootstrap 5, React Router DOM, Axios |
| **Backend** | Node.js, Express.js, CORS, Cookie-Parser |
| **Seguridad** | JSON Web Token (`jsonwebtoken`), `bcryptjs` / `bcrypt`, *Cookies* `HttpOnly` |
| **Base de Datos** | MongoDB Atlas (NoSQL), Mongoose ODM |
| **Infraestructura y Despliegue** | Git, GitHub, Vercel (*Serverless Functions* & *Static Hosting*) |

---

## 📂 Arquitectura y Estructura del Repositorio

El proyecto sigue una estructura modular desacoplada dentro de un mismo repositorio (`PROYECTOIUDPELI`), separando las responsabilidades del servidor y del cliente web:

```text
PROYECTOIUDPELI/
├── backend/                     # API RESTful en Node.js y Express
│   ├── controllers/             # Lógica de negocio y autenticación (authController.js, etc.)
│   ├── db/                      # Configuración de conexión a MongoDB Atlas
│   ├── middlewares/             # Validación de tokens JWT y protección de rutas
│   ├── models/                  # Esquemas de Mongoose (Media, Genero, Director, Productora, Tipo, Usuario)
│   ├── routes/                  # Definición de endpoints REST (/api/...)
│   ├── crearAdmin.js            # Script de inicialización de usuario administrador
│   ├── index.js                 # Punto de entrada del servidor y políticas CORS
│   ├── .env.template            # Plantilla de variables de entorno del servidor
│   └── vercel.json              # Configuración de despliegue serverless (@vercel/node)
│
├── frontend/                    # Interfaz de usuario en React + Vite
│   ├── public/                  # Archivos estáticos públicos
│   ├── src/
│   │   ├── api/                 # Cliente HTTP Axios (apiClient.js) conectado al backend
│   │   ├── assets/              # Recursos gráficos e identidad visual
│   │   ├── components/          # Componentes reutilizables (Navbar, tarjetas, modales, rutas protegidas)
│   │   ├── pages/               # Vistas públicas y paneles administrativos CRUD
│   │   ├── App.css              # Estilos globales
│   │   ├── App.jsx              # Definición de rutas de la aplicación
│   │   └── main.jsx             # Punto de montaje de React
│   ├── index.html               # Documento base HTML
│   ├── vite.config.js           # Configuración de empaquetado Vite
│   └── vercel.json              # Reglas de reescritura (rewrites) para rutas SPA
│
└── README.md                    # Documentación general consolidada del proyecto
```

---

## 🔧 Configuración e Instalación Local

### 1. Requisitos Previos
* **Node.js** (versión 18 o superior recomendada)
* **npm** (gestor de paquetes incluido con Node.js)
* Una instancia activa de **MongoDB Atlas** (o MongoDB local)

### 2. Clonar el Repositorio
```bash
git clone https://github.com/Ander-17/PROYECTOIUDPELI.git
cd PROYECTOIUDPELI
```

### 3. Configuración y Ejecución del Backend
```bash
cd backend
npm install
```

Crea un archivo `.env` en la carpeta `backend/` tomando como base `.env.template` y define las siguientes variables:

```env
PORT=4000
MONGO_URI=mongodb+srv://<usuario>:<password>@<cluster>.mongodb.net/db_Inventario_Peli_IUD
JWT_SECRET=tu_clave_secreta_segura
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

Inicia el servidor en modo desarrollo:
```bash
npm run dev
```

### 4. Configuración y Ejecución del Frontend
En una nueva terminal, dirígete a la carpeta `frontend/`:

```bash
cd frontend
npm install
```

Crea un archivo `.env` en la carpeta `frontend/` indicando la URL base de la API:

```env
VITE_API_URL=http://localhost:4000/api
```

Inicia la aplicación web:
```bash
npm run dev
```

---

## 🎓 Contexto Académico y Créditos

Proyecto desarrollado y sistematizado como trabajo de grado en la modalidad de **Sistematización de Experiencias** para optar al título de **Tecnólogo en Desarrollo de Software**, articulando los aprendizajes de las asignaturas *Ingeniería Web II*, *Gestión y Administración de Bases de Datos* y *Desarrollo de Software Seguro*.

* **Autor / Desarrollador Full-Stack:** Anderson Lopera Rodríguez
* **Asesor:** Cesar Felipe Henao Villa, Magíster
* **Institución:** Institución Universitaria Digital de Antioquia (IU Digital) — Facultad de Ingeniería y Ciencias Agropecuarias
* **Año:** 2026