import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  activeTab: string = 'description';
  productId: string = ''; // ID del producto actual
  productData: any = null;

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  openDialog() {
    this.dialog.open(DialogDataExampleDialog, {
      data: {
        animal: 'panda',
      },
    });
  }

  // Productos de la base de datos (con IDs reales)
  allProducts: any[] = [
    {
      _id: '690f88bed87dfe080187b672',
      name: 'Samsung Galaxy S24 Ultra',
      description: 'Smartphone de alta gama con pantalla AMOLED de 6.8 pulgadas, procesador Snapdragon 8 Gen 3, cámara de 200MP, batería de 5000mAh',
      price: 1299.99,
      imageUrl: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500&h=500&fit=crop',
      stock: 25,
      brand: 'Samsung',
      category: 'Electrónica',
      subcategory: 'Smartphones',
      sku: 'SAM-S24U-256-BLK',
      featured: true
    },
    {
      _id: '690f88bed87dfe080187b675',
      name: 'MacBook Pro 14 M3',
      description: 'Portátil profesional con chip M3, pantalla Liquid Retina XDR de 14.2 pulgadas, 16GB RAM, 512GB SSD',
      price: 2199.00,
      imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=500&fit=crop',
      stock: 15,
      brand: 'Apple',
      category: 'Electrónica',
      subcategory: 'Laptops',
      sku: 'APPLE-MBP14-M3-512',
      featured: true
    },
    {
      _id: '690f88bed87dfe080187b677',
      name: 'Sony WH-1000XM5',
      description: 'Auriculares inalámbricos premium con cancelación de ruido líder del mercado, 30 horas de batería',
      price: 399.99,
      imageUrl: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&h=500&fit=crop',
      stock: 40,
      brand: 'Sony',
      category: 'Electrónica',
      subcategory: 'Audio',
      sku: 'SONY-WH1000XM5-BLK',
      featured: true
    },
    {
      _id: '690f88bed87dfe080187b679',
      name: 'Samsung 65" QLED 4K Q80C',
      description: 'Smart TV QLED de 65 pulgadas con resolución 4K, Quantum HDR, tasa de refresco 120Hz',
      price: 1499.00,
      imageUrl: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=500&h=500&fit=crop',
      stock: 8,
      brand: 'Samsung',
      category: 'Electrónica',
      subcategory: 'Televisores',
      sku: 'SAM-Q80C-65',
      featured: false
    },
    {
      _id: '690f88bed87dfe080187b67b',
      name: 'PlayStation 5 Digital Edition',
      description: 'Consola de videojuegos de última generación, SSD 825GB, gráficos 4K 120Hz',
      price: 449.99,
      imageUrl: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500&h=500&fit=crop',
      stock: 12,
      brand: 'Sony',
      category: 'Electrónica',
      subcategory: 'Gaming',
      sku: 'SONY-PS5-DIGITAL',
      featured: true
    },
    {
      _id: '690f88bed87dfe080187b67d',
      name: 'iPhone 15 Pro Max',
      description: 'Smartphone premium con chip A17 Pro, cámara de 48MP con zoom óptico 5x, titanio',
      price: 1449.00,
      imageUrl: 'https://images.unsplash.com/photo-1592286927505-b6e13d6c7ffa?w=500&h=500&fit=crop',
      stock: 18,
      brand: 'Apple',
      category: 'Electrónica',
      subcategory: 'Smartphones',
      sku: 'APPLE-IP15PM-256-TIT',
      featured: true
    },
    {
      _id: '690f88bed87dfe080187b67f',
      name: 'Canon EOS R6 Mark II',
      description: 'Cámara mirrorless profesional de 24.2MP, sensor full-frame, grabación 4K 60fps',
      price: 2499.00,
      imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&h=500&fit=crop',
      stock: 6,
      brand: 'Canon',
      category: 'Electrónica',
      subcategory: 'Fotografía',
      sku: 'CANON-R6M2-BODY',
      featured: false
    },
    {
      _id: '690f88bed87dfe080187b681',
      name: 'Nike Air Max 2024',
      description: 'Zapatillas deportivas con tecnología Air Max, diseño moderno, máxima comodidad',
      price: 179.99,
      imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop',
      stock: 50,
      brand: 'Nike',
      category: 'Moda',
      subcategory: 'Calzado',
      sku: 'NIKE-AM2024-10',
      featured: false
    },
    {
      _id: '690f88bfd87dfe080187b683',
      name: 'Kindle Paperwhite 11 Gen',
      description: 'E-reader con pantalla de 6.8 pulgadas, 16GB de almacenamiento, resistente al agua',
      price: 149.99,
      imageUrl: 'https://images.unsplash.com/photo-1592861956120-e524fc739696?w=500&h=500&fit=crop',
      stock: 35,
      brand: 'Amazon',
      category: 'Electrónica',
      subcategory: 'E-readers',
      sku: 'AMZ-KPW11-16GB',
      featured: false
    },
    {
      _id: '690f88bfd87dfe080187b685',
      name: 'Logitech MX Master 3S',
      description: 'Ratón inalámbrico ergonómico para profesionales, 8000 DPI, botones programables',
      price: 99.99,
      imageUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop',
      stock: 60,
      brand: 'Logitech',
      category: 'Electrónica',
      subcategory: 'Accesorios',
      sku: 'LOGI-MX3S-BLK',
      featured: false
    },
    {
      _id: '690f88bfd87dfe080187b687',
      name: 'Nespresso Vertuo Next',
      description: 'Cafetera de cápsulas con tecnología Centrifusion, 5 tamaños de taza',
      price: 179.00,
      imageUrl: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500&h=500&fit=crop',
      stock: 22,
      brand: 'Nespresso',
      category: 'Hogar',
      subcategory: 'Electrodomésticos',
      sku: 'NESP-VN-NEXT',
      featured: false
    },
    {
      _id: '690f88bfd87dfe080187b689',
      name: 'Dyson V15 Detect',
      description: 'Aspiradora inalámbrica con láser detector de polvo, filtración HEPA, 60 min batería',
      price: 699.00,
      imageUrl: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=500&h=500&fit=crop',
      stock: 10,
      brand: 'Dyson',
      category: 'Hogar',
      subcategory: 'Electrodomésticos',
      sku: 'DYSON-V15-DETECT',
      featured: true
    }
  ];

  shareProduct() {
    const productUrl = window.location.href;
    const productTitle = this.productData ? `${this.productData.name} - $${this.productData.price}` : 'Producto';
    const productDescription = this.productData?.description || 'Descubre este increíble producto';

    if (navigator.share) {
      // Usar Web Share API si está disponible
      navigator.share({
        title: productTitle,
        text: productDescription,
        url: productUrl
      }).then(() => {
        console.log('Producto compartido exitosamente');
      }).catch((error) => {
        console.log('Error al compartir:', error);
        this.fallbackShare(productUrl, productTitle);
      });
    } else {
      // Fallback para navegadores que no soportan Web Share API
      this.fallbackShare(productUrl, productTitle);
    }
  }

  private fallbackShare(url: string, title: string) {
    // Copiar URL al portapapeles
    navigator.clipboard.writeText(url).then(() => {
      alert('¡Enlace copiado al portapapeles!');
    }).catch(() => {
      // Fallback adicional si clipboard no está disponible
      const textArea = document.createElement('textarea');
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('¡Enlace copiado al portapapeles!');
    });
  }

  goToProfile() {
    this.router.navigate(['/preview-profile']);
  }

  // Función para comprar producto (usuario normal puede comprar desde directo o normal)
  buyProduct() {
    if (!this.productData) {
      Swal.fire({
        icon: 'warning',
        title: 'Producto no cargado',
        text: 'Por favor, espere a que el producto se cargue completamente',
        confirmButtonText: 'Entendido'
      });
      return;
    }

    // Verificar stock disponible
    if (this.productData.stock && this.productData.stock <= 0) {
      Swal.fire({
        icon: 'error',
        title: 'Sin stock',
        text: 'Este producto no tiene stock disponible',
        confirmButtonText: 'Entendido'
      });
      return;
    }

    // Preguntar al usuario si quiere comprar el producto
    Swal.fire({
      title: 'Comprar Producto',
      html: `
        <div style="text-align: left;">
          <p><strong>Producto:</strong> ${this.productData.name}</p>
          <p><strong>Precio:</strong> $${this.productData.price}</p>
          <p><strong>Stock disponible:</strong> ${this.productData.stock || 'N/A'} unidades</p>
        </div>
      `,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Comprar Ahora',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#236bd8'
    }).then((result) => {
      if (result.isConfirmed) {
        // Redirigir a la página de compra con el ID del producto
        this.router.navigate(['/buy-prod'], {
          queryParams: {
            productId: this.productId
          }
        });
      }
    });
  }

  // Función para guardar producto en wishlist
  saveProduct() {
    const token = localStorage.getItem('authToken');

    if (!token) {
      Swal.fire({
        icon: 'warning',
        title: 'Inicia sesión',
        text: 'Debes iniciar sesión para guardar productos',
        confirmButtonText: 'Ir a Login',
        showCancelButton: true,
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/login']);
        }
      });
      return;
    }

    // Aquí iría la lógica para guardar en wishlist
    Swal.fire({
      icon: 'success',
      title: '¡Guardado!',
      text: 'Producto agregado a tus favoritos',
      timer: 2000,
      showConfirmButton: false
    });
  }

  // Cargar datos del producto
  loadProductData() {
    // Scroll al inicio de la página inmediatamente
    window.scrollTo(0, 0);

    // Obtener ID del producto desde la URL usando ActivatedRoute
    this.route.queryParams.subscribe(params => {
      this.productId = params['id'] || '';

      if (this.productId) {
        console.log('Cargando producto con ID:', this.productId);

        // Buscar producto en el array local primero
        const localProduct = this.allProducts.find(p => p._id === this.productId);

        if (localProduct) {
          console.log('Producto encontrado en datos locales:', localProduct);
          this.productData = localProduct;
          // Scroll al inicio después de cargar el producto
          setTimeout(() => window.scrollTo(0, 0), 0);
        } else {
          // Si no está en local, intentar desde el backend
          this.productService.getProductDetails(this.productId).subscribe({
            next: (response) => {
              if (response.success && response.product) {
                this.productData = response.product;
                console.log('Producto cargado desde backend:', this.productData);
              } else {
                console.warn('No se encontró el producto con ID:', this.productId);
                // Usar primer producto como fallback
                this.productData = this.allProducts[0];
              }
              // Scroll al inicio después de cargar
              setTimeout(() => window.scrollTo(0, 0), 0);
            },
            error: (error) => {
              console.error('Error al cargar producto:', error);
              // Usar primer producto como fallback
              this.productData = this.allProducts[0];
              // Scroll al inicio
              setTimeout(() => window.scrollTo(0, 0), 0);
            }
          });
        }
      } else {
        console.warn('No se proporcionó ID de producto en la URL');
        // Si no hay ID, usar primer producto
        this.productData = this.allProducts[0];
        // Scroll al inicio
        setTimeout(() => window.scrollTo(0, 0), 0);
      }
    });
  }

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.loadProductData();
  }

}
@Component({
  selector: 'dialog-data-example-dialog',
  templateUrl: 'dialog-data-example-dialog.html',
  styleUrls: ['./main.component.scss'],
})
export class DialogDataExampleDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogDataExampleDialog) {}
}
