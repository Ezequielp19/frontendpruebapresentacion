import { Component, OnInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { AlertasService } from '../../services/alertas.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegisterService, RegisterRequest } from '../../services/register.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-codeverif',
  templateUrl: './codeverif.component.html',
  styleUrls: ['./codeverif.component.scss']
})
export class CodeverifComponent implements OnInit {

  private regexNumber: any = /^[a-zA-Z0-9]+$/;
  formRegister!: FormGroup;
  isLoading = false;
  userData: RegisterRequest | null = null;

  @ViewChildren('codeInput') codeInputs!: QueryList<ElementRef>;

  formNumber() {
    this.formRegister = this.fb.group({
      number1: ['', [Validators.required]],
      number2: ['', [Validators.required]],
      number3: ['', [Validators.required]],
      number4: ['', [Validators.required]],
      number5: ['', [Validators.required]],
      number6: ['', [Validators.required]],
    });
  }

  constructor(
    private fb: FormBuilder,
    private alertaService: AlertasService,
    private route: Router,
    private registerService: RegisterService,
    private authService: AuthService
  ) {
    this.formNumber();
  }

  ngOnInit(): void {
    // Obtener los datos del usuario guardados en sessionStorage
    const pendingRegistration = sessionStorage.getItem('pendingRegistration');
    if (pendingRegistration) {
      this.userData = JSON.parse(pendingRegistration);
    } else {
      // Si no hay datos de registro pendiente, redirigir al registro
      this.alertaService.showError('Error', 'No hay registro pendiente');
      this.route.navigate(['/register']);
    }
  }

  // Método para manejar el cambio de input y navegación automática
  onInputChange(event: any, inputNumber: number) {
    const input = event.target;
    const value = input.value.toUpperCase();

    // Limitar a un solo carácter
    if (value.length > 1) {
      input.value = value.charAt(0);
    }

    // Actualizar el formulario
    this.formRegister.get(`number${inputNumber}`)?.setValue(input.value);

    // Agregar clase filled si hay valor
    if (input.value) {
      input.classList.add('filled');
    } else {
      input.classList.remove('filled');
    }

    // Navegar al siguiente input si hay valor
    if (input.value && inputNumber < 6) {
      const nextInput = this.codeInputs.toArray()[inputNumber];
      if (nextInput) {
        nextInput.nativeElement.focus();
      }
    }

    // Si se borra un carácter, ir al input anterior
    if (!input.value && inputNumber > 1) {
      const prevInput = this.codeInputs.toArray()[inputNumber - 2];
      if (prevInput) {
        prevInput.nativeElement.focus();
      }
    }
  }

  // Método para manejar el evento keydown (backspace)
  onKeyDown(event: any, inputNumber: number) {
    if (event.key === 'Backspace' && !event.target.value && inputNumber > 1) {
      const prevInput = this.codeInputs.toArray()[inputNumber - 2];
      if (prevInput) {
        prevInput.nativeElement.focus();
      }
    }
  }

  sendCode() {
    if (!this.formRegister.valid) {
      this.alertaService.showError('No ingresaste bien los datos', 'Error');
      return;
    }

    if (!this.userData) {
      this.alertaService.showError('Error', 'No hay datos de registro disponibles');
      this.route.navigate(['/register']);
      return;
    }

    this.isLoading = true;

    // Construir el código completo
    const code = Object.values(this.formRegister.value).join('');

    // Completar el registro con el código de verificación
    const registerData = {
      ...this.userData,
      verificationCode: code
    };

    this.registerService.register(registerData).subscribe({
      next: (response: any) => {
        this.isLoading = false;

        if (response.success) {
          // Registro completado exitosamente
          if (response.token && response.user) {
            // Hacer login automático
            this.authService.login(response.token, response.user);
            this.alertaService.showSuccess('¡Registro exitoso!', 'Bienvenido a LikeVendor');
            this.route.navigate(['/choose-role']);
          } else {
            this.alertaService.showSuccess('¡Registro exitoso!', 'Tu cuenta ha sido verificada');
            this.route.navigate(['/choose-role']);
          }

          // Limpiar datos de sessionStorage
          sessionStorage.removeItem('pendingRegistration');
        } else {
          this.alertaService.showError('Error', response.message || 'Error al completar el registro');
        }
      },
      error: (error: any) => {
        this.isLoading = false;
        console.error('Error en verificación:', error);

        if (error.status === 400) {
          this.alertaService.showError('Error', 'Código inválido o expirado');
        } else if (error.status === 0) {
          this.alertaService.showError('Error', 'No se puede conectar con el servidor');
        } else {
          this.alertaService.showError('Error', 'Ocurrió un error inesperado');
        }
      }
    });
  }

  // Método para reenviar código
  resendCode() {
    if (!this.userData) {
      this.alertaService.showError('Error', 'No hay datos de registro disponibles');
      return;
    }

    this.registerService.requestCode({ email: this.userData.email }).subscribe({
      next: (response: any) => {
        this.alertaService.showSuccess('Código reenviado', 'Revisa tu email nuevamente');
      },
      error: (error: any) => {
        this.alertaService.showError('Error', 'No se pudo reenviar el código');
      }
    });
  }
}
