import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { CalificacionesModalComponent } from '../calificaciones-modal/calificaciones-modal.component';
import { CambiarPasswordModalComponent } from '../cambiar-password-modal/cambiar-password-modal.component';

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  imagen: string;
  descripcion: string;
  categoria: string;
  stock?: number;
  clicks?: number;
  destacado?: boolean;
  _id?: string; // ID real del producto para navegación
}


@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.scss']
})
export class MiPerfilComponent implements OnInit {
  
  // Datos estáticos para presentación con imágenes reales
  misProductos: Producto[] = [
    {
      id: 1,
      nombre: 'Samsung Galaxy S24 Ultra',
      precio: 1299.99,
      imagen: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500&h=500&fit=crop',
      descripcion: 'Smartphone de alta gama con pantalla AMOLED de 6.8 pulgadas, procesador Snapdragon 8 Gen 3, cámara de 200MP, batería de 5000mAh',
      categoria: 'Electrónica',
      stock: 45
    },
    {
      id: 2,
      nombre: 'MacBook Pro 14 M3',
      precio: 2199.00,
      imagen: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=500&fit=crop',
      descripcion: 'Portátil profesional con chip M3, pantalla Liquid Retina XDR de 14.2 pulgadas, 16GB RAM, 512GB SSD',
      categoria: 'Electrónica',
      stock: 12
    },
    {
      id: 3,
      nombre: 'Sony WH-1000XM5',
      precio: 399.99,
      imagen: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&h=500&fit=crop',
      descripcion: 'Auriculares inalámbricos premium con cancelación de ruido líder del mercado, 30 horas de batería',
      categoria: 'Electrónica',
      stock: 78
    },
    {
      id: 4,
      nombre: 'iPhone 15 Pro Max',
      precio: 1449.00,
      imagen: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop',
      descripcion: 'Smartphone premium con chip A17 Pro, cámara de 48MP con zoom óptico 5x, titanio',
      categoria: 'Electrónica',
      stock: 23
    },
    {
      id: 5,
      nombre: 'Kindle Paperwhite 11 Gen',
      precio: 149.99,
      imagen: 'https://images.unsplash.com/photo-1592861956120-e524fc739696?w=500&h=500&fit=crop',
      descripcion: 'E-reader con pantalla de 6.8 pulgadas, 16GB de almacenamiento, resistente al agua',
      categoria: 'Electrónica',
      stock: 156
    },
    {
      id: 6,
      nombre: 'Canon EOS R6 Mark II',
      precio: 2499.00,
      imagen: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&h=500&fit=crop',
      descripcion: 'Cámara mirrorless profesional de 24.2MP, sensor full-frame, grabación 4K 60fps',
      categoria: 'Electrónica',
      stock: 8
    }
  ];


  productosDestacados: Producto[] = [
    {
      id: 7,
      nombre: 'PlayStation 5 Digital Edition',
      precio: 449.99,
      imagen: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500&h=500&fit=crop',
      descripcion: 'Consola de videojuegos de última generación, SSD 825GB, gráficos 4K 120Hz',
      categoria: 'Electrónica',
      destacado: true,
      stock: 15,
      _id: '690f88bed87dfe080187b67b'
    },
    {
      id: 8,
      nombre: 'MacBook Pro 14 M3',
      precio: 2199.00,
      imagen: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=500&fit=crop',
      descripcion: 'Portátil profesional con chip M3, pantalla Liquid Retina XDR de 14.2 pulgadas',
      categoria: 'Electrónica',
      destacado: true,
      stock: 12,
      _id: '690f88bed87dfe080187b675'
    },
    {
      id: 9,
      nombre: 'Dyson V15 Detect',
      precio: 699.00,
      imagen: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=500&h=500&fit=crop',
      descripcion: 'Aspiradora inalámbrica con láser detector de polvo, filtración HEPA, 60 min batería',
      categoria: 'Hogar',
      destacado: true,
      stock: 34,
      _id: '690f88bfd87dfe080187b689'
    }
  ];

