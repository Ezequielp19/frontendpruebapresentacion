import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'translateCapitalize'
})
export class TranslateCapitalizePipe implements PipeTransform {

  constructor(private translate: TranslateService) {}

  transform(key: string, params?: any): string {
    const translation = this.translate.instant(key, params);
    
    // Si el idioma actual es inglés, capitalizar la primera letra
    if (this.translate.currentLang === 'en' && translation) {
      return this.capitalizeFirstLetter(translation);
    }
    
    return translation;
  }

  private capitalizeFirstLetter(text: string): string {
    if (!text || text.length === 0) return text;
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }
}
