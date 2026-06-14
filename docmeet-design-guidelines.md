# Guía de Diseño y UI/UX de DocMeet

Este documento contiene las reglas fundamentales de diseño, colores y patrones de componentes utilizados en el proyecto DocMeet. Cualquier desarrollador o asistente de IA debe seguir estrictamente estas directrices para mantener la coherencia visual, la experiencia de usuario (UX) premium y la modernidad del sistema.

## 1. Paleta de Colores (Brand Colors)
El sistema utiliza una paleta de colores basada en tonos azules y celestes que transmiten profesionalismo, salud y confianza.

- **Primario / Base**: `#3E90C8` (Usado para fondos sólidos, botones primarios).
- **Variante Primaria**: `#418FC8` (Usado frecuentemente en textos resaltados, bordes activos y gradientes).
- **Secundario / Acento**: `#6DC7DC` (Usado como complemento luminoso en gradientes).
- **Gradiente Principal**: `bg-gradient-to-r from-[#418FC8] to-[#6DC7DC]` (Se utiliza para botones principales, iconos de perfil, avatares y llamadas a la acción CTA).

## 2. Filosofía UI/UX
- **Diseño Premium y Moderno**: Se debe evitar un aspecto genérico. El sistema usa sombras suaves (`shadow-sm`, `shadow-md`), bordes redondeados pronunciados (`rounded-xl`, `rounded-2xl`, `rounded-3xl`) e interacciones fluidas.
- **Micro-animaciones**: Todos los botones y tarjetas interactivas deben incluir transiciones (`transition-all`, `transition-colors`, `duration-200` o `duration-300`). Al hacer hover en botones, se sugiere un efecto de elevación o escala (`hover:scale-105`, `hover:-translate-y-0.5`, `active:scale-95`).
- **Modo Oscuro (Dark Mode)**: La aplicación soporta modo oscuro usando la clase `dark:` de TailwindCSS. Los fondos en modo oscuro deben usar `dark:bg-slate-800` o `dark:bg-slate-900`, y los bordes `dark:border-slate-700`.

## 3. Patrones de Layout (Estructura)
- **App Principal**: Se divide en un `PatientSidebar.vue` (navegación lateral) y un área principal (`main`).
- **Dashboard Header**: El área principal lleva un `DashboardHeader.vue` anclado en la parte superior (`sticky top-0`) que incluye buscador, iconos de notificaciones, ajustes y un menú desplegable de perfil de usuario.
- **Responsive (Mobile First)**: 
  - Las tablas de datos estándar están PROHIBIDAS en vistas móviles si implican un scroll horizontal molesto (`overflow-x-auto`).
  - **Uso de Tarjetas (Cards)**: En pantallas pequeñas (`< 1024px`), las filas de una tabla deben transformarse o reemplazarse por una vista de Tarjetas apiladas (Card View).

## 4. Tipografía e Iconografía
- **Tipografía (Font Family)**: El proyecto utiliza una tipografía principal personalizada llamada `DocmeetFont`, con degradación a `'Inter', 'Poppins', sans-serif`. Esto garantiza una lectura moderna y limpia en pantallas de alta densidad.
- **Iconos**: El proyecto utiliza la librería **Phosphor Icons Vue** (`@phosphor-icons/vue`). No mezclar con FontAwesome, Heroicons u otras librerías. Los iconos suelen usar un tamaño de `h-5 w-5` o `h-6 w-6`.
- **Pesos de Texto**: Los títulos principales utilizan `font-extrabold` o `font-black`. Los textos secundarios usan `text-slate-500`.
- **Píldoras de Estado (Badges)**: Los estados (Confirmado, Pendiente, Cancelado) deben representarse con "píldoras" de colores con fondos de baja opacidad y texto intenso. Ejemplo:
  - Confirmado: `bg-green-100 text-green-700`
  - Pendiente: `bg-yellow-100 text-yellow-700`
  - Cancelado: `bg-red-100 text-red-700`

## 5. Componentes de Formulario
- **Inputs**: Utilizan `bg-slate-50 dark:bg-slate-900` con `border border-slate-200 dark:border-slate-700`.
- **Efecto Focus**: Al hacer foco, todos los inputs deben usar: `focus:outline-none focus:ring-2 focus:ring-[#6DC7DC]/50 focus:border-[#418FC8]`.

---
*Nota para IAs: Al generar código nuevo para DocMeet, lee este archivo primero y aplica estrictamente las clases de TailwindCSS y convenciones aquí detalladas.*