  productosMasClickeados: Producto[] = [
    {
      id: 1,
      nombre: 'Samsung Galaxy S24 Ultra',
      precio: 1299.99,
      imagen: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500&h=500&fit=crop',
      descripcion: 'Smartphone de alta gama con pantalla AMOLED de 6.8 pulgadas, procesador Snapdragon 8 Gen 3',
      categoria: 'Electrónica',
      stock: 45,
      clicks: 1250
    },
    {
      id: 7,
      nombre: 'PlayStation 5 Digital Edition',
      precio: 449.99,
      imagen: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500&h=500&fit=crop',
      descripcion: 'Consola de videojuegos de última generación, SSD 825GB, gráficos 4K 120Hz',
      categoria: 'Electrónica',
      stock: 15,
      clicks: 980
    },
    {
      id: 2,
      nombre: 'MacBook Pro 14 M3',
      precio: 2199.00,
      imagen: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=500&fit=crop',
      descripcion: 'Portátil profesional con chip M3, pantalla Liquid Retina XDR de 14.2 pulgadas',
      categoria: 'Electrónica',
      stock: 12,
      clicks: 750
    },
    {
      id: 4,
      nombre: 'iPhone 15 Pro Max',
      precio: 1449.00,
      imagen: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop',
      descripcion: 'Smartphone premium con chip A17 Pro, cámara de 48MP con zoom óptico 5x',
      categoria: 'Electrónica',
      stock: 23,
      clicks: 650
    },
    {
      id: 3,
      nombre: 'Sony WH-1000XM5',
      precio: 399.99,
      imagen: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&h=500&fit=crop',
      descripcion: 'Auriculares inalámbricos premium con cancelación de ruido líder del mercado',
      categoria: 'Electrónica',
      stock: 78,
      clicks: 520
    }
  ];

  seccionActiva: string = 'datos';
  periodoSeleccionado: string = 'mes'; // hora, dia, semana, mes, año
  periodoSeleccionadoDirectos: string = 'mes'; // dia, semana, mes, año
  filtroProductos: string = 'todos'; // todos, destacados, masClickeados

  // Datos del perfil del usuario
  misDatos: any = {
    nombre: 'Juan',
    apellido: 'Pérez',
    email: 'juan.perez@example.com',
    telefono: '+54 11 2345-6789',
    direccion: 'Av. Corrientes 1234',
    ciudad: 'Buenos Aires',
    provincia: 'Buenos Aires',
    codigoPostal: 'C1043AAX',
    tipoUsuario: 'Empresario',
    plan: 'Plan 15% (15 empleados)',
    fechaRegistro: '2024-01-15',
    estado: 'Activo',
    imagenPerfil: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
    formaPago: {
      tipo: 'Tarjeta de Crédito',
      tipoTarjeta: 'Visa',
      numeroTarjeta: '****1234',
      fechaVencimiento: '12/25',
      nombreTitular: 'Juan Pérez',
      cvv: '***'
    }
  };

  // Datos del plan
  datosPlan: any = {
    planActual: 'Plan Estándar (15 empleados)',
    fechaContratacion: '2024-01-15',
    fechaVencimiento: '2025-01-15',
    precioMensual: 299.99,
    precioAnual: 2999.99,
    descuento: '15% por empleado',
    empleadosIncluidos: 15,
    empleadosActivos: 12,
    estado: 'Activo',
    metodoPago: 'Tarjeta de Crédito',
    ultimoPago: '2024-12-15',
    proximoPago: '2025-01-15',
    historialPagos: [
      { fecha: '2024-12-15', monto: 299.99, metodo: 'Tarjeta ****1234', estado: 'Pagado' },
      { fecha: '2024-11-15', monto: 299.99, metodo: 'Tarjeta ****1234', estado: 'Pagado' },
      { fecha: '2024-10-15', monto: 299.99, metodo: 'Tarjeta ****1234', estado: 'Pagado' }
    ]
  };

  planesDisponibles: any[] = [
    {
      nombre: 'Plan Básico',
      precioMensual: 99.99,
      precioAnual: 999.99,
      empleados: 5,
      descuento: 5,
      caracteristicas: [
        '5 empleados incluidos',
        'Soporte estándar',
        'Reportes básicos',
        'Hasta 100 productos'
      ],
      recomendado: false
    },
    {
      nombre: 'Plan Estándar',
      precioMensual: 299.99,
      precioAnual: 2999.99,
      empleados: 15,
      descuento: 15,
      caracteristicas: [
        '15 empleados incluidos',
        'Soporte prioritario',
        'Reportes avanzados',
        'Hasta 500 productos',
        'Funciones de marketing'
      ],
      recomendado: true,
      destacado: true
    },
    {
      nombre: 'Plan Premium',
      precioMensual: 599.99,
      precioAnual: 5999.99,
      empleados: 30,
      descuento: 30,
      caracteristicas: [
        '30 empleados incluidos',
        'Soporte 24/7 dedicado',
        'Reportes personalizados',
        'Productos ilimitados',
        'Integraciones avanzadas',
        'Gestor de cuenta personal'
      ],
      recomendado: false
    }
  ];

