import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-description-service',
  templateUrl: './description-service.component.html',
  styleUrls: ['./description-service.component.scss']
})
export class DescriptionServiceComponent implements OnInit, OnDestroy {
  @Output() formDataChange = new EventEmitter<any>();

  descriptionForm: FormGroup;
  private subscriptions = new Subscription();

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder
  ) {
    this.descriptionForm = this.fb.group({
      description: ['', [Validators.required, Validators.minLength(10)]],
      priceMin: [null, [Validators.required, Validators.min(0)]],
      priceMax: [null, [Validators.required, Validators.min(0)]],
      status: ['', Validators.required],
      location: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Escuchar cambios en el formulario y emitir datos
    this.subscriptions.add(
      this.descriptionForm.valueChanges.subscribe(value => {
        this.emitFormData();
      })
    );
  }

  openDialog() {
    this.dialog.open(DialogElementsExampleDialog);
  }

  precioMinimo: number | null = null;
  precioMaximo: number | null = null;
  diferencia: number | null = null;
  tarifaServicio: number | null = null;

  calcularDiferencia() {
    if (this.precioMinimo !== null && this.precioMaximo !== null) {
      this.diferencia = this.precioMaximo - this.precioMinimo;
      this.tarifaServicio = (this.diferencia * 10) / 100;
    } else {
      this.diferencia = null;
    }
  }

  // Variables para almacenar las imágenes
  imagePreview1: string | null = null;
  imagePreview2: string | null = null;
  imagePreview3: string | null = null;
  imagePreview4: string | null = null;

  // Lógica para previsualizar la imagen seleccionada
  previewImage(event: any, imageNumber: number) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageUrl = reader.result as string;
        // Actualizar la vista previa dependiendo del número de la imagen
        switch (imageNumber) {
          case 1:
            this.imagePreview1 = imageUrl;
            break;
          case 2:
            this.imagePreview2 = imageUrl;
            break;
          case 3:
            this.imagePreview3 = imageUrl;
            break;
          case 4:
            this.imagePreview4 = imageUrl;
            break;
        }
      };
      reader.readAsDataURL(file);
    }
  }

  // Variable para almacenar la vista previa del video
  videoPreview: string | null = null;

  // Lógica para previsualizar el video seleccionado
  previewVideo(event: any) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('video')) {
      const reader = new FileReader();
      reader.onload = () => {
        this.videoPreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    } else {
      alert("Por favor, selecciona un archivo de video.");
    }
  }

  // Emitir datos del formulario al componente padre
  emitFormData() {
    if (this.descriptionForm.valid) {
      this.formDataChange.emit({
        description: this.descriptionForm.get('description')?.value,
        priceMin: this.descriptionForm.get('priceMin')?.value,
        priceMax: this.descriptionForm.get('priceMax')?.value,
        status: this.descriptionForm.get('status')?.value,
        location: this.descriptionForm.get('location')?.value
      });
    }
  }

  // Validar si el campo tiene error
  hasError(fieldName: string): boolean {
    const field = this.descriptionForm.get(fieldName);
    return field ? (field.invalid && (field.dirty || field.touched)) : false;
  }

  // Obtener mensaje de error
  getErrorMessage(fieldName: string): string {
    const field = this.descriptionForm.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) return 'Este campo es requerido';
      if (field.errors['minlength']) return `Mínimo ${field.errors['minlength'].requiredLength} caracteres`;
      if (field.errors['min']) return 'El valor debe ser mayor a 0';
    }
    return '';
  }

  // Validar que precio máximo sea mayor que mínimo
  validatePrices(): boolean {
    const priceMin = this.descriptionForm.get('priceMin')?.value;
    const priceMax = this.descriptionForm.get('priceMax')?.value;

    if (priceMin && priceMax && priceMax <= priceMin) {
      return false;
    }
    return true;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: 'dialog-elements-example-dialog.html',
})
export class DialogElementsExampleDialog {}
