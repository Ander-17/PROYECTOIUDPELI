
# 🎬 CIUDA: Banco de Películas IUDigital

**CIUDA** es un ecosistema de gestión multimedia diseñado para la **IU Digital de Antioquia**. Este sistema permite a los administradores centralizar y organizar el catálogo de películas, directores y productoras en un entorno web profesional y moderno.

---

## 🎥 Video Demo / Explicativo

> ⚠️ **[https://drive.google.com/file/d/1yCOETuaeA9-IHyj5zT8twQGIbW6mpWry/view?usp=sharing]**

---

## 🚀 Características Principales

* **Gestión de Catálogo (Media):** Registro completo de títulos, seriales únicos, años de estreno y sinopsis.
* **Módulos Administrativos:** CRUDs independientes para la gestión de **Géneros**, **Directores**, **Productoras** y **Tipos de Contenido**.
* **Interfaz Cinematográfica:** Diseño responsivo en modo oscuro con una paleta de colores de alta visibilidad (Negro, Dorado y Cian).
* **Navegación Intuitiva:** Barra de navegación fija (Sticky Navbar) y footer con separación visual clara.

---

## 🛠️ Stack Tecnológico

### **Frontend**

* **React.js**
* **Bootstrap 5**
* **React Router Dom**
* **Axios**

### **Backend & Persistencia**

* **Node.js & Express**
* **MongoDB**
* **Mongoose**

---

## 📂 Estructura del Proyecto (Frontend)

```text
src/
 ├── api/           # Configuración de axios y conexión con el servidor
 ├── assets/        # Recursos visuales, logos e iconos
 ├── components/    # Componentes globales como Navbar, Footer y Hero
 ├── pages/         # Vistas principales de administración
 └── App.css        # Estilos globales
```

---

## 🔧 Configuración e Instalación

### 1. Requisitos Previos

* Tener instalado Node.js (versión 16 o superior)
* Tener una instancia de MongoDB (Local o Atlas)

### 2. Instalación del Proyecto

```bash
git clone https://github.com/TU_USUARIO/CIUDA.git
cd CIUDA
npm install
```

### 3. Variables de Entorno (.env)

```env
VITE_API_URL=http://localhost:4000/api
```

### 4. Ejecución del Entorno

```bash
npm run dev
```

---

## 🎓 Créditos e Institución

Este proyecto ha sido desarrollado como parte de la formación académica en la Tecnología en Desarrollo de Software de la IU Digital de Antioquia.

* **Desarrollador:** Ander-17 (Estudiante de 4to Semestre)

---

© 2026 CIUDA | IU Digital de Antioquia | Anderson Lopera Rodríguez 
