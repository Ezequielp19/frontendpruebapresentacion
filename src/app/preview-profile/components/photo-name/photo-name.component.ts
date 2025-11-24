import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-photo-name',
  templateUrl: './photo-name.component.html',
  styleUrls: ['./photo-name.component.scss']
})
export class PhotoNameComponent implements OnInit {
  @Input() workerData: any = {
    name: 'Usuario',
    profession: 'Profesional',
    image: null,
    location: 'Argentina'
  };

  constructor() { }

  ngOnInit(): void {
  }

}
