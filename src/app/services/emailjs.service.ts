import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { emailjsConfig } from '../../environments/emailjs.config';

declare var emailjs: any;

@Injectable({
  providedIn: 'root'
})
export class EmailjsService {

  constructor() {
    // Inicializar EmailJS
    this.initEmailJS();
  }

  /**
   * Inicializa EmailJS con la configuración
   */
  private initEmailJS(): void {
    // Configuración de EmailJS
    if (typeof emailjs !== 'undefined') {
      emailjs.init(emailjsConfig.userId);
    }
  }

  /**
   * Envía código de verificación por email
   * @param email - Email del destinatario
   * @param code - Código de verificación
   * @returns Promise<boolean> - true si se envió correctamente
   */
  sendVerificationCode(email: string, code: string): Observable<boolean> {
    return from(this.sendEmail(email, code));
  }

  /**
   * Envía el email usando EmailJS
   * @param email - Email del destinatario
   * @param code - Código de verificación
   * @returns Promise<boolean> - true si se envió correctamente
   */
  private async sendEmail(email: string, code: string): Promise<boolean> {
    try {
      console.log(`📧 Enviando código de verificación a: ${email}`);
      
      // Template parameters para EmailJS
      const templateParams = {
        to_email: email,
        verification_code: code,
        user_name: 'Usuario de LikeVendor'
      };

      // Enviar email usando EmailJS
      const response = await emailjs.send(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        templateParams
      );

      console.log(`✅ Email enviado exitosamente. Response:`, response);
      return true;

    } catch (error) {
      console.error('❌ Error enviando email con EmailJS:', error);
      return false;
    }
  }

  /**
   * Verifica si el servicio de email está configurado correctamente
   * @returns boolean - true si está configurado
   */
  isConfigured(): boolean {
    return !!(typeof emailjs !== 'undefined' && emailjs.init);
  }
}
