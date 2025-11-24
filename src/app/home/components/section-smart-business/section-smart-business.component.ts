import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-section-smart-business',
  templateUrl: './section-smart-business.component.html',
  styleUrls: ['./section-smart-business.component.scss'],
})
export class SectionSmartBusinessComponent implements OnInit {

  public buttonsAction: Array<any> = [
    { 
      icon: "store_mall_directory", 
      color: "primary",
      title: 'live',
      iconLive: 'fiber_manual_record'
      
    },
    { id: 2,
      color: "primary" ,
      
    },
    { 
      id: 3,
      color: "primary" ,
      title: 'afiliados',
      
     
    }
  ];









  constructor() {}

  ngOnInit(): void {}
}
