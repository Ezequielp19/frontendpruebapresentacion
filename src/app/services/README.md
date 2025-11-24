# 📁 ÍNDICE DE SERVICIOS ANGULAR

## 🎯 SERVICIOS CONECTADOS A LA API (Backend)

### 🔐 Autenticación (3)
- `auth.service.ts` - Gestión local de autenticación (localStorage)
- `login.service.ts` - Endpoints de login y recuperación de contraseña
- `register.service.ts` - Endpoints de registro y verificación

### 👤 Usuarios y Perfil (1)
- `profile.service.ts` - Gestión de perfil de usuario

### 📦 Productos (3)
- `autonomous.service.ts` - Productos autónomos
- `dedicated.service.ts` - Productos dedicados
- `product.service.ts` - Tipos de productos

### 👨‍💼 Profesionales y Proveedores (2)
- `profesional.service.ts` - Servicios profesionales
- `providers.service.ts` - Proveedores de productos

### 🛒 E-commerce (3)
- `cart.service.ts` - Carrito de compras
- `orders.service.ts` - Órdenes y pedidos
- `wishlist.service.ts` - Lista de deseos

### ⭐ Reviews y Búsqueda (3)
- `reviews.service.ts` - Reseñas de productos/profesionales
- `search.service.ts` - Búsqueda general y autocompletado
- `categories.service.ts` - Categorías de productos

### 📺 Streaming (1)
- `streaming.service.ts` - Lives y transmisiones en vivo

### 💬 Comunicación (2)
- `messages.service.ts` - Mensajería entre usuarios
- `notifications.service.ts` - Notificaciones del sistema

### 💳 Pagos y Suscripciones (3)
- `subscriptions.service.ts` - Planes de suscripción
- `calculator.service.ts` - Calculadora de precios
- `payment.service.ts` - Procesamiento de pagos (legacy)

### 📸 Media y Archivos (1)
- `media.service.ts` - Subida de imágenes y archivos

### 🚗 Vehículos y Reservaciones (2)
- `vehicle.service.ts` - Gestión de vehículos
- `reservations.service.ts` - Reservaciones de servicios

### 🏆 Rankings y Estadísticas (3)
- `ranking.service.ts` - Rankings generales
- `prod-mas-vendidos.service.ts` - Productos más vendidos (legacy)
- `sellers-category-ranked.service.ts` - Vendedores rankeados (legacy)

---

## 🛠️ SERVICIOS AUXILIARES (No conectados a API)

### 🎨 UI/UX (2)
- `theme.service.ts` - Gestión de temas (claro/oscuro)
- `alertas.service.ts` - Alertas y notificaciones UI (SweetAlert2)

### 🌐 Internacionalización (1)
- `translation.service.ts` - Traducciones i18n

### 📧 Email (1)
- `emailjs.service.ts` - Envío de emails con EmailJS

### 📊 Datos Mock (2)
- `categories-lives.service.ts` - Datos mock de categorías de lives
- `data-envios.service.ts` - Datos mock de envíos
- `data-envios-two.service.ts` - Datos mock de envíos (v2)

### 🎥 WebRTC (1)
- `webrtc.service.ts` - Conexiones WebRTC para streaming

---

## 📊 ESTADÍSTICAS

### Por Estado
- **Conectados a API Backend:** 24 servicios
- **Servicios Auxiliares:** 10 servicios
- **Total:** 34 servicios

### Por Funcionalidad
- **Autenticación:** 3 servicios
- **Productos y E-commerce:** 9 servicios
- **Comunicación:** 2 servicios
- **Streaming y Media:** 3 servicios
- **Pagos:** 3 servicios
- **Otros:** 14 servicios

---

## 🎯 MAPEO ENDPOINTS → SERVICIOS

| Categoría API | Servicio | Archivo |
|---------------|----------|---------|
| `/auth/*` | LoginService, RegisterService | login.service.ts, register.service.ts |
| `/users/*` | ProfileService | profile.service.ts |
| `/autonomous/*` | AutonomousService | autonomous.service.ts |
| `/dedicated/*` | DedicatedService | dedicated.service.ts |
| `/professional/*` | ProfessionalService | profesional.service.ts |
| `/product-types` | ProductService | product.service.ts |
| `/providers/*` | ProvidersService | providers.service.ts |
| `/cart/*` | CartService | cart.service.ts |
| `/orders/*` | OrdersService | orders.service.ts |
| `/wishlist/*` | WishlistService | wishlist.service.ts |
| `/reviews/*` | ReviewsService | reviews.service.ts |
| `/search/*` | SearchService | search.service.ts |
| `/categories/*` | CategoriesService | categories.service.ts |
| `/streams/*` | StreamingService | streaming.service.ts |
| `/messages/*` | MessagesService | messages.service.ts |
| `/notifications/*` | NotificationsService | notifications.service.ts |
| `/subscriptions/*` | SubscriptionsService | subscriptions.service.ts |
| `/calculator/*` | CalculatorService | calculator.service.ts |
| `/media/*` | MediaService | media.service.ts |
| `/vehicles/*` | VehicleService | vehicle.service.ts |
| `/reservations/*` | ReservationsService | reservations.service.ts |
| `/ranking` | RankingService | ranking.service.ts |

---

## 🔍 SERVICIOS LEGACY (Candidatos para Refactorización)

Los siguientes servicios tienen funcionalidad duplicada o usan datos mock:

1. **payment.service.ts** - Usar SubscriptionsService y OrdersService
2. **prod-mas-vendidos.service.ts** - Usar RankingService
3. **sellers-category-ranked.service.ts** - Usar RankingService o ProvidersService
4. **categories-lives.service.ts** - Usar CategoriesService con datos reales
5. **data-envios.service.ts** - Usar OrdersService
6. **data-envios-two.service.ts** - Usar OrdersService

---

## ✅ CHECKLIST DE USO

Para usar un servicio en un componente:

1. **Importar el servicio**
```typescript
import { NombreService } from 'src/app/services/nombre.service';
```

2. **Inyectar en el constructor**
```typescript
constructor(private nombreService: NombreService) { }
```

3. **Usar en métodos**
```typescript
this.nombreService.metodo(parametros).subscribe({
  next: (response) => {
    // Manejar respuesta exitosa
  },
  error: (error) => {
    // Manejar error
  }
});
```

---

## 📝 CONVENCIONES

Todos los servicios siguen estas convenciones:

- ✅ Usan `HttpClient` de Angular
- ✅ Retornan `Observable<T>` tipado
- ✅ Usan `environment.apiUrl` para la base URL
- ✅ Tienen interfaces TypeScript exportadas
- ✅ Métodos con nombres descriptivos
- ✅ Comentarios indicando el endpoint usado

---

**Última actualización:** 8 de noviembre de 2025  
**Total de servicios:** 34
