import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
  brand?: string;
  category?: string;
  subcategory?: string;
  featured?: boolean;
  sku?: string;
}

@Component({
  selector: 'app-products-catalog-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  loading = true;

  // Filtros
  selectedCategory: string = 'all';
  searchQuery: string = '';
  sortBy: string = 'name'; // name, price-asc, price-desc, newest

  // Paginación
  currentPage: number = 1;
  itemsPerPage: number = 12;
  totalPages: number = 1;

  // Categorías disponibles
  categories = [
    { id: 'all', name: 'Todos los productos', icon: 'apps' },
    { id: 'Electrónica', name: 'Electrónica', icon: 'devices' },
    { id: 'Moda', name: 'Moda', icon: 'checkroom' },
    { id: 'Hogar', name: 'Hogar', icon: 'home' },
    { id: 'Deportes', name: 'Deportes', icon: 'sports_soccer' }
  ];

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadProducts();

    // Leer parámetros de la URL
    this.route.queryParams.subscribe(params => {
      if (params['category']) {
        this.selectedCategory = params['category'];
      }
      if (params['search']) {
        this.searchQuery = params['search'];
      }
      this.applyFilters();
    });
  }

  loadProducts() {
    this.loading = true;

    // Usar productos hardcodeados porque el endpoint requiere auth
    this.products = [
      {
        _id: '690f88bed87dfe080187b672',
        name: 'Samsung Galaxy S24 Ultra',
        description: 'Smartphone de alta gama con pantalla AMOLED de 6.8 pulgadas, procesador Snapdragon 8 Gen 3',
        price: 1299.99,
        imageUrl: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500&h=500&fit=crop',
        stock: 25,
        brand: 'Samsung',
        category: 'Electrónica',
        subcategory: 'Smartphones',
        featured: true,
        sku: 'SAMS24U-256'
      },
      {
        _id: '690f88bed87dfe080187b675',
        name: 'MacBook Pro 14 M3',
        description: 'Portátil profesional con chip M3, pantalla Liquid Retina XDR de 14.2 pulgadas',
        price: 2199.00,
        imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=500&fit=crop',
        stock: 15,
        brand: 'Apple',
        category: 'Electrónica',
        subcategory: 'Ordenadores',
        featured: true,
        sku: 'MBP14-M3-512'
      },
      {
        _id: '690f88bed87dfe080187b677',
        name: 'Sony WH-1000XM5',
        description: 'Auriculares inalámbricos premium con cancelación de ruido líder del mercado',
        price: 399.99,
        imageUrl: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&h=500&fit=crop',
        stock: 50,
        brand: 'Sony',
        category: 'Electrónica',
        subcategory: 'Audio',
        featured: true,
        sku: 'SONY-WH1000XM5-BK'
      },
      {
        _id: '690f88bed87dfe080187b679',
        name: 'Samsung 65 QLED 4K Q80C',
        description: 'Smart TV QLED de 65 pulgadas, resolución 4K, Quantum Processor 4K',
        price: 1499.00,
        imageUrl: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500&h=500&fit=crop',
        stock: 12,
        brand: 'Samsung',
        category: 'Electrónica',
        subcategory: 'Televisores',
        featured: false,
        sku: 'SAM-Q80C-65'
      },
      {
        _id: '690f88bed87dfe080187b67b',
        name: 'PlayStation 5 Digital Edition',
        description: 'Consola de videojuegos de última generación, SSD 825GB, 4K 120Hz',
        price: 449.99,
        imageUrl: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=500&h=500&fit=crop',
        stock: 30,
        brand: 'Sony',
        category: 'Electrónica',
        subcategory: 'Consolas',
        featured: true,
        sku: 'PS5-DIGITAL'
      },
      {
        _id: '690f88bed87dfe080187b67d',
        name: 'iPhone 15 Pro Max',
        description: 'iPhone premium con chip A17 Pro, pantalla Super Retina XDR de 6.7 pulgadas',
        price: 1449.00,
        imageUrl: 'https://images.unsplash.com/photo-1592286927505-b0d6e3a8f3ac?w=500&h=500&fit=crop',
        stock: 20,
        brand: 'Apple',
        category: 'Electrónica',
        subcategory: 'Smartphones',
        featured: true,
        sku: 'IP15PM-256-TI'
      },
      {
        _id: '690f88bed87dfe080187b67f',
        name: 'Canon EOS R6 Mark II',
        description: 'Cámara mirrorless full frame de 24.2MP, grabación 4K 60fps',
        price: 2499.00,
        imageUrl: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500&h=500&fit=crop',
        stock: 8,
        brand: 'Canon',
        category: 'Electrónica',
        subcategory: 'Fotografía',
        featured: false,
        sku: 'CANON-R6M2-BODY'
      },
      {
        _id: '690f88bed87dfe080187b681',
        name: 'Nike Air Max 2024',
        description: 'Zapatillas deportivas con tecnología Air Max, diseño moderno',
        price: 179.99,
        imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop',
        stock: 100,
        brand: 'Nike',
        category: 'Moda',
        subcategory: 'Calzado',
        featured: false,
        sku: 'NIKE-AM2024-BK'
      },
      {
        _id: '690f88bfd87dfe080187b683',
        name: 'Kindle Paperwhite 11 Gen',
        description: 'Lector de libros electrónicos con pantalla de 6.8 pulgadas sin reflejos',
        price: 149.99,
        imageUrl: 'https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=500&h=500&fit=crop',
        stock: 40,
        brand: 'Amazon',
        category: 'Electrónica',
        subcategory: 'E-readers',
        featured: false,
        sku: 'KINDLE-PW11-16GB'
      },
      {
        _id: '690f88bfd87dfe080187b685',
        name: 'Logitech MX Master 3S',
        description: 'Ratón inalámbrico ergonómico para profesionales, 8000 DPI',
        price: 99.99,
        imageUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop',
        stock: 60,
        brand: 'Logitech',
        category: 'Electrónica',
        subcategory: 'Accesorios',
        featured: false,
        sku: 'LOG-MXM3S-GR'
      },
      {
        _id: '690f88bfd87dfe080187b687',
        name: 'Nespresso Vertuo Next',
        description: 'Cafetera de cápsulas con tecnología Centrifusion',
        price: 179.00,
        imageUrl: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500&h=500&fit=crop',
        stock: 25,
        brand: 'Nespresso',
        category: 'Hogar',
        subcategory: 'Electrodomésticos',
        featured: false,
        sku: 'NESP-VNEXT-CHR'
      },
      {
        _id: '690f88bfd87dfe080187b689',
        name: 'Dyson V15 Detect',
        description: 'Aspiradora sin cable con tecnología de detección láser de polvo',
        price: 699.00,
        imageUrl: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=500&h=500&fit=crop',
        stock: 18,
        brand: 'Dyson',
        category: 'Hogar',
        subcategory: 'Electrodomésticos',
        featured: false,
        sku: 'DYSON-V15-DETECT'
      }
    ];

    this.loading = false;
    this.applyFilters();
  }

  applyFilters() {
    let filtered = [...this.products];

    // Filtrar por categoría
    if (this.selectedCategory && this.selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === this.selectedCategory);
    }

    // Filtrar por búsqueda
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.brand?.toLowerCase().includes(query)
      );
    }

    // Ordenar
    switch (this.sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'newest':
        filtered.reverse(); // Asumiendo que los más nuevos están al final
        break;
    }

    this.filteredProducts = filtered;
    this.totalPages = Math.ceil(this.filteredProducts.length / this.itemsPerPage);
    this.currentPage = 1; // Reset a primera página al filtrar
  }

  onCategoryChange(category: string) {
    this.selectedCategory = category;
    this.applyFilters();

    // Actualizar URL
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { category: category !== 'all' ? category : null },
      queryParamsHandling: 'merge'
    });
  }

  onSearchChange() {
    this.applyFilters();
  }

  onSortChange() {
    this.applyFilters();
  }

  viewProduct(productId: string) {
    this.router.navigate(['/product-detail'], {
      queryParams: { id: productId }
    });
  }

  get paginatedProducts(): Product[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredProducts.slice(start, end);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  get pageNumbers(): number[] {
    const pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  // Obtener nombre legible de la categoría
  getCategoryName(categoryId: string): string {
    const category = this.categories.find(c => c.id === categoryId);
    return category ? category.name : categoryId;
  }
}
