import { Component, OnInit } from '@angular/core';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  paymentData = {
    amount: 3500,
    method: '',
    userId: 'user123',
    taxes: 0,
    total: 0
  };

  // Datos del producto
  productData = {
    name: 'Camisa a cuadrille negra',
    description: 'Talla M - Color Negro',
    price: 3500,
    discount: 20
  };

  // Datos de entrega
  deliveryData = {
    address: 'Juan Alberdi - 1200',
    city: 'Buenos Aires',
    postalCode: '1406'
  };

  constructor(private paymentService: PaymentService) { }

  ngOnInit(): void {
    this.calculateTaxes();
  }

  onPaymentMethodChange(method: string) {
    this.paymentData.method = method;
    console.log('Método de pago seleccionado:', method);
  }

  // Método para calcular el 5% de impuestos y el total a pagar
  calculateTaxes() {
    this.paymentData.taxes = this.paymentData.amount * 0.05;
    this.paymentData.total = this.paymentData.amount + this.paymentData.taxes;
  }

  processPayment() {
    if (!this.paymentData.method) {
      alert('Por favor selecciona un método de pago');
      return;
    }

    const paymentInfo = {
      ...this.paymentData,
      product: this.productData,
      delivery: this.deliveryData,
      timestamp: new Date().toISOString()
    };

    this.paymentService.processPayment(paymentInfo)
      .subscribe({
        next: (response: any) => {
          console.log('Pago procesado exitosamente:', response.data);
          alert('¡Pago procesado exitosamente!');
        },
        error: (error: any) => {
          console.error('Error al procesar el pago:', error);
          alert('Error al procesar el pago. Por favor intenta nuevamente.');
        }
      });
  }

  // Método para obtener el descuento aplicado
  getDiscountAmount(): number {
    return (this.productData.price * this.productData.discount) / 100;
  }

  // Método para obtener el precio con descuento
  getDiscountedPrice(): number {
    return this.productData.price - this.getDiscountAmount();
  }
}
