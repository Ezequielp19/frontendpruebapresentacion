import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-section-last-admission',
  templateUrl: './section-last-admission.component.html',
  styleUrls: ['./section-last-admission.component.scss'],
})
export class SectionLastAdmissionComponent implements OnInit {
  // arrayProducts: any = [
  //   {
  //     title: 'Ganar $1000',
  //     image: '../../../assets/img/product.png',
  //   },
  //   {
  //     title: 'Ganar $500',
  //     image: '../../../assets/img/product-2.png',
  //   },
  //   {
  //     title: 'Ganar $800',
  //     image: '../../../assets/img/product-3.png',
  //   },
  //   {
  //     title: 'Ganar $420',
  //     image: '../../../assets/img/product-4.png',
  //   },
  //   {
  //     title: 'Ganar $1000',
  //     image: '../../../assets/img/product.png',
  //   },
  //   {
  //     title: 'Ganar $500',
  //     image: '../../../assets/img/product-2.png',
  //   },
  // ];

 products: any[] = [];
  chunkedProducts: any[][] = [];

   constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

loadProducts(): void {
  this.productService.getAllProducts().subscribe({
    next: (response) => {
      console.log('Respuesta del servidor:', response);


      this.products = (response?.response?.data?.products || []).slice(0, 3);

      // Si no hay productos del servidor, usar productos de ejemplo
      if (this.products.length === 0) {
        this.products = this.getFallbackProducts().slice(0, 3);
      }

      // this.chunkedProducts = this.chunkArray(this.products, 4); // Removed chunking logic

      console.log('Productos cargados:', this.products);
    },
    error: (error) => {
      console.error('Error al cargar productos:', error);
      // En caso de error, usar productos de ejemplo limitados a 3
      this.products = this.getFallbackProducts().slice(0, 3);
      this.chunkedProducts = this.chunkArray(this.products, 4);
    }
  });
}

  getFallbackProducts(): any[] {
    return [
      {
        _id: '690f88bed87dfe080187b672',
        name: 'Samsung Galaxy S24 Ultra',
        image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=300&fit=crop',
        price: 1299.99,
        commission: 194.99
      },
      {
        _id: '690f88bed87dfe080187b675',
        name: 'MacBook Pro 14 M3',
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop',
        price: 2199.00,
        commission: 329.85
      },
      {
        _id: '690f88bed87dfe080187b677',
        name: 'Sony WH-1000XM5',
        image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&h=300&fit=crop',
        price: 399.99,
        commission: 59.99
      },
      {
        _id: '690f88bed87dfe080187b679',
        name: 'Samsung 65" QLED 4K',
        image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=400&h=300&fit=crop',
        price: 1499.00,
        commission: 224.85
      },
      {
        _id: '690f88bed87dfe080187b67b',
        name: 'PlayStation 5 Digital',
        image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400&h=300&fit=crop',
        price: 449.99,
        commission: 67.49
      },
      {
        _id: '690f88bed87dfe080187b67d',
        name: 'iPhone 15 Pro Max',
        image: 'https://images.unsplash.com/photo-1592286927505-b6e13d6c7ffa?w=400&h=300&fit=crop',
        price: 1449.00,
        commission: 217.35
      },
      {
        _id: '690f88bed87dfe080187b67f',
        name: 'Canon EOS R6 Mark II',
        image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=300&fit=crop',
        price: 2499.00,
        commission: 374.85
      },
      {
        _id: '690f88bed87dfe080187b681',
        name: 'Nike Air Max 2024',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop',
        price: 179.99,
        commission: 26.99
      }
    ];
  }


  private chunkArray(array: any[], chunkSize: number): any[][] {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  }
}
