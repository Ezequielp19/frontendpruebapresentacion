# 🚀 LikeVendor - Plataforma de Comercio Electrónico y Servicios

[![Angular](https://img.shields.io/badge/Angular-16.0.0-red.svg)](https://angular.io/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.0-blue.svg)](https://getbootstrap.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0.0-blue.svg)](https://www.typescriptlang.org/)
[![SCSS](https://img.shields.io/badge/SCSS-1.60.0-pink.svg)](https://sass-lang.com/)

## 📋 Tabla de Contenidos

- [Descripción del Proyecto](#-descripción-del-proyecto)
- [Características Principales](#-características-principales)
- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Instalación y Configuración](#-instalación-y-configuración)
- [Scripts Disponibles](#-scripts-disponibles)
- [Arquitectura de la Aplicación](#-arquitectura-de-la-aplicación)
- [Componentes Principales](#-componentes-principales)
- [Rutas de la Aplicación](#-rutas-de-la-aplicación)
- [Características Responsive](#-características-responsive)
- [Integraciones](#-integraciones)
- [Despliegue](#-despliegue)
- [Contribución](#-contribución)
- [Licencia](#-licencia)

## 🎯 Descripción del Proyecto

**LikeVendor** es una plataforma integral de comercio electrónico y servicios que conecta vendedores, profesionales y proveedores con clientes. La aplicación ofrece un ecosistema completo para la gestión de productos, servicios en vivo, rankings y transacciones comerciales.

### 🌟 Propósito
- Facilitar la venta de productos y servicios
- Conectar profesionales con clientes potenciales
- Proporcionar herramientas de gestión empresarial
- Crear una comunidad comercial integrada

## ✨ Características Principales

### 🛍️ **E-commerce**
- Catálogo de productos con categorías
- Sistema de compra integrado
- Gestión de inventario
- Filtros avanzados de búsqueda

### 📺 **Lives y Streaming**
- Transmisiones en vivo de productos
- Categorías especializadas (Electrónicos, Belleza, Ropa)
- Integración con YouTube
- Sistema de interacción en tiempo real

### 👥 **Gestión de Usuarios**
- Múltiples roles (Vendedor, Profesional, Proveedor)
- Perfiles personalizables
- Sistema de autenticación seguro
- Dashboard personalizado por rol

### 💼 **Servicios Profesionales**
- Publicación de servicios
- Sistema de cotizaciones
- Gestión de portafolios
- Calificaciones y reseñas

### 📊 **Ranking y Analytics**
- Sistema de puntuaciones
- Métricas de rendimiento
- Comparativas entre usuarios
- Reportes detallados

## 🛠️ Tecnologías Utilizadas

### **Frontend Framework**
- **Angular 16** - Framework principal de la aplicación
- **TypeScript 5.0** - Lenguaje de programación tipado
- **SCSS** - Preprocesador de CSS avanzado

### **UI/UX Libraries**
- **Bootstrap 5.3** - Framework CSS responsive
- **Angular Material** - Componentes de Material Design
- **ngx-owl-carousel-o** - Carrusel de imágenes
- **ngx-toastr** - Notificaciones y alertas

### **Herramientas de Desarrollo**
- **Angular CLI** - Herramientas de línea de comandos
- **Karma + Jasmine** - Testing framework
- **Prettier** - Formateo de código
- **ESLint** - Análisis estático de código

### **Integraciones**
- **ngx-translate** - Internacionalización (i18n)
- **HttpClient** - Comunicación con APIs
- **Router** - Navegación y enrutamiento
- **Interceptors** - Manejo de requests HTTP

## 📁 Estructura del Proyecto

```
prueba-front/frontend/
├── 📁 src/
│   ├── 📁 app/
│   │   ├── 📁 all-department/          # Gestión de departamentos
│   │   ├── 📁 best-selling-prod/       # Productos más vendidos
│   │   ├── 📁 buy-prod/                # Proceso de compra
│   │   ├── 📁 choose-role/             # Selección de rol de usuario
│   │   ├── 📁 dashboard-flete/         # Dashboard de fletes
│   │   ├── 📁 dashboard-live/          # Dashboard de transmisiones
│   │   ├── 📁 dashboard-profesional/   # Dashboard de profesionales
│   │   ├── 📁 dashboard-provider/      # Dashboard de proveedores
│   │   ├── 📁 dashboard-user/          # Dashboard de usuarios
│   │   ├── 📁 envios-info/             # Información de envíos
│   │   ├── 📁 footer-section/          # Sección de pie de página
│   │   ├── 📁 home/                    # Página principal
│   │   ├── 📁 icons/                   # Iconos de la aplicación
│   │   ├── 📁 interceptors/            # Interceptores HTTP
│   │   ├── 📁 layout/                  # Layout principal
│   │   ├── 📁 lives/                   # Transmisiones en vivo
│   │   ├── 📁 lives-category/          # Categorías de lives
│   │   ├── 📁 princing-plans/          # Planes de precios
│   │   ├── 📁 preview-profile/         # Vista previa de perfil
│   │   ├── 📁 product-details/         # Detalles de productos
│   │   ├── 📁 profile-settings/        # Configuración de perfil
│   │   ├── 📁 ranking/                 # Sistema de rankings
│   │   ├── 📁 services/                # Servicios profesionales
│   │   ├── 📁 shared/                  # Componentes compartidos
│   │   ├── 📁 system-payment/          # Sistema de pagos
│   │   ├── 📁 vehicle-filter/          # Filtros de vehículos
│   │   ├── 📁 your-service/            # Gestión de servicios
│   │   ├── 📄 app.component.*          # Componente principal
│   │   ├── 📄 app.module.ts            # Módulo principal
│   │   └── 📄 app-routing.module.ts    # Configuración de rutas
│   ├── 📁 assets/                      # Recursos estáticos
│   ├── 📁 environments/                # Configuraciones de entorno
│   ├── 📁 styles/                      # Estilos globales
│   ├── 📄 index.html                   # HTML principal
│   ├── 📄 main.ts                      # Punto de entrada
│   └── 📄 polyfills.ts                 # Polyfills del navegador
├── 📁 node_modules/                    # Dependencias instaladas
├── 📄 angular.json                     # Configuración de Angular
├── 📄 package-lock.json                # Lock de dependencias
├── 📄 tsconfig.json                    # Configuración de TypeScript
├── 📄 vercel.json                      # Configuración de Vercel
└── 📄 README.md                        # Este archivo
```

## 🚀 Instalación y Configuración

### **Prerrequisitos**
- **Node.js** (versión 18.x o superior)
- **npm** (versión 9.x o superior)
- **Angular CLI** (versión 16.x)

### **Instalación**

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd prueba-front/frontend
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
# Copiar archivo de configuración
cp src/environments/environment.example.ts src/environments/environment.ts

# Editar variables según tu entorno
nano src/environments/environment.ts
```

4. **Ejecutar en modo desarrollo**
```bash
ng serve
```

5. **Abrir en el navegador**
```
http://localhost:4200
```

## 📜 Scripts Disponibles

### **Desarrollo**
```bash
# Servidor de desarrollo
npm start
ng serve

# Servidor con configuración específica
ng serve --configuration=development

# Servidor con proxy
ng serve --proxy-config proxy.conf.json
```

### **Construcción**
```bash
# Construcción para producción
npm run build
ng build --configuration=production

# Construcción para desarrollo
ng build --configuration=development

# Construcción con análisis de bundles
ng build --stats-json
```

### **Testing**
```bash
# Ejecutar tests unitarios
npm test
ng test

# Ejecutar tests con coverage
ng test --code-coverage

# Ejecutar tests e2e
ng e2e
```

### **Linting y Formateo**
```bash
# Análisis estático del código
ng lint

# Formateo automático
npm run format
npx prettier --write "src/**/*.{ts,html,scss}"
```

## 🏗️ Arquitectura de la Aplicación

### **Arquitectura Modular**
La aplicación sigue una arquitectura modular de Angular con:

- **AppModule** - Módulo raíz con configuraciones globales
- **SharedModule** - Componentes y servicios compartidos
- **Feature Modules** - Módulos específicos por funcionalidad
- **Lazy Loading** - Carga diferida de módulos para optimización

### **Patrones de Diseño**
- **Component-Based Architecture** - Componentes reutilizables
- **Service Layer Pattern** - Lógica de negocio en servicios
- **Interceptor Pattern** - Manejo centralizado de requests HTTP
- **Guard Pattern** - Protección de rutas y autenticación

### **Gestión de Estado**
- **Reactive Forms** - Formularios reactivos para validación
- **Template-Driven Forms** - Formularios basados en template
- **Local Storage** - Persistencia local de datos
- **Session Management** - Gestión de sesiones de usuario

## 🧩 Componentes Principales

### **Layout y Navegación**
- **LayoutComponent** - Estructura principal de la aplicación
- **HeaderComponent** - Encabezado con navegación principal
- **NavComponent** - Barra de navegación secundaria
- **FooterComponent** - Pie de página con enlaces útiles

### **Autenticación y Usuarios**
- **HeaderLoginComponent** - Formulario de inicio de sesión
- **HeaderRegisterComponent** - Formulario de registro
- **ProfileSettingsComponent** - Configuración de perfil
- **ChooseRoleComponent** - Selección de rol de usuario

### **E-commerce**
- **HomeComponent** - Página principal con productos destacados
- **ProductDetailsComponent** - Vista detallada de productos
- **BuyProdComponent** - Proceso de compra
- **BestSellingProdComponent** - Productos más vendidos

### **Lives y Streaming**
- **LivesComponent** - Lista de transmisiones en vivo
- **LiveSectionComponent** - Secciones de lives por categoría
- **ElectronicsLivesComponent** - Lives de electrónicos
- **BeautyLivesComponent** - Lives de belleza
- **ClothesLivesComponent** - Lives de ropa

### **Servicios y Profesionales**
- **YourServiceComponent** - Gestión de servicios
- **ServicesComponent** - Catálogo de servicios
- **DashboardProfesionalComponent** - Dashboard de profesionales
- **DashboardProviderComponent** - Dashboard de proveedores

### **Dashboard y Analytics**
- **DashboardUserComponent** - Dashboard de usuarios
- **DashboardLiveComponent** - Dashboard de transmisiones
- **RankingComponent** - Sistema de rankings
- **SystemPaymentComponent** - Gestión de pagos

## 🛣️ Rutas de la Aplicación

### **Rutas Públicas**
```
/                   → Redirige a /home
/login              → Formulario de inicio de sesión
/register           → Formulario de registro
/about-us           → Acerca de nosotros
/contacto           → Página de contacto
/legal              → Información legal
```

### **Rutas de Usuario**
```
/home                → Página principal
/profile             → Configuración de perfil
/ranking             → Sistema de rankings
/choose-role         → Selección de rol
```

### **Rutas de E-commerce**
```
/lives               → Transmisiones en vivo
/lives-electronics   → Lives de electrónicos
/lives-beauty        → Lives de belleza
/lives-clothes       → Lives de ropa
/product-details     → Detalles de producto
/buy-prod            → Proceso de compra
```

### **Rutas de Servicios**
```
/your-service        → Gestión de servicios
/services            → Catálogo de servicios
```

### **Rutas de Dashboard**
```
/dashboard-user      → Dashboard de usuario
/dashboard-profesional → Dashboard de profesional
/dashboard-provider  → Dashboard de proveedor
/dashboard-live      → Dashboard de transmisiones
/dashboard-flete     → Dashboard de fletes
```

### **Rutas de Sistema**
```
/payment-method      → Métodos de pago
/email-verif-password → Verificación de email
/change-password     → Cambio de contraseña
/chat                → Chat con IA (Gemini)
```

## 📱 Características Responsive

### **Breakpoints Implementados**
- **Mobile First** - Diseño optimizado para móviles
- **Tablet Portrait** - 768x1024px, 800x480px, 960x600px
- **Netbook** - 1024x600px, 1024x768px
- **Desktop** - 1024px y superiores

### **Optimizaciones por Resolución**
- **1024x600** - Layout compacto para netbooks
- **1024x768** - Layout optimizado para tablets
- **Responsive Navbar** - Navegación adaptativa
- **Flexible Grids** - Sistema de grid Bootstrap responsive

### **Componentes Adaptativos**
- **Dropdown Menus** - Menús desplegables responsivos
- **Product Cards** - Tarjetas de productos adaptativas
- **Form Layouts** - Formularios que se ajustan al espacio
- **Navigation** - Navegación que se colapsa en móviles

## 🔌 Integraciones

### **APIs Externas**
- **YouTube API** - Integración de videos en lives
- **Payment Gateways** - Procesadores de pago
- **Email Services** - Servicios de correo electrónico
- **File Storage** - Almacenamiento de archivos

### **Chatbots y IA**
- **Landbot** - Chatbot de atención al cliente
- **Gemini AI** - Asistente de IA integrado
- **Auto-Open Control** - Configuración de apertura automática

### **Herramientas de Desarrollo**
- **Vercel** - Despliegue y hosting
- **AWS Amplify** - Servicios en la nube
- **GitHub Actions** - CI/CD pipeline

## 🚀 Despliegue

### **Despliegue en Vercel**
```bash
# Instalar Vercel CLI
npm i -g vercel

# Desplegar
vercel --prod
```

### **Despliegue en AWS Amplify**
```bash
# Configurar Amplify
amplify init

# Desplegar
amplify push
```

### **Build de Producción**
```bash
# Construir para producción
ng build --configuration=production

# Los archivos se generan en dist/likeVendor/
```

### **Variables de Entorno**
```typescript
// environment.prod.ts
export const environment = {
  production: true,
  apiUrl: 'https://api.likevendor.com',
  youtubeApiKey: 'YOUR_YOUTUBE_API_KEY',
  landbotConfig: {
    autoOpen: false,
    disableAnimations: false
  }
};
```

## 🤝 Contribución

### **Flujo de Trabajo**
1. **Fork** del repositorio
2. **Crear** una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** de tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. **Push** a la rama (`git push origin feature/AmazingFeature`)
5. **Abrir** un Pull Request

### **Estándares de Código**
- **TypeScript** - Usar tipado estricto
- **Angular Style Guide** - Seguir las convenciones de Angular
- **SCSS** - Usar variables y mixins
- **Responsive Design** - Diseño mobile-first
- **Testing** - Mantener cobertura de tests

### **Convenciones de Naming**
- **Componentes**: `PascalCase` (ej: `ProductCardComponent`)
- **Servicios**: `PascalCase` + `Service` (ej: `UserService`)
- **Interfaces**: `PascalCase` + `Interface` (ej: `UserInterface`)
- **Archivos**: `kebab-case` (ej: `product-card.component.ts`)

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Contacto y Soporte

- **Desarrollador**: Equipo de Desarrollo LikeVendor
- **Email**: desarrollo@likevendor.com
- **Documentación**: [docs.likevendor.com](https://docs.likevendor.com)
- **Issues**: [GitHub Issues](https://github.com/likevendor/frontend/issues)

## 🙏 Agradecimientos

- **Angular Team** - Por el excelente framework
- **Bootstrap Team** - Por el sistema de componentes CSS
- **Comunidad Angular** - Por el soporte y contribuciones
- **Usuarios Beta** - Por el feedback y testing

---

**⭐ Si este proyecto te ha sido útil, considera darle una estrella en GitHub!**

*Última actualización: Diciembre 2024*
