import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  private currentLanguage: string = 'en';

  constructor(private translate: TranslateService) {
    // Set default language
    this.translate.setDefaultLang('en');
    
    // Suscribirse a cambios de idioma para mantener track del idioma actual
    this.translate.onLangChange.subscribe((event) => {
      this.currentLanguage = event.lang;
    });
  }

  use(language: string): void {
    this.currentLanguage = language;
    this.translate.use(language);
  }

  // Método para obtener traducción con capitalización automática en inglés
  get(key: string, params?: any): string {
    const translation = this.translate.instant(key, params);
    
    // Si el idioma es inglés, capitalizar la primera letra
    if (this.currentLanguage === 'en' && translation) {
      return this.capitalizeFirstLetter(translation);
    }
    
    return translation;
  }

  // Método para capitalizar la primera letra
  private capitalizeFirstLetter(text: string): string {
    if (!text || text.length === 0) return text;
    
    // Capitalizar solo la primera letra, manteniendo el resto en minúsculas
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }

  // Método para obtener el idioma actual
  getCurrentLanguage(): string {
    return this.currentLanguage;
  }

  // Método para verificar si el idioma actual es inglés
  isEnglish(): boolean {
    return this.currentLanguage === 'en';
  }
}
