# 🎓 Skillia

> Plataforma de aprendizaje online donde los usuarios pueden explorar cursos, inscribirse y seguir su progreso en tiempo real.

---

## 📖 Descripción

Skillia es una aplicación web de e-learning que conecta estudiantes con cursos de calidad. Los usuarios pueden navegar el catálogo, ver el detalle de cada curso con su temario completo, inscribirse gratis y acceder a un reproductor de video con seguimiento de progreso por lección.

El proyecto está construido con React 19 sobre Vite, usa Supabase como backend completo (auth + base de datos) y Zustand para el estado global. La arquitectura está organizada por features, con separación clara entre lógica de negocio (services, store, hooks) y presentación (components, pages).

---

## ✨ Características Principales

### 🏠 Landing Page
- Hero section con propuesta de valor y CTA
- Sección de cursos destacados
- Sección "Cómo funciona"
- Testimonios de estudiantes
- Footer con links

### 🔐 Autenticación
- Registro con email, contraseña y nombre completo
- Login con email y contraseña
- Gestión de sesión persistente via Supabase Auth
- Rutas protegidas (`ProtectedRoute`) y rutas públicas (`PublicRoute`)

### 📚 Catálogo de Cursos
- Listado de todos los cursos disponibles
- Filtros y búsqueda por categoría
- Cards con imagen, rating, precio y duración

### 📄 Detalle del Curso
- Banner hero con imagen, categoría, instructor y rating
- Descripción completa del curso
- Temario con módulos y lecciones expandibles
- Sidebar con precio, garantía de devolución y beneficios
- Botón dinámico: "Inscribirse" / "Continuar Curso" según estado del usuario

### 🎬 Reproductor de Curso
- Reproductor de video con avance automático al terminar una lección
- Sidebar con navegación por módulos y lecciones
- Indicadores visuales de lección activa, completada y pendiente
- Barra de progreso en tiempo real (% completado)
- Persistencia del progreso en Supabase (upsert)

### 📊 Dashboard
- Vista personalizada con saludo al usuario
- Listado de cursos activos con progreso individual

---

## 🛠️ Stack Tecnológico

| Categoría | Tecnología | Versión |
|-----------|-----------|---------|
| Framework | React + Vite | 19 / 8 |
| Backend / DB | Supabase | ^2.101.1 |
| Estado Global | Zustand | ^5.0.12 |
| Navegación | React Router DOM | ^7.14.0 |
| Estilos | Tailwind CSS | ^4.2.2 |
| Íconos | Lucide React | ^1.3.0 |

---

## 📁 Estructura del Proyecto

```
Skillia/
├── src/
│   ├── components/          # Componentes compartidos (Footer, SkeletonCard, CeroItems)
│   ├── feature/
│   │   ├── auth/            # Login, Register y store de autenticación
│   │   ├── course/          # Servicios, store, hooks y componentes de cursos
│   │   ├── dashboard/       # Componentes específicos del panel de control
│   │   └── landing/         # Componentes de la página de inicio
│   ├── lib/                 # Cliente de Supabase
│   ├── pages/               # Páginas enrutables (Landing, Courses, CourseDetail, etc.)
│   ├── App.jsx              # Definición de rutas
│   ├── ProtectedRoute.jsx   # Guard para rutas autenticadas
│   └── PublicRoute.jsx      # Guard para rutas públicas
├── public/
└── package.json
```

---

## 🧭 Navegación

```
/                        → Landing (pública)
/courses                 → Catálogo de cursos (pública)
/courseDetail/:id        → Detalle del curso (pública)
/login                   → Iniciar sesión (solo no autenticados)
/register                → Registro (solo no autenticados)
/dashboard               → Panel de control (requiere auth)
/coursePlayer/:id        → Reproductor del curso (requiere auth)
*                        → 404 Not Found
```

---

## 🚀 Instalación y Configuración

### Prerrequisitos

- Node.js >= 18
- Cuenta en [Supabase](https://supabase.com) con un proyecto configurado

### Pasos

```bash
# 1. Clonar el repositorio
git clone <repo-url>
cd Skillia

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env

# 4. Iniciar el servidor de desarrollo
npm run dev
```

### Variables de Entorno

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY=
```

---

*Hecho con ❤️ por [matiudev](https://github.com/matiudev)*
