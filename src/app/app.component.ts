import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'likeVendor';
  colorMode = 'lightMode'

  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('en'); // Configura el idioma predeterminado
  }

  toggleMode(){
    if(this.colorMode === 'lightMode'){
      this.colorMode = 'darkMode';
    }else{
      this.colorMode = 'lightMode'
    }
  }

  switchLanguage(lang: string) {
    this.translate.use(lang); // Cambia el idioma en toda la aplicación
  }
}
