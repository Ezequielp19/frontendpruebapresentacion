import { AbstractControl, ValidationErrors, ValidatorFn, FormGroup } from '@angular/forms';

/**
 * Validadores personalizados para formularios
 */
export class CustomValidators {

  /**
   * Validador para verificar que las contraseñas coincidan
   */
  static passwordMatch(passwordField: string, confirmPasswordField: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!(control instanceof FormGroup)) {
        return null;
      }

      const password = control.get(passwordField);
      const confirmPassword = control.get(confirmPasswordField);

      if (!password || !confirmPassword) {
        return null;
      }

      if (password.value !== confirmPassword.value) {
        confirmPassword.setErrors({ ...confirmPassword.errors, passwordMismatch: true });
        return { passwordMismatch: true };
      }

      // Limpiar error de passwordMismatch si las contraseñas coinciden
      if (confirmPassword.errors) {
        delete confirmPassword.errors['passwordMismatch'];
        if (Object.keys(confirmPassword.errors).length === 0) {
          confirmPassword.setErrors(null);
        }
      }

      return null;
    };
  }

  /**
   * Validador para solo letras (incluyendo acentos y ñ)
   */
  static onlyLetters(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      const valid = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(control.value);
      return valid ? null : { onlyLetters: true };
    };
  }

  /**
   * Validador para solo números
   */
  static onlyNumbers(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      const valid = /^\d+$/.test(control.value);
      return valid ? null : { onlyNumbers: true };
    };
  }

  /**
   * Validador para formato de teléfono
   */
  static phoneNumber(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      // Acepta formatos: +34 123456789, 123456789, (123) 456-7890
      const valid = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/.test(control.value);
      return valid ? null : { phoneNumber: true };
    };
  }

  /**
   * Validador para contraseña fuerte
   * Debe contener: mayúscula, minúscula, número, mínimo 8 caracteres
   */
  static strongPassword(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      const hasUpperCase = /[A-Z]/.test(control.value);
      const hasLowerCase = /[a-z]/.test(control.value);
      const hasNumber = /\d/.test(control.value);
      const minLength = control.value.length >= 8;

      const valid = hasUpperCase && hasLowerCase && hasNumber && minLength;

      if (!valid) {
        const errors: any = {};
        if (!hasUpperCase) errors.noUpperCase = true;
        if (!hasLowerCase) errors.noLowerCase = true;
        if (!hasNumber) errors.noNumber = true;
        if (!minLength) errors.minLength = true;

        return errors;
      }

      return null;
    };
  }

  /**
   * Validador para URL
   */
  static url(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      try {
        new URL(control.value);
        return null;
      } catch {
        return { invalidUrl: true };
      }
    };
  }

  /**
   * Validador para rango de números
   */
  static numberRange(min: number, max: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value && control.value !== 0) {
        return null;
      }

      const value = parseFloat(control.value);

      if (isNaN(value)) {
        return { notANumber: true };
      }

      if (value < min) {
        return { belowMin: { min, actual: value } };
      }

      if (value > max) {
        return { aboveMax: { max, actual: value } };
      }

      return null;
    };
  }

  /**
   * Validador para fecha futura
   */
  static futureDate(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      const inputDate = new Date(control.value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      return inputDate >= today ? null : { pastDate: true };
    };
  }

  /**
   * Validador para fecha pasada
   */
  static pastDate(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      const inputDate = new Date(control.value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      return inputDate <= today ? null : { futureDate: true };
    };
  }

  /**
   * Validador para archivos (tipo y tamaño)
   */
  static file(allowedTypes: string[], maxSizeMB: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      const file = control.value as File;

      // Validar tipo
      const fileType = file.type;
      const typeValid = allowedTypes.some(type => {
        if (type.includes('*')) {
          const prefix = type.split('/')[0];
          return fileType.startsWith(prefix);
        }
        return fileType === type;
      });

      if (!typeValid) {
        return { invalidFileType: { allowed: allowedTypes, actual: fileType } };
      }

      // Validar tamaño
      const maxSizeBytes = maxSizeMB * 1024 * 1024;
      if (file.size > maxSizeBytes) {
        return {
          fileTooLarge: {
            maxSize: maxSizeMB,
            actualSize: (file.size / (1024 * 1024)).toFixed(2)
          }
        };
      }

      return null;
    };
  }

  /**
   * Validador para código postal español
   */
  static spanishPostalCode(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      const valid = /^(?:0[1-9]|[1-4]\d|5[0-2])\d{3}$/.test(control.value);
      return valid ? null : { invalidPostalCode: true };
    };
  }

  /**
   * Validador para NIF/NIE español
   */
  static spanishIdNumber(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      const value = control.value.toUpperCase();

      // Validar NIF
      const nifRegex = /^[0-9]{8}[A-Z]$/;
      if (nifRegex.test(value)) {
        const letters = 'TRWAGMYFPDXBNJZSQVHLCKE';
        const number = parseInt(value.substr(0, 8), 10);
        const letter = value.substr(8, 1);

        if (letters[number % 23] === letter) {
          return null;
        }
      }

      // Validar NIE
      const nieRegex = /^[XYZ][0-9]{7}[A-Z]$/;
      if (nieRegex.test(value)) {
        let nieNumber = value.substr(1, 7);
        const prefix = value.substr(0, 1);
        const letter = value.substr(8, 1);

        // Reemplazar la letra inicial
        if (prefix === 'X') nieNumber = '0' + nieNumber;
        else if (prefix === 'Y') nieNumber = '1' + nieNumber;
        else if (prefix === 'Z') nieNumber = '2' + nieNumber;

        const letters = 'TRWAGMYFPDXBNJZSQVHLCKE';
        const number = parseInt(nieNumber, 10);

        if (letters[number % 23] === letter) {
          return null;
        }
      }

      return { invalidIdNumber: true };
    };
  }

  /**
   * Obtener mensaje de error legible para el usuario
   */
  static getErrorMessage(control: AbstractControl, fieldName: string = 'Este campo'): string {
    if (!control || !control.errors) {
      return '';
    }

    const errors = control.errors;

    if (errors['required']) {
      return `${fieldName} es requerido`;
    }

    if (errors['email']) {
      return `Ingresa un email válido`;
    }

    if (errors['minlength']) {
      return `${fieldName} debe tener al menos ${errors['minlength'].requiredLength} caracteres`;
    }

    if (errors['maxlength']) {
      return `${fieldName} no puede tener más de ${errors['maxlength'].requiredLength} caracteres`;
    }

    if (errors['pattern']) {
      return `${fieldName} tiene un formato inválido`;
    }

    if (errors['min']) {
      return `${fieldName} debe ser mayor o igual a ${errors['min'].min}`;
    }

    if (errors['max']) {
      return `${fieldName} debe ser menor o igual a ${errors['max'].max}`;
    }

    if (errors['passwordMismatch']) {
      return 'Las contraseñas no coinciden';
    }

    if (errors['onlyLetters']) {
      return `${fieldName} solo debe contener letras`;
    }

    if (errors['onlyNumbers']) {
      return `${fieldName} solo debe contener números`;
    }

    if (errors['phoneNumber']) {
      return 'Ingresa un número de teléfono válido';
    }

    if (errors['noUpperCase']) {
      return 'La contraseña debe contener al menos una letra mayúscula';
    }

    if (errors['noLowerCase']) {
      return 'La contraseña debe contener al menos una letra minúscula';
    }

    if (errors['noNumber']) {
      return 'La contraseña debe contener al menos un número';
    }

    if (errors['invalidUrl']) {
      return 'Ingresa una URL válida';
    }

    if (errors['belowMin']) {
      return `El valor debe ser mayor o igual a ${errors['belowMin'].min}`;
    }

    if (errors['aboveMax']) {
      return `El valor debe ser menor o igual a ${errors['aboveMax'].max}`;
    }

    if (errors['pastDate']) {
      return 'La fecha no puede ser en el pasado';
    }

    if (errors['futureDate']) {
      return 'La fecha no puede ser en el futuro';
    }

    if (errors['invalidFileType']) {
      return `Tipo de archivo no permitido. Tipos permitidos: ${errors['invalidFileType'].allowed.join(', ')}`;
    }

    if (errors['fileTooLarge']) {
      return `El archivo es muy grande. Tamaño máximo: ${errors['fileTooLarge'].maxSize}MB`;
    }

    if (errors['invalidPostalCode']) {
      return 'Código postal inválido';
    }

    if (errors['invalidIdNumber']) {
      return 'NIF/NIE inválido';
    }

    return `${fieldName} es inválido`;
  }
}
