import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTabGroup } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  @ViewChild('tabGroup') tabGroup!: MatTabGroup;

  // Formulario principal
  mainForm: FormGroup;

  // Estados
  isLoading = false;
  currentStep = 0;

  // Datos del formulario
  formData = {
    nameService: '',
    category: '',
    description: '',
    priceMin: null,
    priceMax: null,
    status: '',
    location: '',
    paymentMethods: [],
    images: [],
    video: null
  };

  constructor(
    private productService: ProductService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.mainForm = this.fb.group({
      nameService: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      priceMin: [null, [Validators.required, Validators.min(0)]],
      priceMax: [null, [Validators.required, Validators.min(0)]],
      status: ['', Validators.required],
      location: ['', Validators.required],
      paymentMethods: [[], Validators.required]
    });
  }

  ngOnInit(): void {
    // Inicializar con datos por defecto si es necesario
  }

  // Navegar a la siguiente pestaña
  nextStep() {
    if (this.currentStep < 2) {
      this.currentStep++;
      this.tabGroup.selectedIndex = this.currentStep;
    }
  }

  // Navegar a la pestaña anterior
  previousStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
      this.tabGroup.selectedIndex = this.currentStep;
    }
  }

  // Enviar formulario completo al backend
  async submitForm() {
    if (this.mainForm.valid) {
      this.isLoading = true;

      try {
        // El backend espera un objeto product_info con name y description
        const productData = {
          product_info: {
            name: this.mainForm.get('nameService')?.value,
            description: this.mainForm.get('description')?.value || 'Servicio sin descripción',
            price: this.mainForm.get('priceMin')?.value || 0,
            stock: 100, // Stock por defecto
            category: this.mainForm.get('category')?.value || 'Servicios',
            location: this.mainForm.get('location')?.value || '',
            paymentMethods: this.mainForm.get('paymentMethods')?.value || [],
            status: this.mainForm.get('status')?.value || 'active',
            priceRange: {
              min: this.mainForm.get('priceMin')?.value || 0,
              max: this.mainForm.get('priceMax')?.value || 0
            }
          }
        };

        // Log para debugging
        console.log('📤 Datos enviados al backend:', productData);
        console.log('📋 Estado del formulario:', this.mainForm.value);
        console.log('✅ Formulario válido:', this.mainForm.valid);

        // Enviar al backend usando el endpoint correcto
        const response = await firstValueFrom(this.productService.createProduct(productData));

        console.log('✅ Servicio creado exitosamente:', response);

        // Mostrar mensaje de éxito
        alert('¡Servicio creado exitosamente!');

        // Limpiar formulario
        this.mainForm.reset();
        this.currentStep = 0;
        this.tabGroup.selectedIndex = 0;

        // Redirigir al dashboard
        this.router.navigate(['/dashboard']);

      } catch (error) {
        console.error('❌ Error al crear el servicio:', error);

        // Log detallado del error
        const httpError = error as any;
        if (httpError.status === 400) {
          console.error('🔍 Error 400 - Bad Request:');
          console.error('   Respuesta del servidor:', httpError.error);
        } else if (httpError.status === 401) {
          console.error('🔍 Error 401 - No autenticado:');
          console.error('   Debes iniciar sesión para crear servicios');
          alert('Debes iniciar sesión para crear servicios');
          this.router.navigate(['/login']);
          return;
        } else if (httpError.status === 403) {
          console.error('🔍 Error 403 - Sin permisos:');
          console.error('   No tienes permisos para crear servicios');
          alert('No tienes permisos para crear servicios. Debes ser profesional o proveedor.');
          return;
        }

        // Mostrar mensaje de error
        const errorMessage = httpError.error?.message || 'Error al crear el servicio';
        alert(`Error: ${errorMessage}. Revisa la consola para más detalles.`);

      } finally {
        this.isLoading = false;
      }
    } else {
      console.log('❌ Formulario inválido:', this.mainForm.errors);
      console.log('📋 Errores por campo:');

      // Marcar campos como touched para mostrar validaciones
      Object.keys(this.mainForm.controls).forEach(key => {
        const control = this.mainForm.get(key);
        if (control?.invalid) {
          console.log(`   - ${key}:`, control.errors);
        }
        control?.markAsTouched();
      });

      alert('Por favor, completa todos los campos requeridos.');
    }
  }

  // Validar si el paso actual es válido
  isCurrentStepValid(): boolean {
    switch (this.currentStep) {
      case 0: // Nombre de servicio
        return (this.mainForm.get('nameService')?.valid ?? false) &&
               (this.mainForm.get('category')?.valid ?? false);
      case 1: // Descripción de servicio
        return (this.mainForm.get('description')?.valid ?? false) &&
               (this.mainForm.get('priceMin')?.valid ?? false) &&
               (this.mainForm.get('priceMax')?.valid ?? false) &&
               (this.mainForm.get('status')?.valid ?? false) &&
               (this.mainForm.get('location')?.valid ?? false);
      case 2: // Métodos de pago
        return (this.mainForm.get('paymentMethods')?.valid ?? false);
      default:
        return false;
    }
  }

  // Obtener datos de los componentes hijos
  updateFormData(data: any, step: number) {
    switch (step) {
      case 0:
        this.mainForm.patchValue({
          nameService: data.nameService,
          category: data.category
        });
        break;
      case 1:
        this.mainForm.patchValue({
          description: data.description,
          priceMin: data.priceMin,
          priceMax: data.priceMax,
          status: data.status,
          location: data.location
        });
        break;
      case 2:
        this.mainForm.patchValue({
          paymentMethods: data.paymentMethods
        });
        break;
    }
  }
}
