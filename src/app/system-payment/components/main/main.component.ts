import { Component, OnInit } from '@angular/core';
import { PaymentService, AuthorizePaymentRequest } from 'src/app/services/payment.service';
import { AlertasService } from 'src/app/services/alertas.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  paymentData: AuthorizePaymentRequest = {
    amount: 0,
    currency: 'USD',
    paymentMethod: 'card',
    orderId: ''
  };

  isLoading = false;
  paymentMethods: any[] = [];

  constructor(
    private paymentService: PaymentService,
    private alertasService: AlertasService
  ) { }

  ngOnInit(): void {
    this.loadPaymentMethods();
  }

  loadPaymentMethods() {
    this.paymentService.getPaymentMethods().subscribe({
      next: (response) => {
        this.paymentMethods = response.methods || [];
      },
      error: (error) => {
        console.error('Error loading payment methods:', error);
      }
    });
  }

  onPaymentMethodChange(method: 'paypal' | 'stripe' | 'card') {
    this.paymentData.paymentMethod = method;
  }

  validatePaymentData(): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!this.paymentData.amount || this.paymentData.amount <= 0) {
      errors.push('El monto debe ser mayor a 0');
    }

    if (!this.paymentData.currency) {
      errors.push('La moneda es requerida');
    }

    if (!this.paymentData.paymentMethod) {
      errors.push('Debes seleccionar un método de pago');
    }

    if (!this.paymentData.orderId) {
      errors.push('El ID de orden es requerido');
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  processPayment() {
    // Validar datos antes de enviar
    const validation = this.validatePaymentData();

    if (!validation.valid) {
      this.alertasService.showError(
        'Datos inválidos',
        validation.errors.join('\n')
      );
      return;
    }

    this.isLoading = true;

    this.paymentService.authorizePayment(this.paymentData).subscribe({
      next: (response) => {
        this.isLoading = false;
        console.log('Payment authorized:', response);

        this.alertasService.showSuccess(
          '¡Pago autorizado!',
          'El pago ha sido autorizado exitosamente'
        );

        // Resetear formulario
        this.resetForm();
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Payment error:', error);

        // El interceptor ya manejó el error, solo logueamos
        // pero podríamos agregar lógica adicional aquí si es necesario
      }
    });
  }

  resetForm() {
    this.paymentData = {
      amount: 0,
      currency: 'USD',
      paymentMethod: 'card',
      orderId: ''
    };
  }

  panelOpenState = false;
}

