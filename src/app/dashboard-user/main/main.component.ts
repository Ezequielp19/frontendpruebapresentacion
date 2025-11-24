import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  @ViewChild('drawer') drawer!: MatDrawer;

  ngAfterViewInit() {
    this.onResize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?: Event) {
    const width = window.innerWidth;
    if (width <= 768) {
      this.drawer.mode = 'over';
      this.drawer.close();
    } else {
      this.drawer.mode = 'side';
      this.drawer.open();
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

}
