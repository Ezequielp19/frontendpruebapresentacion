import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-box-lives-main',
  templateUrl: './box-lives-main.component.html',
  styleUrls: ['./box-lives-main.component.scss']
})
export class BoxLivesMainComponent implements OnInit, OnDestroy {

  public buttonsAction: Array<any> = [
    { 
      id: 1,
      icon: "store_mall_directory", 
      color: "white",
      title: 'LIVE',
      iconLive: 'fiber_manual_record',
      action: 'goToDashboardLive'
    },
    { 
      id: 2,
      color: "primary",
      title: 'Contactar por WhatsApp',
      action: 'openWhatsApp'
    },
    { 
      id: 3,
      color: "primary",
      title: 'Afiliados',
      action: 'goToLiveModule'
    }
  ];

  public currentViewers: number = 0;
  private viewersInterval: any;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.initializeViewers();
  }

  ngOnDestroy(): void {
    if (this.viewersInterval) {
      clearInterval(this.viewersInterval);
    }
  }

  private initializeViewers(): void {
    this.currentViewers = Math.floor(Math.random() * 101) + 50;
    this.viewersInterval = setInterval(() => {
      const change = Math.floor(Math.random() * 11) - 5;
      this.currentViewers += change;
      if (this.currentViewers < 30) this.currentViewers = 30;
      if (this.currentViewers > 200) this.currentViewers = 200;
    }, Math.random() * 3000 + 4000);
  }

  // Acciones de los botones
  goToDashboardLive() {
    this.router.navigate(['/dashboard-live']);
  }

  openWhatsApp() {
    window.open('https://wa.me/5491112345678?text=Hola%20quiero%20más%20información', '_blank');
  }

  goToLiveModule() {
    this.router.navigate(['/live']);
  }

  // Método para manejar todos los clicks de botones
  handleButtonClick(buttonId: number) {
    switch(buttonId) {
      case 1:
        this.goToDashboardLive();
        break;
      case 2:
        this.openWhatsApp();
        break;
      case 3:
        this.goToLiveModule();
        break;
      default:
        console.log('Botón no reconocido:', buttonId);
    }
  }
}
