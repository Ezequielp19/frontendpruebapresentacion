import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertasService } from 'src/app/services/alertas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-billing-info',
  templateUrl: './billing-info.component.html',
  styleUrls: ['./billing-info.component.scss']
})
export class BillingInfoComponent implements OnInit {

  formBillingInfo!: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private alertaService: AlertasService
  ) {
    this.createForm();
  }

  createForm() {
    this.formBillingInfo = this.fb.group({
      docNumber: ['', [Validators.required, Validators.minLength(7)]],
      cuitCuil: ['', [Validators.required, Validators.minLength(10)]],
      taxpayerType: ['', [Validators.required]],
      businessName: ['', [Validators.required, Validators.minLength(3)]],
      cityName: ['', [Validators.required, Validators.minLength(3)]],
      streetName: ['', [Validators.required, Validators.minLength(3)]],
      streetNumber: ['', [Validators.required]],
      stateName: ['', [Validators.required, Validators.minLength(3)]],
      zipCode: ['', [Validators.required, Validators.minLength(4)]],
      comment: ['']
    });
  }

  ngOnInit(): void {
    // Aquí podrías cargar datos existentes si los hay
  }

  submitRegister() {
    if (!this.formBillingInfo.valid) {
      this.alertaService.showError('Error', 'Por favor, completa todos los campos requeridos');
      return;
    }

    this.isLoading = true;

    // Simular envío de datos
    setTimeout(() => {
      this.isLoading = false;
      Swal.fire('¡Éxito!', 'Información de facturación guardada correctamente', 'success');
    }, 1000);
  }
} 