import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AutonomousService } from 'src/app/services/autonomous.service';
import { DedicatedService } from 'src/app/services/dedicated.service';
import { ProfessionalService } from 'src/app/services/profesional.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  workerData: any = null;
  isLoading = true;
  sellerProducts: any[] = [];
  loadingProducts = false;
  sellerId: string = '';
  sellerType: string = '';

  constructor(
    private route: ActivatedRoute,
    private autonomousService: AutonomousService,
    private dedicatedService: DedicatedService,
    private professionalService: ProfessionalService,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    // Obtener los parámetros de la URL
    this.route.queryParams.subscribe(params => {
      console.log('Parámetros recibidos en preview-profile:', params);

      // Nuevo método: usando id y type
      if (params['id'] && params['type']) {
        this.loadSellerData(params['id'], params['type']);
      }
      // Método anterior: usando worker JSON
      else if (params['worker']) {
        try {
          this.workerData = JSON.parse(params['worker']);
          console.log('Datos del worker recibidos (método antiguo):', this.workerData);
          this.isLoading = false;
        } catch (error) {
          console.error('Error al parsear los datos del worker:', error);
          this.setDefaultData();
        }
      }
      // Sin parámetros
      else {
        console.warn('No se recibieron parámetros válidos');
        this.setDefaultData();
      }
    });
  }

  loadSellerData(id: string, type: string): void {
    console.log(`Cargando datos del vendedor: ID=${id}, Tipo=${type}`);
    this.isLoading = true;
    this.sellerId = id;
    this.sellerType = type;

    switch (type) {
      case 'autonomous':
        this.autonomousService.getAutonomousById(id).subscribe({
          next: (data: any) => {
            this.workerData = {
              name: data.name,
              username: data.username || data.name,
              profession: data.description || 'Autónomo',
              score: data.score || 0,
              description: data.description,
              about: data.about || 'Sin información disponible',
              category: data.category || 'General',
              price: data.price,
              location: data.location || 'Argentina',
              profileImage: data.profileImage || null,
              phone: data.phone || '',
              email: data.email || '',
              verified: data.verified || false
            };
            console.log('Datos de autónomo cargados:', this.workerData);
            this.isLoading = false;
            this.loadProducts();
          },
          error: (error: any) => {
            console.error('Error al cargar autónomo:', error);
            this.setDefaultData();
          }
        });
        break;

      case 'dedicated':
        this.dedicatedService.getDedicatedById(id).subscribe({
          next: (data: any) => {
            this.workerData = {
              name: data.name,
              username: data.username || data.name,
              profession: data.description || 'Dedicado',
              score: data.score || 0,
              description: data.description,
              about: data.about || 'Sin información disponible',
              category: data.category || 'General',
              price: data.price,
              location: data.location || 'Argentina',
              profileImage: data.profileImage || null,
              phone: data.phone || '',
              email: data.email || '',
              verified: data.verified || false,
              companyName: data.companyName || ''
            };
            console.log('Datos de dedicado cargados:', this.workerData);
            this.isLoading = false;
            this.loadProducts();
          },
          error: (error: any) => {
            console.error('Error al cargar dedicado:', error);
            this.setDefaultData();
          }
        });
        break;

      case 'professional':
        this.professionalService.getProfessionalById(id).subscribe({
          next: (data: any) => {
            this.workerData = {
              name: data.name,
              username: data.username || data.name,
              profession: data.profession || 'Profesional',
              score: data.score || 0,
              description: data.profession,
              about: data.about || 'Sin información disponible',
              category: data.category || 'General',
              experience: data.experience,
              location: data.location || 'Argentina',
              profileImage: data.profileImage || null,
              phone: data.phone || '',
              email: data.email || '',
              verified: data.verified || false,
              skills: data.skills || [],
              availability: data.availability || ''
            };
            console.log('Datos de profesional cargados:', this.workerData);
            this.isLoading = false;
            this.loadProducts();
          },
          error: (error: any) => {
            console.error('Error al cargar profesional:', error);
            this.setDefaultData();
          }
        });
        break;

      default:
        console.error('Tipo de vendedor no válido:', type);
        this.setDefaultData();
    }
  }

  loadProducts(): void {
    if (!this.sellerId || !this.sellerType) {
      console.warn('No se puede cargar productos: falta ID o tipo de vendedor');
      return;
    }

    this.loadingProducts = true;
    console.log(`Cargando productos para ${this.sellerType} con ID ${this.sellerId}`);

    // Usar el nuevo endpoint PÚBLICO que no requiere autenticación
    this.productService.getPublicProductsBySeller(this.sellerId, this.sellerType).subscribe({
      next: (response: any) => {
        console.log('Respuesta de productos públicos:', response);

        // El endpoint público devuelve: { success: true, count: X, products: [...] }
        if (response.success && response.products) {
          this.sellerProducts = response.products;
        } else {
          this.sellerProducts = [];
        }

        console.log(`Productos encontrados: ${this.sellerProducts.length}`, this.sellerProducts);
        this.loadingProducts = false;
      },
      error: (error: any) => {
        console.error('Error al cargar productos:', error);
        this.sellerProducts = [];
        this.loadingProducts = false;
      }
    });
  }  setDefaultData(): void {
    this.workerData = {
      name: 'Usuario',
      profession: 'Profesional',
      score: 0,
      description: 'Sin descripción disponible',
      image: null,
      location: 'Argentina',
      category: 'General'
    };
    this.isLoading = false;
  }

}