  // Variables para la calculadora
  precioProducto: number = 0;
  planSeleccionado: number = 5; // 5%, 15% o 30%
  resultadoCalculo: any = null;

  // Variables para edición de productos
  productoEditando: Producto | null = null;
  mostrarModalEdicion: boolean = false;
  esNuevoProducto: boolean = false;
  productoEditado: Producto = {
    id: 0,
    nombre: '',
    precio: 0,
    imagen: '',
    descripcion: '',
    categoria: '',
    stock: 0
  };

  // Variables para modal de plan
  mostrarModalPlan: boolean = false;

  // Variables para edición de datos del perfil
  mostrarModalEdicionDatos: boolean = false;
  datosEditados: any = {};


  constructor(
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    // Agregar productos destacados a misProductos si no están
    this.productosDestacados.forEach(productoDestacado => {
      const existe = this.misProductos.find(p => p.id === productoDestacado.id);
      if (!existe) {
        this.misProductos.push({ ...productoDestacado, destacado: true });
      } else {
        existe.destacado = true;
        if (productoDestacado.stock !== undefined) {
          existe.stock = productoDestacado.stock;
        }
      }
    });

    // Agregar clicks y stock a productos que están en productosMasClickeados
    this.productosMasClickeados.forEach(productoClickeado => {
      const producto = this.misProductos.find(p => p.id === productoClickeado.id);
      if (producto) {
        if (productoClickeado.clicks) {
          producto.clicks = productoClickeado.clicks;
        }
        if (productoClickeado.stock !== undefined) {
          producto.stock = productoClickeado.stock;
        }
      }
    });
  }

  cambiarSeccion(seccion: string): void {
    this.seccionActiva = seccion;
  }

  cambiarFiltroProductos(filtro: string): void {
    this.filtroProductos = filtro;
  }

  getProductosFiltrados(): Producto[] {
    switch (this.filtroProductos) {
      case 'destacados':
        return this.misProductos.filter(p => p.destacado === true);
      case 'masClickeados':
        return [...this.misProductos].sort((a, b) => (b.clicks || 0) - (a.clicks || 0));
      default:
        return this.misProductos;
    }
  }

  getCantidadDestacados(): number {
    return this.misProductos.filter(p => p.destacado === true).length;
  }

  calcularGanancias(): void {
    if (!this.precioProducto || this.precioProducto <= 0) {
      this.resultadoCalculo = null;
      return;
    }

    const precioOriginal = this.precioProducto;
    
    // Para el REVENDEDOR (lo que ve):
    const gananciaRevendedor = precioOriginal * 0.01; // 1% siempre para el revendedor
    
    // Para el EMPRESARIO (lo que se le descuenta):
    const descuentoPlataforma = precioOriginal * 0.05; // 5% por uso de plataforma (NO se muestra al revendedor)
    const descuentoPlan = precioOriginal * (this.planSeleccionado / 100); // % del plan según empleados contratados
    
    // Lo que le queda al empresario = Precio original - descuento plataforma - descuento plan - ganancia revendedor
    const gananciaEmpresario = precioOriginal - descuentoPlataforma - descuentoPlan - gananciaRevendedor;

    this.resultadoCalculo = {
      precioOriginal: precioOriginal,
      gananciaRevendedor: gananciaRevendedor,
      // Para el empresario:
      descuentoPlataforma: descuentoPlataforma,
      descuentoPlan: descuentoPlan,
      gananciaEmpresario: gananciaEmpresario,
      planPorcentaje: this.planSeleccionado
    };
  }

  limpiarCalculadora(): void {
    this.precioProducto = 0;
    this.planSeleccionado = 5;
    this.resultadoCalculo = null;
  }

