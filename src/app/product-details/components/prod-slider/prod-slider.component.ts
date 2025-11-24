import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ProductService } from '../../../services/product.service';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
  brand?: string;
  featured?: boolean;
}

@Component({
  selector: 'app-prod-slider',
  templateUrl: './prod-slider.component.html',
  styleUrls: ['./prod-slider.component.scss']
})
export class ProdSliderComponent implements OnInit {

  products: Product[] = [];
  loading = true;

  customOptions: OwlOptions = {
    margin: 20,
    autoplay: true,
    autoplayTimeout: 4000,
    autoplayHoverPause: true,
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 600,
    navText: ['‹', '›'],
    responsive: {
      0: {
        items: 1,
        margin: 10
      },
      480: {
        items: 2,
        margin: 15
      },
      768: {
        items: 3,
        margin: 20
      },
      1024: {
        items: 4,
        margin: 20
      },
      1200: {
        items: 4,
        margin: 25
      }
    },
    nav: true,
    animateOut: 'fadeOut',
    animateIn: 'fadeIn'
  }

  // Función para navegar al detalle del producto
  viewProduct(productId: string) {
    console.log('Navegando a producto:', productId);
    this.router.navigate(['/product-detail'], {
      queryParams: { id: productId }
    }).then(success => {
      console.log('Navegación exitosa:', success);
    }).catch(error => {
      console.error('Error en navegación:', error);
    });
  }

  constructor(
    private router: Router,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.loading = true;

    // Usar productos de fallback con IDs reales siempre
    // porque el endpoint get_all requiere autenticación
    this.useFallbackProducts();
    this.loading = false;
  }

  useFallbackProducts() {
    // Productos de ejemplo con IDs reales de la BD
    this.products = [
      {
        _id: '690f88bed87dfe080187b672',
        name: 'Samsung Galaxy S24 Ultra',
        description: 'Smartphone de alta gama con pantalla AMOLED',
        price: 1299.99,
        imageUrl: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500&h=500&fit=crop',
        stock: 25,
        brand: 'Samsung',
        featured: true
      },
      {
        _id: '690f88bed87dfe080187b675',
        name: 'MacBook Pro 14 M3',
        description: 'Portátil profesional con chip M3',
        price: 2199.00,
        imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=500&fit=crop',
        stock: 15,
        brand: 'Apple',
        featured: true
      },
      {
        _id: '690f88bed87dfe080187b677',
        name: 'Sony WH-1000XM5',
        description: 'Auriculares inalámbricos premium',
        price: 399.99,
        imageUrl: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&h=500&fit=crop',
        stock: 50,
        brand: 'Sony',
        featured: true
      },
      {
        _id: '690f88bed87dfe080187b679',
        name: 'Samsung 65 QLED 4K Q80C',
        description: 'Smart TV QLED de 65 pulgadas con resolución 4K',
        price: 1499.00,
        imageUrl: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500&h=500&fit=crop',
        stock: 12,
        brand: 'Samsung',
        featured: false
      },
      {
        _id: '690f88bed87dfe080187b67b',
        name: 'PlayStation 5 Digital Edition',
        description: 'Consola de videojuegos de última generación',
        price: 449.99,
        imageUrl: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=500&h=500&fit=crop',
        stock: 30,
        brand: 'Sony',
        featured: true
      },
      {
        _id: '690f88bed87dfe080187b67d',
        name: 'iPhone 15 Pro Max',
        description: 'iPhone premium con chip A17 Pro',
        price: 1449.00,
        imageUrl: 'https://images.unsplash.com/photo-1592286927505-b0d6e3a8f3ac?w=500&h=500&fit=crop',
        stock: 20,
        brand: 'Apple',
        featured: true
      },
      {
        _id: '690f88bed87dfe080187b67f',
        name: 'Canon EOS R6 Mark II',
        description: 'Cámara mirrorless full frame de 24.2MP',
        price: 2499.00,
        imageUrl: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500&h=500&fit=crop',
        stock: 8,
        brand: 'Canon',
        featured: false
      },
      {
        _id: '690f88bed87dfe080187b681',
        name: 'Nike Air Max 2024',
        description: 'Zapatillas deportivas con tecnología Air Max',
        price: 179.99,
        imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop',
        stock: 100,
        brand: 'Nike',
        featured: false
      },
      {
        _id: '690f88bfd87dfe080187b683',
        name: 'Kindle Paperwhite 11 Gen',
        description: 'Lector de libros electrónicos con pantalla de 6.8 pulgadas',
        price: 149.99,
        imageUrl: 'https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=500&h=500&fit=crop',
        stock: 40,
        brand: 'Amazon',
        featured: false
      },
      {
        _id: '690f88bfd87dfe080187b685',
        name: 'Logitech MX Master 3S',
        description: 'Ratón inalámbrico ergonómico para profesionales',
        price: 99.99,
        imageUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop',
        stock: 60,
        brand: 'Logitech',
        featured: false
      }
    ];
  }

}
