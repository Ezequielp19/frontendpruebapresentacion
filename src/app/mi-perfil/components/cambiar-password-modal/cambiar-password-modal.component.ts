import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cambiar-password-modal',
  templateUrl: './cambiar-password-modal.component.html',
  styleUrls: ['./cambiar-password-modal.component.scss']
})
export class CambiarPasswordModalComponent {
  passwordForm: FormGroup;
  mostrarContrasenas: { actual: boolean; nueva: boolean; confirmar: boolean } = {
    actual: false,
    nueva: false,
    confirmar: false
  };

  constructor(
    private dialogRef: MatDialogRef<CambiarPasswordModalComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.passwordForm = this.fb.group({
      contrasenaActual: ['', [Validators.required, Validators.minLength(6)]],
      nuevaContrasena: ['', [Validators.required, Validators.minLength(6)]],
      confirmarContrasena: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    const nueva = form.get('nuevaContrasena');
    const confirmar = form.get('confirmarContrasena');
    
    if (nueva && confirmar && nueva.value !== confirmar.value) {
      confirmar.setErrors({ passwordMismatch: true });
    } else if (confirmar) {
      confirmar.setErrors(null);
    }
    
    return null;
  }

  toggleMostrarContrasena(tipo: 'actual' | 'nueva' | 'confirmar'): void {
    this.mostrarContrasenas[tipo] = !this.mostrarContrasenas[tipo];
  }

  guardarCambios(): void {
    if (this.passwordForm.valid) {
      // Simulación de cambio de contraseña (solo para presentación)
      const formValue = this.passwordForm.value;
      console.log('Cambio de contraseña simulado:', {
        contrasenaActual: formValue.contrasenaActual,
        nuevaContrasena: formValue.nuevaContrasena
      });
      
      // Cerrar modal y mostrar mensaje de éxito
      this.dialogRef.close({ 
        success: true, 
        message: 'Contraseña cambiada exitosamente' 
      });
    }
  }

  cerrarModal(): void {
    this.dialogRef.close();
  }

  getErrorMessage(fieldName: string): string {
    const field = this.passwordForm.get(fieldName);
    if (field?.hasError('required')) {
      return 'Este campo es requerido';
    }
    if (field?.hasError('minlength')) {
      return 'La contraseña debe tener al menos 6 caracteres';
    }
    if (field?.hasError('passwordMismatch')) {
      return 'Las contraseñas no coinciden';
    }
    return '';
  }
}
