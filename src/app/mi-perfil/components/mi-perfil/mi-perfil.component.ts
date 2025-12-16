import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

interface Mensaje {
  id: number;
  remitente: string;
  asunto: string;
  mensaje: string;
  fecha: string;
  leido: boolean;
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

  misMensajes: Mensaje[] = [
    {
      id: 1,
      remitente: 'Juan Pérez',
      asunto: 'Consulta sobre producto',
      mensaje: 'Hola, me interesa saber más sobre el Smartphone Samsung Galaxy S21. ¿Tiene garantía?',
      fecha: '2024-01-15',
      leido: false
    },
    {
      id: 2,
      remitente: 'María González',
      asunto: 'Oferta especial',
      mensaje: 'Tenemos una oferta especial en laptops. ¿Te interesa?',
      fecha: '2024-01-14',
      leido: true
    },
    {
      id: 3,
      remitente: 'Carlos Rodríguez',
      asunto: 'Pregunta sobre envío',
      mensaje: '¿Cuánto tiempo tarda el envío a Buenos Aires?',
      fecha: '2024-01-13',
      leido: false
    },
    {
      id: 4,
      remitente: 'Ana Martínez',
      asunto: 'Seguimiento de pedido',
      mensaje: 'Quisiera saber el estado de mi pedido #12345',
      fecha: '2024-01-12',
      leido: true
    },
    {
      id: 5,
      remitente: 'Pedro Sánchez',
      asunto: 'Recomendación de producto',
      mensaje: '¿Podrías recomendarme un producto similar?',
      fecha: '2024-01-11',
      leido: false
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

  seccionActiva: string = 'productos';

  // Variables para la calculadora
  precioProducto: number = 0;
  planSeleccionado: number = 5; // 5%, 15% o 30%
  resultadoCalculo: any = null;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  cambiarSeccion(seccion: string): void {
    this.seccionActiva = seccion;
  }

  marcarMensajeLeido(mensaje: Mensaje): void {
    mensaje.leido = true;
  }

  getMensajesNoLeidos(): number {
    return this.misMensajes.filter(m => !m.leido).length;
  }

  verDetallesProducto(producto: Producto): void {
    if (producto._id) {
      this.router.navigate(['/product-detail'], {
        queryParams: { id: producto._id }
      });
    } else {
      // Fallback: usar el ID numérico si no hay _id
      this.router.navigate(['/product-detail'], {
        queryParams: { id: producto.id.toString() }
      });
    }
  }

  calcularGanancias(): void {
    if (!this.precioProducto || this.precioProducto <= 0) {
      this.resultadoCalculo = null;
      return;
    }

    const precioOriginal = this.precioProducto;
    const descuentoPlataforma = precioOriginal * 0.05; // 5% por uso de plataforma (no se muestra)
    const descuentoPlan = precioOriginal * (this.planSeleccionado / 100); // % del plan
    const gananciaRevendedor = precioOriginal * 0.01; // 1% siempre para el revendedor
    
    // Lo que le queda al empresario = Precio original - descuento plataforma - descuento plan - ganancia revendedor
    const gananciaEmpresario = precioOriginal - descuentoPlataforma - descuentoPlan - gananciaRevendedor;

    this.resultadoCalculo = {
      precioOriginal: precioOriginal,
      descuentoPlan: descuentoPlan,
      gananciaRevendedor: gananciaRevendedor,
      gananciaEmpresario: gananciaEmpresario,
      planPorcentaje: this.planSeleccionado
    };
  }

  limpiarCalculadora(): void {
    this.precioProducto = 0;
    this.planSeleccionado = 5;
    this.resultadoCalculo = null;
  }
}
