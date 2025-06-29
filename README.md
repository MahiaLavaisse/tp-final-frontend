# TP Final Frontend - Sistema de Autenticación

## 📌 Descripción del Proyecto
Aplicación React para gestión de usuarios que implementa un sistema completo de autenticación JWT. Permite registro, login y acceso a rutas protegidas con diseño completamente responsive (320px-2000px). Se integra con un backend Node.js/Express y MongoDB para persistencia de datos.

**Características principales:**
- Registro con validación en tiempo real
- Login con persistencia de sesión mediante localStorage
- Dashboard protegido con datos de usuario
- Diseño accesible con contrastes WCAG AA
- Componentes reutilizables y arquitectura modular
- Enrutamiento con parámetros dinámicos

**Despliegue:**  
https://tp-final-frontend.vercel.app

## 🛠️ Librerías Usadas
| Librería | Versión | Propósito |
|----------|---------|-----------|
| React | 18.2.0 | Biblioteca principal |
| React Router DOM | 6.22.3 | Enrutamiento y navegación |
| Axios | 1.6.8 | Comunicación con API |
| React Icons | 5.2.1 | Iconografía visual |
| Vite | 5.2.8 | Entorno de desarrollo |
| CSS Modules | 1.0.0 | Estilos componentizados |

## 💡 Dificultades y Aprendizajes
1. **Gestión de Autenticación**
   - Implementación de flujo JWT con localStorage
   - Creación de ProtectedRoute para rutas privadas
   - Interceptor Axios para incluir token automáticamente

2. **Validación de Formularios**
   - Desarrollo de validaciones personalizadas
   - Feedback visual para errores de usuario
   - Manejo de estados de carga y error

3. **Responsividad**
   - Adaptación de layouts para móviles (320px)
   - Uso de media queries para diferentes resoluciones
   - Pruebas en dispositivos virtuales

4. **Arquitectura de Componentes**
   - Creación de componentes reutilizables (Button, Input)
   - Organización por funcionalidad (auth, layout)
   - Optimización de renders con React.memo
