import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnChanges {
  @Input() workerData: any = {
    name: 'Usuario',
    profession: 'Profesional'
  };
  @Input() sellerProducts: any[] = [];
  @Input() loadingProducts: boolean = false;

  products: any[] = [];
  isLoading = false;

  constructor(
    private router: Router,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    // Si no se pasan productos desde el padre, cargar productos genéricos
    if (!this.sellerProducts || this.sellerProducts.length === 0) {
      this.loadProducts();
    } else {
      this.products = this.sellerProducts;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Detectar cambios en sellerProducts
    if (changes['sellerProducts'] && changes['sellerProducts'].currentValue) {
      this.products = changes['sellerProducts'].currentValue;
      this.isLoading = false;
    }

    // Detectar cambios en loadingProducts
    if (changes['loadingProducts']) {
      this.isLoading = changes['loadingProducts'].currentValue;
    }
  }

  loadProducts(): void {
    this.isLoading = true;

    // Cargar todos los productos
    this.productService.getAllProducts().subscribe({
      next: (response) => {
        if (response.success && response.products) {
          this.products = response.products.slice(0, 6); // Mostrar máximo 6 productos
        } else {
          this.products = [];
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar productos:', error);
        this.products = [];
        this.isLoading = false;
      }
    });
  }

  goToProductDetail(productId?: string): void {
    if (productId) {
      this.router.navigate(['/product-detail'], {
        queryParams: { id: productId }
      });
    } else {
      this.router.navigate(['/product-detail']);
    }
  }

  contactSeller(): void {
    const phoneNumber = '5491126387015'; // +54 9 11 2638-7015 sin espacios ni símbolos
    const message = `Hola, me interesa contactar con ${this.workerData.name} sobre sus productos.`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  }

}
