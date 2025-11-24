import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(public translate:TranslateService) {
    translate.addLangs(['en','es']);
    translate.setDefaultLang('es')
  }

  colorMode = 'lightMode'

  switchLang(lang: string){
    this.translate.use(lang)
  }

  toggleMode(){
    if(this.colorMode === 'lightMode'){
      this.colorMode = 'darkMode';
    }else{
      this.colorMode = 'lightMode'
    }
  }

  openChatbot() {
  (window as any).myLandbot?.open();
}


  ngOnInit(): void {}
}
