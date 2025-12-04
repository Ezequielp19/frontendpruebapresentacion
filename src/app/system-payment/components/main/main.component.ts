import { Component, OnInit } from '@angular/core';
import { PaymentService, AuthorizePaymentRequest } from 'src/app/services/payment.service';
import { AlertasService } from 'src/app/services/alertas.service';
import Swal from 'sweetalert2';

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

  /**
   * Simular pago con PayPal
   */
  simulatePayPalPayment(): void {
    Swal.fire({
      title: 'Procesando pago con PayPal',
      html: 'Redirigiendo a PayPal...',
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      }
    }).then(() => {
      Swal.fire({
        icon: 'success',
        title: '¡Pago exitoso!',
        text: 'Tu pago con PayPal se ha procesado correctamente',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#236bd8'
      });
    });
  }

  /**
   * Simular pago con Personal Pay
   */
  simulatePersonalPayPayment(): void {
    Swal.fire({
      title: 'Procesando pago con Personal Pay',
      html: 'Conectando con Personal Pay...',
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      }
    }).then(() => {
      Swal.fire({
        icon: 'success',
        title: '¡Pago exitoso!',
        text: 'Tu pago con Personal Pay se ha procesado correctamente',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#236bd8'
      });
    });
  }

  /**
   * Simular pago con Binance
   */
  simulateBinancePayment(): void {
    Swal.fire({
      title: 'Procesando pago con Binance',
      html: 'Verificando transacción...',
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      }
    }).then(() => {
      Swal.fire({
        icon: 'success',
        title: '¡Pago exitoso!',
        text: 'Tu pago con Binance se ha procesado correctamente',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#236bd8'
      });
    });
  }

  /**
   * Simular pago con Prex
   */
  simulatePrexPayment(): void {
    Swal.fire({
      title: 'Procesando pago con Prex',
      html: 'Conectando con Prex...',
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      }
    }).then(() => {
      Swal.fire({
        icon: 'success',
        title: '¡Pago exitoso!',
        text: 'Tu pago con Prex se ha procesado correctamente',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#236bd8'
      });
    });
  }

  /**
   * Simular pago con Payoneer
   */
  simulatePayoneerPayment(): void {
    Swal.fire({
      title: 'Procesando pago con Payoneer',
      html: 'Redirigiendo a Payoneer...',
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      }
    }).then(() => {
      Swal.fire({
        icon: 'success',
        title: '¡Pago exitoso!',
        text: 'Tu pago con Payoneer se ha procesado correctamente',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#236bd8'
      });
    });
  }

  /**
   * Simular pago con Ripio
   */
  simulateRipioPayment(): void {
    Swal.fire({
      title: 'Procesando pago con Ripio',
      html: 'Conectando con Ripio...',
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      }
    }).then(() => {
      Swal.fire({
        icon: 'success',
        title: '¡Pago exitoso!',
        text: 'Tu pago con Ripio se ha procesado correctamente',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#236bd8'
      });
    });
  }

  /**
   * Simular pago con Tarjeta de Crédito
   */
  simulateCardPayment(): void {
    // Validar que los campos estén llenos (simulación)
    Swal.fire({
      title: 'Procesando pago con Tarjeta',
      html: 'Validando información de la tarjeta...',
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      }
    }).then(() => {
      Swal.fire({
        icon: 'success',
        title: '¡Pago exitoso!',
        text: 'Tu pago con tarjeta de crédito se ha procesado correctamente',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#236bd8'
      });
    });
  }
}

