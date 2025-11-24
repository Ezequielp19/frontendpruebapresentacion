import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertasService } from 'src/app/services/alertas.service';
import { ProfileService, ProfileInfo } from 'src/app/services/profile.service';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    profileImage: string | null = null;
    formProfile: FormGroup = new FormGroup({});
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
    this.formProfile = this.fb.group({
      // Datos que ya están en el registro (solo lectura)
      name: [{ value: '', disabled: true }],
      lastName: [{ value: '', disabled: true }],
      email: [{ value: '', disabled: true }],
      
      // Información adicional específica del proveedor
      username: ['', [Validators.required, Validators.minLength(3)]],
      accountName: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void {
    // Cargar datos del usuario actual si existen
    this.loadCurrentUserData();
  }

  loadCurrentUserData() {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.formProfile.patchValue({
        name: currentUser.name || '',
        lastName: currentUser.last_name || '',
        email: currentUser.email || '',
        username: currentUser.nickname || '',
        accountName: currentUser.nickname ? `@${currentUser.nickname}` : '',
        description: currentUser.description || ''
      });
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profileImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  submitProfile() {
    if (!this.formProfile.valid) {
      this.alertaService.showError('Error', 'Por favor, completa todos los campos requeridos');
      return;
    }

    this.isLoading = true;

    // Crear FormData para enviar archivos
    const formData = new FormData();
    
    // Agregar datos del formulario
    formData.append('username', this.formProfile.get('username')?.value);
    formData.append('accountName', this.formProfile.get('accountName')?.value);
    formData.append('description', this.formProfile.get('description')?.value);
    
    // Agregar imagen si existe
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput && fileInput.files && fileInput.files[0]) {
      formData.append('profileImage', fileInput.files[0]);
    }

    this.profileService.saveProfileInfo(formData).subscribe({
      next: (response) => {
        this.isLoading = false;
        
        if (response.success) {
          Swal.fire('¡Éxito!', 'Perfil de proveedor guardado correctamente', 'success');
          // Actualizar el usuario en localStorage
          this.authService.updateUserData(response.user);
        } else {
          this.alertaService.showError('Error', response.message || 'Error al guardar el perfil');
        }
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error saving profile:', error);
        
        if (error.status === 401) {
          this.alertaService.showError('Error', 'Sesión expirada. Por favor, inicia sesión nuevamente');
        } else {
          this.alertaService.showError('Error', 'Ocurrió un error al guardar el perfil');
        }
      }
    });
  }
} 