  cambiarPeriodo(periodo: string): void {
    this.periodoSeleccionado = periodo;
  }

  cambiarPeriodoDirectos(periodo: string): void {
    this.periodoSeleccionadoDirectos = periodo;
  }

  // Datos de estadísticas
  estadisticas = {
    productosVendidos: {
      total: 1247,
      esteMes: 342,
      variacion: 15.3,
      productosMasVendidos: [
        { id: 1, nombre: 'Samsung Galaxy S24 Ultra', cantidad: 245, imagen: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500&h=500&fit=crop' },
        { id: 7, nombre: 'PlayStation 5 Digital Edition', cantidad: 189, imagen: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500&h=500&fit=crop' },
        { id: 2, nombre: 'MacBook Pro 14 M3', cantidad: 156, imagen: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=500&fit=crop' },
        { id: 3, nombre: 'Sony WH-1000XM5', cantidad: 134, imagen: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&h=500&fit=crop' },
        { id: 4, nombre: 'iPhone 15 Pro Max', cantidad: 128, imagen: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop' },
        { id: 5, nombre: 'Kindle Paperwhite 11 Gen', cantidad: 98, imagen: 'https://images.unsplash.com/photo-1592861956120-e524fc739696?w=500&h=500&fit=crop' },
        { id: 9, nombre: 'Dyson V15 Detect', cantidad: 87, imagen: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=500&h=500&fit=crop' },
        { id: 6, nombre: 'Canon EOS R6 Mark II', cantidad: 65, imagen: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&h=500&fit=crop' }
      ]
    },
    interaccionesDirecto: {
      total: 8934,
      promedio: 298,
      variacion: 8.7
    },
    visitasDirecto: {
      hora: [45, 52, 38, 67, 89, 102, 95, 78, 65, 72, 88, 94, 105, 98, 87, 76, 68, 79, 92, 101, 97, 85, 73, 66],
      dia: [234, 267, 189, 312, 298, 345, 389],
      semana: [1234, 1456, 1678, 1890],
      mes: [5234, 6123, 5890, 6789, 7234, 7890],
      año: [45234, 52341, 61234, 67890, 72341, 78901, 81234, 85678, 89012, 92345, 95678, 98901]
    },
    directosRealizados: {
      total: 156,
      dia: [3, 5, 2, 4, 6, 3, 4],
      semana: [18, 22, 19, 21],
      mes: [45, 52, 48, 51, 49, 53],
      año: [12, 15, 18, 22, 25, 28, 31, 29, 27, 24, 21, 19]
    },
    inscripcionesPorPlan: {
      plan5: 234,
      plan15: 156,
      plan30: 89
    },
    ratePerfil: {
      valor: 4.7,
      totalResenas: 1247,
      distribucion: {
        cinco: 856,
        cuatro: 234,
        tres: 98,
        dos: 45,
        uno: 14
      }
    }
  };

  getVisitasActuales(): number[] {
    switch (this.periodoSeleccionado) {
      case 'hora': return this.estadisticas.visitasDirecto.hora;
      case 'dia': return this.estadisticas.visitasDirecto.dia;
      case 'semana': return this.estadisticas.visitasDirecto.semana;
      case 'mes': return this.estadisticas.visitasDirecto.mes;
      case 'año': return this.estadisticas.visitasDirecto.año;
      default: return this.estadisticas.visitasDirecto.mes;
    }
  }

  getMaxVisitas(): number {
    const visitas = this.getVisitasActuales();
    return Math.max(...visitas, 1);
  }

  getPorcentajeVisita(valor: number): number {
    const max = this.getMaxVisitas();
    return (valor / max) * 100;
  }

  getTotalInscripciones(): number {
    return this.estadisticas.inscripcionesPorPlan.plan5 + 
           this.estadisticas.inscripcionesPorPlan.plan15 + 
           this.estadisticas.inscripcionesPorPlan.plan30;
  }

  getPorcentajePlan(plan: number): number {
    const total = this.getTotalInscripciones();
    const valor = plan === 5 ? this.estadisticas.inscripcionesPorPlan.plan5 :
                  plan === 15 ? this.estadisticas.inscripcionesPorPlan.plan15 :
                  this.estadisticas.inscripcionesPorPlan.plan30;
    return (valor / total) * 100;
  }

  getRatingKey(rating: number): string {
    switch (rating) {
      case 5: return 'cinco';
      case 4: return 'cuatro';
      case 3: return 'tres';
      case 2: return 'dos';
      case 1: return 'uno';
      default: return 'uno';
    }
  }

  getRatingValue(rating: number): number {
    const key = this.getRatingKey(rating);
    const distribucion: any = this.estadisticas.ratePerfil.distribucion;
    return distribucion[key];
  }

  getRatingPercentage(rating: number): number {
    const value = this.getRatingValue(rating);
    return (value / this.estadisticas.ratePerfil.totalResenas) * 100;
  }

  getRatingBackground(rating: number): string {
    switch (rating) {
      case 5: return 'linear-gradient(90deg, #27ae60, #2ecc71)';
      case 4: return 'linear-gradient(90deg, #3498db, #2980b9)';
      case 3: return 'linear-gradient(90deg, #f39c12, #e67e22)';
      case 2: return 'linear-gradient(90deg, #e74c3c, #c0392b)';
      case 1: return 'linear-gradient(90deg, #95a5a6, #7f8c8d)';
      default: return 'linear-gradient(90deg, #95a5a6, #7f8c8d)';
    }
  }

  getBarLabel(periodo: string, index: number): string {
    const diasSemana = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
    const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'];
    const mesesAno = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

    switch (periodo) {
      case 'hora': return index + 'h';
      case 'dia': return diasSemana[index] || '';
      case 'semana': return 'Sem ' + (index + 1);
      case 'mes': return meses[index] || '';
      case 'año': return mesesAno[index] || '';
      default: return '';
    }
  }

  getTotalVisitas(): number {
    const visitas = this.getVisitasActuales();
    return visitas.reduce((a, b) => a + b, 0);
  }

  getDirectosActuales(): number[] {
    switch (this.periodoSeleccionadoDirectos) {
      case 'dia': return this.estadisticas.directosRealizados.dia;
      case 'semana': return this.estadisticas.directosRealizados.semana;
      case 'mes': return this.estadisticas.directosRealizados.mes;
      case 'año': return this.estadisticas.directosRealizados.año;
      default: return this.estadisticas.directosRealizados.mes;
    }
  }

  getMaxDirectos(): number {
    const directos = this.getDirectosActuales();
    return Math.max(...directos, 1);
  }

  getPorcentajeDirecto(valor: number): number {
    const max = this.getMaxDirectos();
    return (valor / max) * 100;
  }

  getTotalDirectos(): number {
    const directos = this.getDirectosActuales();
    return directos.reduce((a, b) => a + b, 0);
  }

  getPeriodoLabelDirectos(): string {
    switch (this.periodoSeleccionadoDirectos) {
      case 'dia': return 'Día';
      case 'semana': return 'Semana';
      case 'mes': return 'Mes';
      case 'año': return 'Año';
      default: return 'Mes';
    }
  }

  iniciarLive(): void {
    // Navegar a la ruta de live para iniciar el stream
    this.router.navigate(['/live']);
  }

  getBarLabelDirectos(periodo: string, index: number): string {
    const diasSemana = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
    const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'];
    const mesesAno = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

    switch (periodo) {
      case 'dia': return diasSemana[index] || '';
      case 'semana': return 'Sem ' + (index + 1);
      case 'mes': return meses[index] || '';
      case 'año': return mesesAno[index] || '';
      default: return '';
    }
  }

  getPorcentajeProductosVendidos(): number {
    return (this.estadisticas.productosVendidos.esteMes / this.estadisticas.productosVendidos.total) * 100;
  }

  getProductBarColor(index: number): string {
    const colors = [
      'linear-gradient(90deg, #236bd8 10%, #04c2fc 50%, #6779d9 90%)',
      'linear-gradient(90deg, #27ae60 0%, #2ecc71 100%)',
      'linear-gradient(90deg, #f39c12 0%, #f1c40f 100%)',
      'linear-gradient(90deg, #e67e22 0%, #d35400 100%)',
      'linear-gradient(90deg, #9b59b6 0%, #8e44ad 100%)',
      'linear-gradient(90deg, #3498db 0%, #2980b9 100%)',
      'linear-gradient(90deg, #1abc9c 0%, #16a085 100%)',
      'linear-gradient(90deg, #95a5a6 0%, #7f8c8d 100%)'
    ];
    return colors[index % colors.length];
  }

  getStrokeDashArray(plan: number): string {
    const porcentaje = this.getPorcentajePlan(plan);
    return (porcentaje / 100) * 502.4 + ' 502.4';
  }

  getStrokeDashOffset(plan: number): string {
    if (plan === 15) {
      return '-' + ((this.getPorcentajePlan(5) / 100) * 502.4);
    } else if (plan === 30) {
      return '-' + (((this.getPorcentajePlan(5) + this.getPorcentajePlan(15)) / 100) * 502.4);
    }
    return '0';
  }

  getPeriodoLabel(): string {
    switch (this.periodoSeleccionado) {
      case 'hora': return 'Hora';
      case 'dia': return 'Día';
      case 'semana': return 'Semana';
      case 'mes': return 'Mes';
      case 'año': return 'Año';
      default: return 'Mes';
    }
  }

  abrirModalNuevoProducto(): void {
    this.esNuevoProducto = true;
    this.productoEditando = null;
    this.productoEditado = {
      id: 0,
      nombre: '',
      precio: 0,
      imagen: '',
      descripcion: '',
      categoria: '',
      stock: 0
    };
    this.mostrarModalEdicion = true;
  }

  abrirEdicionProducto(producto: Producto): void {
    this.esNuevoProducto = false;
    this.productoEditando = producto;
    this.productoEditado = {
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      imagen: producto.imagen,
      descripcion: producto.descripcion,
      categoria: producto.categoria,
      stock: producto.stock || 0,
      _id: producto._id,
      clicks: producto.clicks,
      destacado: producto.destacado
    };
    this.mostrarModalEdicion = true;
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      // Validar que sea una imagen
      if (!file.type.match('image.*')) {
        alert('Por favor selecciona un archivo de imagen válido');
        return;
      }

      // Validar tamaño (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('La imagen es demasiado grande. Por favor selecciona una imagen menor a 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e: any) => {
        // Convertir la imagen a base64 para mostrarla
        this.productoEditado.imagen = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onFileSelectedPerfil(event: any): void {
    const file = event.target.files[0];
    if (file) {
      // Validar que sea una imagen
      if (!file.type.match('image.*')) {
        Swal.fire({
          title: 'Error',
          text: 'Por favor selecciona un archivo de imagen válido',
          icon: 'error',
          confirmButtonColor: '#236bd8',
          confirmButtonText: 'Aceptar'
        });
        return;
      }

      // Validar tamaño (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        Swal.fire({
          title: 'Error',
          text: 'La imagen es demasiado grande. Por favor selecciona una imagen menor a 5MB',
          icon: 'error',
          confirmButtonColor: '#236bd8',
          confirmButtonText: 'Aceptar'
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e: any) => {
        // Convertir la imagen a base64 para mostrarla
        this.datosEditados.imagenPerfil = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  cerrarModalEdicion(): void {
    this.mostrarModalEdicion = false;
    this.productoEditando = null;
    this.esNuevoProducto = false;
    this.productoEditado = {
      id: 0,
      nombre: '',
      precio: 0,
      imagen: '',
      descripcion: '',
      categoria: '',
      stock: 0
    };
  }

  guardarProductoEditado(): void {
    if (this.esNuevoProducto) {
      // Crear nuevo producto
      const nuevoId = Math.max(...this.misProductos.map(p => p.id), 0) + 1;
      const nuevoProducto: Producto = {
        ...this.productoEditado,
        id: nuevoId,
        clicks: 0,
        destacado: false
      };
      this.misProductos.push(nuevoProducto);
    } else {
      // Actualizar producto existente
      if (!this.productoEditando) return;

      const index = this.misProductos.findIndex(p => p.id === this.productoEditando!.id);
      if (index !== -1) {
        this.misProductos[index] = { ...this.productoEditado };
      }

      // También actualizar en otros arrays si existe
      const indexDestacados = this.productosDestacados.findIndex(p => p.id === this.productoEditando!.id);
      if (indexDestacados !== -1) {
        this.productosDestacados[indexDestacados] = { ...this.productoEditado };
      }

      const indexClickeados = this.productosMasClickeados.findIndex(p => p.id === this.productoEditando!.id);
      if (indexClickeados !== -1) {
        this.productosMasClickeados[indexClickeados] = { ...this.productoEditado };
      }
    }

    this.cerrarModalEdicion();
  }

  eliminarProducto(producto: Producto): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas eliminar el producto "${producto.nombre}"? Esta acción no se puede deshacer.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#236bd8',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      background: '#ffffff',
      customClass: {
        confirmButton: 'swal2-confirm',
        cancelButton: 'swal2-cancel'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        // Eliminar de misProductos
        const index = this.misProductos.findIndex(p => p.id === producto.id);
        if (index !== -1) {
          this.misProductos.splice(index, 1);
        }

        // Eliminar de productosDestacados
        const indexDestacados = this.productosDestacados.findIndex(p => p.id === producto.id);
        if (indexDestacados !== -1) {
          this.productosDestacados.splice(indexDestacados, 1);
        }

        // Eliminar de productosMasClickeados
        const indexClickeados = this.productosMasClickeados.findIndex(p => p.id === producto.id);
        if (indexClickeados !== -1) {
          this.productosMasClickeados.splice(indexClickeados, 1);
        }

        Swal.fire({
          title: '¡Eliminado!',
          text: `El producto "${producto.nombre}" ha sido eliminado correctamente.`,
          icon: 'success',
          confirmButtonColor: '#236bd8',
          confirmButtonText: 'Aceptar',
          timer: 2000,
          timerProgressBar: true
        });
      }
    });
  }

  abrirModalPlan(): void {
    this.mostrarModalPlan = true;
  }

  cerrarModalPlan(): void {
    this.mostrarModalPlan = false;
  }

  esPlanActual(plan: any): boolean {
    return plan.nombre === this.datosPlan.planActual.split('(')[0].trim();
  }

  seleccionarPlan(plan: any): void {
    if (this.esPlanActual(plan)) {
      Swal.fire({
        title: 'Plan Actual',
        text: 'Ya tienes este plan contratado.',
        icon: 'info',
        confirmButtonColor: '#236bd8',
        confirmButtonText: 'Aceptar'
      });
      return;
    }
    
    Swal.fire({
      title: '¿Cambiar de plan?',
      text: `¿Estás seguro de que quieres cambiar a ${plan.nombre}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#236bd8',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cambiar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.datosPlan.planActual = `${plan.nombre} (${plan.empleados} empleados)`;
        this.datosPlan.descuento = `${plan.descuento}% por empleado`;
        this.datosPlan.precioMensual = plan.precioMensual;
        this.datosPlan.precioAnual = plan.precioAnual;
        this.datosPlan.empleadosIncluidos = plan.empleados;
        this.misDatos.plan = `${plan.nombre} (${plan.empleados} empleados)`;
        
        Swal.fire({
          title: '¡Plan actualizado!',
          text: `Has cambiado tu plan a ${plan.nombre}.`,
          icon: 'success',
          confirmButtonColor: '#236bd8',
          confirmButtonText: 'Aceptar',
          timer: 2000,
          timerProgressBar: true
        });
        
        this.cerrarModalPlan();
      }
    });
  }

  abrirEdicionDatos(): void {
    this.datosEditados = {
      nombre: this.misDatos.nombre,
      apellido: this.misDatos.apellido,
      email: this.misDatos.email,
      telefono: this.misDatos.telefono,
      direccion: this.misDatos.direccion,
      ciudad: this.misDatos.ciudad,
      provincia: this.misDatos.provincia,
      codigoPostal: this.misDatos.codigoPostal,
      tipoUsuario: this.misDatos.tipoUsuario,
      plan: this.misDatos.plan,
      fechaRegistro: this.misDatos.fechaRegistro,
      estado: this.misDatos.estado,
      imagenPerfil: this.misDatos.imagenPerfil,
      formaPago: {
        tipo: this.misDatos.formaPago?.tipo || 'Tarjeta de Crédito',
        tipoTarjeta: this.misDatos.formaPago?.tipoTarjeta || 'Visa',
        numeroTarjeta: this.misDatos.formaPago?.numeroTarjeta || '****1234',
        fechaVencimiento: this.misDatos.formaPago?.fechaVencimiento || '12/25',
        nombreTitular: this.misDatos.formaPago?.nombreTitular || this.misDatos.nombre + ' ' + this.misDatos.apellido,
        cvv: this.misDatos.formaPago?.cvv || '***'
      }
    };
    this.mostrarModalEdicionDatos = true;
  }

  cerrarModalEdicionDatos(): void {
    this.mostrarModalEdicionDatos = false;
    this.datosEditados = {};
  }

  guardarDatosEditados(): void {
    this.misDatos = { ...this.datosEditados };
    this.cerrarModalEdicionDatos();
  }

  abrirModalCalificaciones(): void {
    this.dialog.open(CalificacionesModalComponent, {
      width: '90%',
      maxWidth: '900px',
      maxHeight: '90vh',
      data: {
        calificaciones: this.calificacionesDetalladas,
        promedio: this.estadisticas.ratePerfil.valor,
        total: this.estadisticas.ratePerfil.totalResenas
      },
      panelClass: 'calificaciones-modal'
    });
  }

  abrirModalCambiarPassword(): void {
    const dialogRef = this.dialog.open(CambiarPasswordModalComponent, {
      width: '90%',
      maxWidth: '500px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.success) {
        // Simulación de cambio de contraseña exitoso (solo para presentación)
        console.log('Contraseña cambiada:', result.message);
        // Aquí podrías mostrar un mensaje de éxito si quisieras
      }
    });
  }

  // Datos de calificaciones detalladas
  calificacionesDetalladas: any[] = [
    {
      id: 1,
      usuario: 'María González',
      calificacion: 5,
      comentario: 'Excelente producto, muy satisfecha con la compra. La calidad superó mis expectativas.',
      fecha: '2024-01-20',
      producto: 'Samsung Galaxy S24 Ultra'
    },
    {
      id: 2,
      usuario: 'Carlos Rodríguez',
      calificacion: 5,
      comentario: 'Muy buen servicio y entrega rápida. El producto llegó en perfectas condiciones.',
      fecha: '2024-01-18',
      producto: 'MacBook Pro 14 M3'
    },
    {
      id: 3,
      usuario: 'Ana Martínez',
      calificacion: 4,
      comentario: 'Buen producto, cumple con lo esperado. La única pega es que el envío tardó un poco más de lo esperado.',
      fecha: '2024-01-15',
      producto: 'Sony WH-1000XM5'
    },
    {
      id: 4,
      usuario: 'Pedro Sánchez',
      calificacion: 5,
      comentario: 'Increíble calidad precio. Recomiendo totalmente este vendedor.',
      fecha: '2024-01-12',
      producto: 'iPhone 15 Pro Max'
    },
    {
      id: 5,
      usuario: 'Laura Fernández',
      calificacion: 5,
      comentario: 'Perfecto, todo excelente. Volveré a comprar sin duda.',
      fecha: '2024-01-10',
      producto: 'PlayStation 5 Digital Edition'
    },
    {
      id: 6,
      usuario: 'Roberto López',
      calificacion: 3,
      comentario: 'El producto está bien pero esperaba más por el precio. Funciona correctamente.',
      fecha: '2024-01-08',
      producto: 'Kindle Paperwhite 11 Gen'
    },
    {
      id: 7,
      usuario: 'Sofía García',
      calificacion: 5,
      comentario: 'Excelente atención al cliente y producto de primera calidad. Muy recomendado.',
      fecha: '2024-01-05',
      producto: 'Canon EOS R6 Mark II'
    },
    {
      id: 8,
      usuario: 'Diego Torres',
      calificacion: 4,
      comentario: 'Buen producto, funciona bien. El empaque podría mejorar un poco.',
      fecha: '2024-01-03',
      producto: 'Dyson V15 Detect'
    },
    {
      id: 9,
      usuario: 'Carmen Ruiz',
      calificacion: 2,
      comentario: 'El producto llegó con algunos defectos menores. El servicio al cliente resolvió el problema rápidamente.',
      fecha: '2024-01-01',
      producto: 'Samsung Galaxy S24 Ultra'
    },
    {
      id: 10,
      usuario: 'Javier Morales',
      calificacion: 5,
      comentario: 'Perfecto en todos los aspectos. Calidad, precio y servicio excelentes.',
      fecha: '2023-12-28',
      producto: 'MacBook Pro 14 M3'
    }
  ];
}
