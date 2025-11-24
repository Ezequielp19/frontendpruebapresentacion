import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertasService } from 'src/app/services/alertas.service';
import { ProfileService, PersonalInfo } from 'src/app/services/profile.service';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.scss'],
})
export class PersonalInformationComponent implements OnInit {
  formPersonalInfo!: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private alertaService: AlertasService,
    private profileService: ProfileService,
    private authService: AuthService
  ) {
    this.createForm();
  }

  createForm() {
    this.formPersonalInfo = this.fb.group({
      // Datos que ya están en el registro (solo lectura)
      name: [{ value: '', disabled: true }],
      lastName: [{ value: '', disabled: true }],
      email: [{ value: '', disabled: true }],
      
      // Información adicional
      dni: ['', [Validators.required, Validators.minLength(7)]],
      areaCode: ['', [Validators.required, Validators.minLength(2)]],
      phone: ['', [Validators.required, Validators.minLength(8)]],
      location: ['', [Validators.required, Validators.minLength(3)]],
      birthDate: ['', [Validators.required]],
      receiveNews: [false]
    });
  }

  ngOnInit(): void {
    // Cargar datos del usuario actual si existen
    this.loadCurrentUserData();
  }

  loadCurrentUserData() {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.formPersonalInfo.patchValue({
        name: currentUser.name || '',
        lastName: currentUser.last_name || '',
        email: currentUser.email || '',
        dni: currentUser.dni || '',
        areaCode: currentUser.area_code || '',
        phone: currentUser.phone || '',
        location: currentUser.location || '',
        birthDate: currentUser.birth_date || '',
        receiveNews: currentUser.receive_news || false
      });
    }
  }

  submitRegister() {
    if (!this.formPersonalInfo.valid) {
      this.alertaService.showError('Error', 'Por favor, completa todos los campos requeridos');
      return;
    }

    this.isLoading = true;

    // Solo enviar información adicional, no los datos del registro
    const personalInfo: PersonalInfo = {
      // Datos del registro (obtenidos del usuario actual)
      name: this.authService.getCurrentUser()?.name || '',
      lastName: this.authService.getCurrentUser()?.last_name || '',
      email: this.authService.getCurrentUser()?.email || '',
      
      // Información adicional del formulario
      dni: this.formPersonalInfo.get('dni')?.value,
      areaCode: this.formPersonalInfo.get('areaCode')?.value,
      phone: this.formPersonalInfo.get('phone')?.value,
      location: this.formPersonalInfo.get('location')?.value,
      birthDate: this.formPersonalInfo.get('birthDate')?.value,
      receiveNews: this.formPersonalInfo.get('receiveNews')?.value
    };

    this.profileService.savePersonalInfo(personalInfo).subscribe({
      next: (response) => {
        this.isLoading = false;
        
        if (response.success) {
          Swal.fire('¡Éxito!', 'Información personal guardada correctamente', 'success');
          // Actualizar el usuario en localStorage
          this.authService.updateUserData(response.user);
        } else {
          this.alertaService.showError('Error', response.message || 'Error al guardar la información');
        }
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error saving personal info:', error);
        
        if (error.status === 401) {
          this.alertaService.showError('Error', 'Sesión expirada. Por favor, inicia sesión nuevamente');
        } else {
          this.alertaService.showError('Error', 'Ocurrió un error al guardar la información');
        }
      }
    });
  }
}
