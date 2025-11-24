import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-section-info-ranking',
  templateUrl: './section-info-ranking.component.html',
  styleUrls: ['./section-info-ranking.component.scss'],
})
export class SectionInfoRankingComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}


  goToRegister() {
    this.router.navigate(['/register']);
  }
}
