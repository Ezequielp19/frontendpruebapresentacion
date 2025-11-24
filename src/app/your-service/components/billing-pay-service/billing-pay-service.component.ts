import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-billing-pay-service',
  templateUrl: './billing-pay-service.component.html',
  styleUrls: ['./billing-pay-service.component.scss']
})
export class BillingPayServiceComponent implements OnInit, OnDestroy {
  @Output() formDataChange = new EventEmitter<any>();

  billingForm: FormGroup;
  private subscriptions = new Subscription();

  paymentMethods = [
    'Efectivo',
    'Credito',
    'Debito',
    'Mercado Pago',
    'Paypal',
    'Transferencia Bancaria',
    'Criptomonedas'
  ];

  locations = [
    'Buenos Aires',
    'Córdoba',
    'Rosario',
    'Mendoza',
    'La Plata',
    'San Miguel de Tucumán',
    'Mar del Plata',
    'Salta',
    'Santa Fe',
    'San Juan'
  ];

  constructor(private fb: FormBuilder) {
    this.billingForm = this.fb.group({
      paymentMethods: [[], [Validators.required, Validators.minLength(1)]],
      location: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Escuchar cambios en el formulario y emitir datos
    this.subscriptions.add(
      this.billingForm.valueChanges.subscribe(value => {
        this.emitFormData();
      })
    );
  }

  // Emitir datos del formulario al componente padre
  emitFormData() {
    if (this.billingForm.valid) {
      this.formDataChange.emit({
        paymentMethods: this.billingForm.get('paymentMethods')?.value,
        location: this.billingForm.get('location')?.value
      });
    }
  }

  // Validar si el campo tiene error
  hasError(fieldName: string): boolean {
    const field = this.billingForm.get(fieldName);
    return field ? (field.invalid && (field.dirty || field.touched)) : false;
  }

  // Obtener mensaje de error
  getErrorMessage(fieldName: string): string {
    const field = this.billingForm.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) return 'Este campo es requerido';
      if (field.errors['minlength']) return `Selecciona al menos ${field.errors['minlength'].requiredLength} método`;
    }
    return '';
  }

  // Manejar selección de métodos de pago
  onPaymentMethodChange(method: string, isChecked: boolean) {
    const currentMethods = this.billingForm.get('paymentMethods')?.value || [];

    if (isChecked) {
      if (!currentMethods.includes(method)) {
        currentMethods.push(method);
      }
    } else {
      const index = currentMethods.indexOf(method);
      if (index > -1) {
        currentMethods.splice(index, 1);
      }
    }

    this.billingForm.patchValue({ paymentMethods: currentMethods });
  }

  // Verificar si un método está seleccionado
  isPaymentMethodSelected(method: string): boolean {
    const currentMethods = this.billingForm.get('paymentMethods')?.value || [];
    return currentMethods.includes(method);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
