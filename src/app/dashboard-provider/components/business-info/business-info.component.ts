import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertasService } from 'src/app/services/alertas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-business-info',
  templateUrl: './business-info.component.html',
  styleUrls: ['./business-info.component.scss']
})
export class BusinessInfoComponent implements OnInit {

  formBusinessInfo!: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private alertaService: AlertasService
  ) {
    this.createForm();
  }

  createForm() {
    this.formBusinessInfo = this.fb.group({
      businessName: ['', [Validators.required, Validators.minLength(3)]],
      businessCategory: ['', [Validators.required]],
      businessDescription: ['', [Validators.required, Validators.minLength(20)]],
      contactEmail: ['', [Validators.required, Validators.email]],
      contactPhone: ['', [Validators.required, Validators.minLength(8)]],
      website: ['', [Validators.pattern('https?://.+')]],
      businessHours: ['', [Validators.required]],
      address: ['', [Validators.required, Validators.minLength(10)]],
      city: ['', [Validators.required]],
      province: ['', [Validators.required]],
      zipCode: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  ngOnInit(): void {
    // Aquí podrías cargar datos existentes si los hay
  }

  submitRegister() {
    if (!this.formBusinessInfo.valid) {
      this.alertaService.showError('Error', 'Por favor, completa todos los campos requeridos');
      return;
    }

    this.isLoading = true;

    // Simular envío de datos
    setTimeout(() => {
      this.isLoading = false;
      Swal.fire('¡Éxito!', 'Información del negocio guardada correctamente', 'success');
    }, 1000);
  }
} 