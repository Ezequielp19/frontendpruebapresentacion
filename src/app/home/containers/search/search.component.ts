import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  constructor() {}

  public marketplaceActive: boolean = false;
  public companyActive: boolean = false;
  public freelanceActive: boolean = false;

  ngOnInit(): void {}

  MarketplaceActiveOn(): void {
    this.marketplaceActive = true;
    this.companyActive = false;
    this.freelanceActive = false;
  }

  CompanyActiveOn(): void {
    this.marketplaceActive = false;
    this.companyActive = true;
    this.freelanceActive = false;
  }

  FreelanceActiveOn(): void {
    this.marketplaceActive = false;
    this.companyActive = false;
    this.freelanceActive = true;
  }
}
