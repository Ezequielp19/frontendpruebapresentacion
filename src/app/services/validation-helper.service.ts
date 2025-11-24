import { Injectable } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { CustomValidators } from '../shared/validators/custom-validators';

@Injectable({
  providedIn: 'root'
})
export class ValidationHelperService {

  constructor() { }

  /**
   * Obtiene todos los errores de un formulario
   */
  getFormErrors(form: FormGroup): { [key: string]: string[] } {
    const errors: { [key: string]: string[] } = {};

    Object.keys(form.controls).forEach(key => {
      const control = form.get(key);
      if (control && control.errors) {
        errors[key] = this.getControlErrors(control, key);
      }
    });

    return errors;
  }

  /**
   * Obtiene los errores de un control específico
   */
  getControlErrors(control: AbstractControl, fieldName: string): string[] {
    const errors: string[] = [];

    if (!control || !control.errors) {
      return errors;
    }

    // Usar el helper de CustomValidators para obtener mensajes
    const message = CustomValidators.getErrorMessage(control, fieldName);
    if (message) {
      errors.push(message);
    }

    return errors;
  }

  /**
   * Valida un formulario y retorna un objeto con el resultado
   */
  validateForm(form: FormGroup): { valid: boolean; errors: string[] } {
    const result = {
      valid: true,
      errors: [] as string[]
    };

    if (!form.valid) {
      result.valid = false;
      const formErrors = this.getFormErrors(form);

      Object.keys(formErrors).forEach(key => {
        formErrors[key].forEach(error => {
          result.errors.push(error);
        });
      });
    }

    return result;
  }

  /**
   * Marca todos los campos de un formulario como touched
   * Útil para mostrar errores después de un intento de submit
   */
  markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  /**
   * Limpia los errores de un formulario
   */
  clearFormErrors(form: FormGroup): void {
    Object.keys(form.controls).forEach(key => {
      const control = form.get(key);
      control?.setErrors(null);
    });
  }

  /**
   * Verifica si un campo debe mostrar error
   */
  shouldShowError(control: AbstractControl | null): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  /**
   * Obtiene el primer error de un control
   */
  getFirstError(control: AbstractControl | null, fieldName: string): string {
    if (!control || !control.errors) {
      return '';
    }

    return CustomValidators.getErrorMessage(control, fieldName);
  }

  /**
   * Formatea los errores para mostrarlos en una alerta
   */
  formatErrorsForAlert(errors: string[]): string {
    if (errors.length === 0) {
      return '';
    }

    if (errors.length === 1) {
      return errors[0];
    }

    return 'Se encontraron los siguientes errores:\n\n' +
           errors.map((error, index) => `${index + 1}. ${error}`).join('\n');
  }

  /**
   * Valida un campo específico y retorna si es válido
   */
  validateField(form: FormGroup, fieldName: string): boolean {
    const control = form.get(fieldName);
    return control ? control.valid : false;
  }

  /**
   * Obtiene un mensaje de error personalizado para un campo
   */
  getFieldErrorMessage(form: FormGroup, fieldName: string, customFieldLabel?: string): string {
    const control = form.get(fieldName);
    const label = customFieldLabel || this.formatFieldName(fieldName);

    return this.getFirstError(control, label);
  }

  /**
   * Formatea el nombre de un campo para mostrarlo al usuario
   * Ejemplo: "firstName" -> "Nombre"
   */
  private formatFieldName(fieldName: string): string {
    const fieldLabels: { [key: string]: string } = {
      'nombre': 'Nombre',
      'apellido': 'Apellido',
      'email': 'Email',
      'contraseña': 'Contraseña',
      'confirmarContraseña': 'Confirmación de contraseña',
      'telefono': 'Teléfono',
      'direccion': 'Dirección',
      'ciudad': 'Ciudad',
      'codigoPostal': 'Código postal',
      'pais': 'País',
      'firstName': 'Nombre',
      'lastName': 'Apellido',
      'password': 'Contraseña',
      'confirmPassword': 'Confirmación de contraseña',
      'phone': 'Teléfono',
      'address': 'Dirección',
      'city': 'Ciudad',
      'postalCode': 'Código postal',
      'country': 'País',
      'amount': 'Monto',
      'quantity': 'Cantidad',
      'description': 'Descripción'
    };

    return fieldLabels[fieldName] || fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
  }

  /**
   * Valida campos requeridos de un objeto
   */
  validateRequiredFields(data: any, requiredFields: string[]): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    requiredFields.forEach(field => {
      if (!data[field] || (typeof data[field] === 'string' && data[field].trim() === '')) {
        errors.push(`${this.formatFieldName(field)} es requerido`);
      }
    });

    return {
      valid: errors.length === 0,
      errors
    };
  }

  /**
   * Valida formato de email
   */
  isValidEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }

  /**
   * Valida longitud de string
   */
  isValidLength(value: string, min: number, max?: number): boolean {
    if (!value) return false;

    const length = value.trim().length;

    if (length < min) return false;
    if (max && length > max) return false;

    return true;
  }

  /**
   * Sanitiza input removiendo caracteres peligrosos
   */
  sanitizeInput(input: string): string {
    if (!input) return '';

    return input
      .trim()
      .replace(/[<>]/g, '') // Remover < y >
      .replace(/javascript:/gi, '') // Remover javascript:
      .replace(/on\w+=/gi, ''); // Remover event handlers (onclick=, onload=, etc.)
  }

  /**
   * Valida que un número esté en un rango
   */
  isInRange(value: number, min: number, max: number): boolean {
    return value >= min && value <= max;
  }
}
