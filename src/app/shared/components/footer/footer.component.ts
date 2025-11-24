import { Component, OnInit } from '@angular/core';
import { AlertasService } from 'src/app/services/alertas.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private alertasService:AlertasService) { }

  ngOnInit(): void {
  }

  getSubscribe(){
    this.alertasService.showSuccess('te suscribiste con exito', '')
  }

}
