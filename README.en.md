# 🚀 LikeVendor - E-commerce Platform and Services

[![Angular](https://img.shields.io/badge/Angular-16.0.0-red.svg)](https://angular.io/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.0-blue.svg)](https://getbootstrap.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0.0-blue.svg)](https://www.typescriptlang.org/)
[![SCSS](https://img.shields.io/badge/SCSS-1.60.0-pink.svg)](https://sass-lang.com/)

## 📋 Table of Contents

- [Project Description](#-project-description)
- [Main Features](#-main-features)
- [Technologies Used](#-technologies-used)
- [Project Structure](#-project-structure)
- [Installation and Setup](#-installation-and-setup)
- [Available Scripts](#-available-scripts)
- [Application Architecture](#-application-architecture)
- [Main Components](#-main-components)
- [Application Routes](#-application-routes)
- [Responsive Features](#-responsive-features)
- [Integrations](#-integrations)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

## 🎯 Project Description

**LikeVendor** is a comprehensive e-commerce and services platform that connects sellers, professionals, and providers with customers. The application offers a complete ecosystem for managing products, live services, rankings, and commercial transactions.

### 🌟 Purpose
- Facilitate the sale of products and services
- Connect professionals with potential clients
- Provide business management tools
- Create an integrated commercial community

## ✨ Main Features

### 🛍️ **E-commerce**
- Product catalog with categories
- Integrated purchase system
- Inventory management
- Advanced search filters

### 📺 **Lives and Streaming**
- Live product broadcasts
- Specialized categories (Electronics, Beauty, Clothing)
- YouTube integration
- Real-time interaction system

### 👥 **User Management**
- Multiple roles (Seller, Professional, Provider)
- Customizable profiles
- Secure authentication system
- Personalized dashboard by role

### 💼 **Professional Services**
- Service publication
- Quote system
- Portfolio management
- Ratings and reviews

### 📊 **Ranking and Analytics**
- Scoring system
- Performance metrics
- User comparisons
- Detailed reports

## 🛠️ Technologies Used

### **Frontend Framework**
- **Angular 16** - Main application framework
- **TypeScript 5.0** - Typed programming language
- **SCSS** - Advanced CSS preprocessor

### **UI/UX Libraries**
- **Bootstrap 5.3** - Responsive CSS framework
- **Angular Material** - Material Design components
- **ngx-owl-carousel-o** - Image carousel
- **ngx-toastr** - Notifications and alerts

### **Development Tools**
- **Angular CLI** - Command line tools
- **Karma + Jasmine** - Testing framework
- **Prettier** - Code formatting
- **ESLint** - Static code analysis

### **Integrations**
- **ngx-translate** - Internationalization (i18n)
- **HttpClient** - API communication
- **Router** - Navigation and routing
- **Interceptors** - HTTP request handling

## 📁 Project Structure

```
prueba-front/frontend/
├── 📁 src/
│   ├── 📁 app/
│   │   ├── 📁 all-department/          # Department management
│   │   ├── 📁 best-selling-prod/       # Best selling products
│   │   ├── 📁 buy-prod/                # Purchase process
│   │   ├── 📁 choose-role/             # User role selection
│   │   ├── 📁 dashboard-flete/         # Freight dashboard
│   │   ├── 📁 dashboard-live/          # Live streaming dashboard
│   │   ├── 📁 dashboard-profesional/   # Professional dashboard
│   │   ├── 📁 dashboard-provider/      # Provider dashboard
│   │   ├── 📁 dashboard-user/          # User dashboard
│   │   ├── 📁 envios-info/             # Shipping information
│   │   ├── 📁 footer-section/          # Footer section
│   │   ├── 📁 home/                    # Main page
│   │   ├── 📁 icons/                   # Application icons
│   │   ├── 📁 interceptors/            # HTTP interceptors
│   │   ├── 📁 layout/                  # Main layout
│   │   ├── 📁 lives/                   # Live streaming
│   │   ├── 📁 lives-category/          # Live categories
│   │   ├── 📁 princing-plans/          # Pricing plans
│   │   ├── 📁 preview-profile/         # Profile preview
│   │   ├── 📁 product-details/         # Product details
│   │   ├── 📁 profile-settings/        # Profile settings
│   │   ├── 📁 ranking/                 # Ranking system
│   │   ├── 📁 services/                # Professional services
│   │   ├── 📁 shared/                  # Shared components
│   │   ├── 📁 system-payment/          # Payment system
│   │   ├── 📁 vehicle-filter/          # Vehicle filters
│   │   ├── 📁 your-service/            # Service management
│   │   ├── 📄 app.component.*          # Main component
│   │   ├── 📄 app.module.ts            # Main module
│   │   └── 📄 app-routing.module.ts    # Route configuration
│   ├── 📁 assets/                      # Static resources
│   ├── 📁 environments/                # Environment configurations
│   ├── 📁 styles/                      # Global styles
│   ├── 📄 index.html                   # Main HTML
│   ├── 📄 main.ts                      # Entry point
│   └── 📄 polyfills.ts                 # Browser polyfills
├── 📁 node_modules/                    # Installed dependencies
├── 📄 angular.json                     # Angular configuration
├── 📄 package-lock.json                # Dependency lock
├── 📄 tsconfig.json                    # TypeScript configuration
├── 📄 vercel.json                      # Vercel configuration
└── 📄 README.md                        # This file
```

## 🚀 Installation and Setup

### **Prerequisites**
- **Node.js** (version 18.x or higher)
- **npm** (version 9.x or higher)
- **Angular CLI** (version 16.x)

### **Installation**

1. **Clone the repository**
```bash
git clone <repository-url>
cd prueba-front/frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
```bash
# Copy configuration file
cp src/environments/environment.example.ts src/environments/environment.ts

# Edit variables according to your environment
nano src/environments/environment.ts
```

4. **Run in development mode**
```bash
ng serve
```

5. **Open in browser**
```
http://localhost:4200
```

## 📜 Available Scripts

### **Development**
```bash
# Development server
npm start
ng serve

# Server with specific configuration
ng serve --configuration=development

# Server with proxy
ng serve --proxy-config proxy.conf.json
```

### **Build**
```bash
# Production build
npm run build
ng build --configuration=production

# Development build
ng build --configuration=development

# Build with bundle analysis
ng build --stats-json
```

### **Testing**
```bash
# Run unit tests
npm test
ng test

# Run tests with coverage
ng test --code-coverage

# Run e2e tests
ng e2e
```

### **Linting and Formatting**
```bash
# Static code analysis
ng lint

# Automatic formatting
npm run format
npx prettier --write "src/**/*.{ts,html,scss}"
```

## 🏗️ Application Architecture

### **Modular Architecture**
The application follows Angular's modular architecture with:

- **AppModule** - Root module with global configurations
- **SharedModule** - Shared components and services
- **Feature Modules** - Specific functionality modules
- **Lazy Loading** - Deferred module loading for optimization

### **Design Patterns**
- **Component-Based Architecture** - Reusable components
- **Service Layer Pattern** - Business logic in services
- **Interceptor Pattern** - Centralized HTTP request handling
- **Guard Pattern** - Route protection and authentication

### **State Management**
- **Reactive Forms** - Reactive forms for validation
- **Template-Driven Forms** - Template-based forms
- **Local Storage** - Local data persistence
- **Session Management** - User session management

## 🧩 Main Components

### **Layout and Navigation**
- **LayoutComponent** - Main application structure
- **HeaderComponent** - Header with main navigation
- **NavComponent** - Secondary navigation bar
- **FooterComponent** - Footer with useful links

### **Authentication and Users**
- **HeaderLoginComponent** - Login form
- **HeaderRegisterComponent** - Registration form
- **ProfileSettingsComponent** - Profile settings
- **ChooseRoleComponent** - User role selection

### **E-commerce**
- **HomeComponent** - Main page with featured products
- **ProductDetailsComponent** - Detailed product view
- **BuyProdComponent** - Purchase process
- **BestSellingProdComponent** - Best selling products

### **Lives and Streaming**
- **LivesComponent** - Live streaming list
- **LiveSectionComponent** - Live sections by category
- **ElectronicsLivesComponent** - Electronics lives
- **BeautyLivesComponent** - Beauty lives
- **ClothesLivesComponent** - Clothing lives

### **Services and Professionals**
- **YourServiceComponent** - Service management
- **ServicesComponent** - Service catalog
- **DashboardProfesionalComponent** - Professional dashboard
- **DashboardProviderComponent** - Provider dashboard

### **Dashboard and Analytics**
- **DashboardUserComponent** - User dashboard
- **DashboardLiveComponent** - Live streaming dashboard
- **RankingComponent** - Ranking system
- **SystemPaymentComponent** - Payment management

## 🛣️ Application Routes

### **Public Routes**
```
/                   → Redirects to /home
/login              → Login form
/register           → Registration form
/about-us           → About us
/contacto           → Contact page
/legal              → Legal information
```

### **User Routes**
```
/home                → Main page
/profile             → Profile settings
/ranking             → Ranking system
/choose-role         → Role selection
```

### **E-commerce Routes**
```
/lives               → Live streaming
/lives-electronics   → Electronics lives
/lives-beauty        → Beauty lives
/lives-clothes       → Clothing lives
/product-details     → Product details
/buy-prod            → Purchase process
```

### **Service Routes**
```
/your-service        → Service management
/services            → Service catalog
```

### **Dashboard Routes**
```
/dashboard-user      → User dashboard
/dashboard-profesional → Professional dashboard
/dashboard-provider  → Provider dashboard
/dashboard-live      → Live streaming dashboard
/dashboard-flete     → Freight dashboard
```

### **System Routes**
```
/payment-method      → Payment methods
/email-verif-password → Email verification
/change-password     → Password change
/chat                → AI chat (Gemini)
```

## 📱 Responsive Features

### **Implemented Breakpoints**
- **Mobile First** - Mobile-optimized design
- **Tablet Portrait** - 768x1024px, 800x480px, 960x600px
- **Netbook** - 1024x600px, 1024x768px
- **Desktop** - 1024px and above

### **Resolution Optimizations**
- **1024x600** - Compact layout for netbooks
- **1024x768** - Optimized layout for tablets
- **Responsive Navbar** - Adaptive navigation
- **Flexible Grids** - Bootstrap responsive grid system

### **Adaptive Components**
- **Dropdown Menus** - Responsive dropdown menus
- **Product Cards** - Adaptive product cards
- **Form Layouts** - Forms that adjust to space
- **Navigation** - Navigation that collapses on mobile

## 🔌 Integrations

### **External APIs**
- **YouTube API** - Video integration in lives
- **Payment Gateways** - Payment processors
- **Email Services** - Email services
- **File Storage** - File storage

### **Chatbots and AI**
- **Landbot** - Customer service chatbot
- **Gemini AI** - Integrated AI assistant
- **Auto-Open Control** - Automatic opening configuration

### **Development Tools**
- **Vercel** - Deployment and hosting
- **AWS Amplify** - Cloud services
- **GitHub Actions** - CI/CD pipeline

## 🚀 Deployment

### **Vercel Deployment**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### **AWS Amplify Deployment**
```bash
# Configure Amplify
amplify init

# Deploy
amplify push
```

### **Production Build**
```bash
# Build for production
ng build --configuration=production

# Files are generated in dist/likeVendor/
```

### **Environment Variables**
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

## 🤝 Contributing

### **Workflow**
1. **Fork** the repository
2. **Create** a branch for your feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### **Code Standards**
- **TypeScript** - Use strict typing
- **Angular Style Guide** - Follow Angular conventions
- **SCSS** - Use variables and mixins
- **Responsive Design** - Mobile-first design
- **Testing** - Maintain test coverage

### **Naming Conventions**
- **Components**: `PascalCase` (e.g., `ProductCardComponent`)
- **Services**: `PascalCase` + `Service` (e.g., `UserService`)
- **Interfaces**: `PascalCase` + `Interface` (e.g., `UserInterface`)
- **Files**: `kebab-case` (e.g., `product-card.component.ts`)

## 📄 License

This project is under the MIT License. See the `LICENSE` file for more details.

## 📞 Contact and Support

- **Developer**: LikeVendor Development Team
- **Email**: development@likevendor.com
- **Documentation**: [docs.likevendor.com](https://docs.likevendor.com)
- **Issues**: [GitHub Issues](https://github.com/likevendor/frontend/issues)

## 🙏 Acknowledgments

- **Angular Team** - For the excellent framework
- **Bootstrap Team** - For the CSS component system
- **Angular Community** - For support and contributions
- **Beta Users** - For feedback and testing

---

**⭐ If this project has been helpful to you, consider giving it a star on GitHub!**

*Last updated: December 2024*


