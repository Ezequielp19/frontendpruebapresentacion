import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertasService } from 'src/app/services/alertas.service';
import { ProfileService, VehicleInfo } from 'src/app/services/profile.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vehicle-info',
  templateUrl: './vehicle-info.component.html',
  styleUrls: ['./vehicle-info.component.scss']
})
export class VehicleInfoComponent implements OnInit {

   // Variables para almacenar las imágenes previsualizadas
  imagePreview1: string | ArrayBuffer | null = null;
  imagePreview2: string | ArrayBuffer | null = null;
  imagePreview3: string | ArrayBuffer | null = null;

  private cuitPattern: any = /^[1-9]\d{2}-\d{8}-\d{1}$/;

  formRegister!: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private alertaService: AlertasService,
    private profileService: ProfileService
  ) {
    this.createForm();
  }

  createForm() {
    this.formRegister = this.fb.group({
      type: ['', [Validators.required]],
      brand: ['', [Validators.required]],
      model: ['', [Validators.required]],
      year: ['', [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]],
      licensePlate: ['', [Validators.required, Validators.pattern(this.cuitPattern)]],
      color: ['', [Validators.required]],
      kilometers: ['', [Validators.required, Validators.min(0)]],
      receiveNews: [false]
    });
  }

  get f() {
    return this.formRegister.controls;
  }

  submitRegister() {
    if (!this.formRegister.valid) {
      this.alertaService.showError('Error', 'Por favor, completa todos los campos requeridos');
      return;
    }

    this.isLoading = true;

    // Crear FormData para enviar archivos
    const formData = new FormData();
    
    // Agregar datos del formulario
    Object.keys(this.formRegister.value).forEach(key => {
      formData.append(key, this.formRegister.value[key]);
    });

    // Agregar archivos si existen
    const blueCardInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (blueCardInput && blueCardInput.files && blueCardInput.files[0]) {
      formData.append('blueCard', blueCardInput.files[0]);
    }

    // Agregar imágenes del vehículo
    const imageInputs = document.querySelectorAll('input[accept="image/*"]') as NodeListOf<HTMLInputElement>;
    imageInputs.forEach((input, index) => {
      if (input.files && input.files[0]) {
        formData.append(`images`, input.files[0]);
      }
    });

    this.profileService.saveVehicleInfo(formData).subscribe({
      next: (response) => {
        this.isLoading = false;
        
        if (response._id) {
          Swal.fire('¡Éxito!', 'Información del vehículo guardada correctamente', 'success');
          this.formRegister.reset();
          this.clearImagePreviews();
        } else {
          this.alertaService.showError('Error', 'Error al guardar la información del vehículo');
        }
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error saving vehicle info:', error);
        
        if (error.status === 401) {
          this.alertaService.showError('Error', 'Sesión expirada. Por favor, inicia sesión nuevamente');
        } else {
          this.alertaService.showError('Error', 'Ocurrió un error al guardar la información del vehículo');
        }
      }
    });
  }

  clearImagePreviews() {
    this.imagePreview1 = null;
    this.imagePreview2 = null;
    this.imagePreview3 = null;
  }

  ngOnInit(): void {
  }

   // Función para manejar la vista previa de las imágenes
  previewImage(event: any, imageNumber: number): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (imageNumber === 1) {
          this.imagePreview1 = reader.result;
        } else if (imageNumber === 2) {
          this.imagePreview2 = reader.result;
        } else if (imageNumber === 3) {
          this.imagePreview3 = reader.result;
        }
      };
      reader.readAsDataURL(file);
    }
  }
}
