import { Component, OnInit } from '@angular/core';
import { AlertasService } from 'src/app/services/alertas.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  // URLs de redes sociales (se actualizarán después)
  socialLinks = {
    linkedin: 'https://www.linkedin.com/company/likevendor',
    instagram: 'https://www.instagram.com/likevendor',
    facebook: 'https://www.facebook.com/likevendor'
  };

  constructor(private alertasService:AlertasService) { }

  ngOnInit(): void {
  }

  getSubscribe(){
    this.alertasService.showSuccess('te suscribiste con exito', '')
  }

  openSocialMedia(url: string): void {
    if (url) {
      window.open(url, '_blank');
    }
  }

}
