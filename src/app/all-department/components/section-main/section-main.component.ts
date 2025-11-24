import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-section-main',
  templateUrl: './section-main.component.html',
  styleUrls: ['./section-main.component.scss']
})
export class SectionMainComponent implements OnInit {

  @Input() data!: string;

  info: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
