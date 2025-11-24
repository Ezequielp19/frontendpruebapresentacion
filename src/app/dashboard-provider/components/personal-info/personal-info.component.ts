import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit {
  formPersonalInfo: FormGroup;
  isLoading: boolean = false;

  constructor(private fb: FormBuilder) {
    this.formPersonalInfo = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dni: ['', [Validators.required, Validators.minLength(7)]],
      areaCode: ['', [Validators.required, Validators.minLength(2)]],
      phone: ['', [Validators.required, Validators.minLength(8)]],
      birthDate: ['', Validators.required],
      location: ['', [Validators.required, Validators.minLength(3)]],
      receiveNews: [false]
    });
  }

  ngOnInit(): void {
    // Cargar datos del usuario si existen
    this.loadUserData();
  }

  loadUserData(): void {
    // Aquí cargarías los datos del usuario desde el servicio
    // Por ahora dejamos el formulario vacío
  }

  submitRegister(): void {
    if (this.formPersonalInfo.valid) {
      this.isLoading = true;
      console.log('Datos del formulario:', this.formPersonalInfo.value);
      
      // Simular una llamada al servicio
      setTimeout(() => {
        // Aquí enviarías los datos al servicio
        console.log('Información guardada exitosamente');
        this.isLoading = false;
      }, 2000);
    }
  }

  onSubmit(): void {
    if (this.formPersonalInfo.valid) {
      console.log('Datos del formulario:', this.formPersonalInfo.value);
      // Aquí enviarías los datos al servicio
    }
  }
} 