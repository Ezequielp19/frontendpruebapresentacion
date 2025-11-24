import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-live-dashboard',
  templateUrl: './card-live-dashboard.component.html',
  styleUrls: ['./card-live-dashboard.component.scss']
})
export class CardLiveDashboardComponent implements OnInit {

  @Input() 
  vivos: any[] = [];
  
  currentPage = 1;
  itemsPerPage = 6;
  totalPages = 1;

  constructor() { }

  ngOnInit(): void {
    this.calculateTotalPages();
  }

  get paginatedVivos() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.vivos.slice(startIndex, endIndex);
  }

  calculateTotalPages() {
    this.totalPages = Math.ceil(this.vivos.length / this.itemsPerPage);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  getPageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
}
