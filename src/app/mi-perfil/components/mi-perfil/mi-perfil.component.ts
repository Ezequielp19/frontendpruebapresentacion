import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CalificacionesModalComponent } from '../calificaciones-modal/calificaciones-modal.component';
import { CambiarPasswordModalComponent } from '../cambiar-password-modal/cambiar-password-modal.component';

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  imagen: string;
  descripcion: string;
  categoria: string;
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
      categoria: 'Electrónica'
    },
    {
      id: 2,
      nombre: 'MacBook Pro 14 M3',
      precio: 2199.00,
      imagen: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=500&fit=crop',
      descripcion: 'Portátil profesional con chip M3, pantalla Liquid Retina XDR de 14.2 pulgadas, 16GB RAM, 512GB SSD',
      categoria: 'Electrónica'
    },
    {
      id: 3,
      nombre: 'Sony WH-1000XM5',
      precio: 399.99,
      imagen: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&h=500&fit=crop',
      descripcion: 'Auriculares inalámbricos premium con cancelación de ruido líder del mercado, 30 horas de batería',
      categoria: 'Electrónica'
    },
    {
      id: 4,
      nombre: 'iPhone 15 Pro Max',
      precio: 1449.00,
      imagen: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop',
      descripcion: 'Smartphone premium con chip A17 Pro, cámara de 48MP con zoom óptico 5x, titanio',
      categoria: 'Electrónica'
    },
    {
      id: 5,
      nombre: 'Kindle Paperwhite 11 Gen',
      precio: 149.99,
      imagen: 'https://images.unsplash.com/photo-1592861956120-e524fc739696?w=500&h=500&fit=crop',
      descripcion: 'E-reader con pantalla de 6.8 pulgadas, 16GB de almacenamiento, resistente al agua',
      categoria: 'Electrónica'
    },
    {
      id: 6,
      nombre: 'Canon EOS R6 Mark II',
      precio: 2499.00,
      imagen: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&h=500&fit=crop',
      descripcion: 'Cámara mirrorless profesional de 24.2MP, sensor full-frame, grabación 4K 60fps',
      categoria: 'Electrónica'
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
      clicks: 1250
    },
    {
      id: 7,
      nombre: 'PlayStation 5 Digital Edition',
      precio: 449.99,
      imagen: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500&h=500&fit=crop',
      descripcion: 'Consola de videojuegos de última generación, SSD 825GB, gráficos 4K 120Hz',
      categoria: 'Electrónica',
      clicks: 980
    },
    {
      id: 2,
      nombre: 'MacBook Pro 14 M3',
      precio: 2199.00,
      imagen: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=500&fit=crop',
      descripcion: 'Portátil profesional con chip M3, pantalla Liquid Retina XDR de 14.2 pulgadas',
      categoria: 'Electrónica',
      clicks: 750
    },
    {
      id: 4,
      nombre: 'iPhone 15 Pro Max',
      precio: 1449.00,
      imagen: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop',
      descripcion: 'Smartphone premium con chip A17 Pro, cámara de 48MP con zoom óptico 5x',
      categoria: 'Electrónica',
      clicks: 650
    },
    {
      id: 3,
      nombre: 'Sony WH-1000XM5',
      precio: 399.99,
      imagen: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&h=500&fit=crop',
      descripcion: 'Auriculares inalámbricos premium con cancelación de ruido líder del mercado',
      categoria: 'Electrónica',
      clicks: 520
    }
  ];

  seccionActiva: string = 'datos';
  periodoSeleccionado: string = 'mes'; // hora, dia, semana, mes, año
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
    imagenPerfil: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop'
  };

  // Variables para la calculadora
  precioProducto: number = 0;
  planSeleccionado: number = 5; // 5%, 15% o 30%
  resultadoCalculo: any = null;

  // Variables para edición de productos
  productoEditando: Producto | null = null;
  mostrarModalEdicion: boolean = false;
  productoEditado: Producto = {
    id: 0,
    nombre: '',
    precio: 0,
    imagen: '',
    descripcion: '',
    categoria: ''
  };

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
      }
    });

    // Agregar clicks a productos que están en productosMasClickeados
    this.productosMasClickeados.forEach(productoClickeado => {
      const producto = this.misProductos.find(p => p.id === productoClickeado.id);
      if (producto && productoClickeado.clicks) {
        producto.clicks = productoClickeado.clicks;
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

  // Datos de estadísticas
  estadisticas = {
    productosVendidos: {
      total: 1247,
      esteMes: 342,
      variacion: 15.3
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

  getPorcentajeProductosVendidos(): number {
    return (this.estadisticas.productosVendidos.esteMes / this.estadisticas.productosVendidos.total) * 100;
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

  abrirEdicionProducto(producto: Producto): void {
    this.productoEditando = producto;
    this.productoEditado = {
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      imagen: producto.imagen,
      descripcion: producto.descripcion,
      categoria: producto.categoria,
      _id: producto._id,
      clicks: producto.clicks,
      destacado: producto.destacado
    };
    this.mostrarModalEdicion = true;
  }

  cerrarModalEdicion(): void {
    this.mostrarModalEdicion = false;
    this.productoEditando = null;
  }

  guardarProductoEditado(): void {
    if (!this.productoEditando) return;

    // Buscar el producto en el array y actualizarlo
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

    this.cerrarModalEdicion();
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
      imagenPerfil: this.misDatos.imagenPerfil
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
