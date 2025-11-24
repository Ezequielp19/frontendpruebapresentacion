import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertasService } from 'src/app/services/alertas.service';
import { ProfileService, AccountInfo } from 'src/app/services/profile.service';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.scss'],
})
export class AccountInfoComponent implements OnInit {
  
  formAccount!: FormGroup;
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
    this.formAccount = this.fb.group({
      // Datos que ya están en el registro (solo lectura)
      email: [{ value: '', disabled: true }],
      
      // Información adicional
      phone: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit(): void {
    // Cargar datos del usuario actual si existen
    this.loadCurrentUserData();
  }

  loadCurrentUserData() {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.formAccount.patchValue({
        email: currentUser.email || '',
        phone: currentUser.phone || ''
      });
    }
  }

  submitRegister() {
    if (!this.formAccount.valid) {
      this.alertaService.showError('Error', 'Por favor, completa todos los campos requeridos');
      return;
    }

    this.isLoading = true;

    const phone = this.formAccount.get('phone')?.value;
    const email = this.authService.getCurrentUser()?.email || '';

    // Actualizar teléfono
    const accountInfo: AccountInfo = {
      email: email,
      phone: phone,
      password: '' // No cambiar contraseña
    };

    this.profileService.updateAccountInfo(accountInfo).subscribe({
      next: (response) => {
        this.isLoading = false;
        
        if (response.success) {
          Swal.fire('¡Éxito!', 'Información de cuenta actualizada correctamente', 'success');
          // Actualizar el usuario en localStorage
          this.authService.updateUserData(response.user);
        } else {
          this.alertaService.showError('Error', response.message || 'Error al actualizar la información');
        }
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error updating account info:', error);
        
        if (error.status === 401) {
          this.alertaService.showError('Error', 'Sesión expirada. Por favor, inicia sesión nuevamente');
        } else {
          this.alertaService.showError('Error', 'Ocurrió un error al actualizar la información');
        }
      }
    });
  }

  // Método para manejar el cambio de contraseña (funcionalidad separada)
  changePassword() {
    Swal.fire({
      title: 'Cambiar Contraseña',
      text: 'Para cambiar tu contraseña, necesitarás verificar tu identidad. ¿Deseas continuar?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Sí, continuar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Aquí podrías redirigir a una página específica para cambio de contraseña
        // o abrir un modal con el proceso de verificación
        this.alertaService.showError('Funcionalidad en desarrollo', 'El cambio de contraseña estará disponible próximamente');
      }
    });
  }
}
