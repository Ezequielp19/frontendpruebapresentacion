import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-worker-card',
  templateUrl: './worker-card.component.html',
  styleUrls: ['./worker-card.component.scss']
})
export class WorkerCardComponent implements OnInit {

  @Input() worker: any;

  @Input() dark: boolean = false;

  @Input() border: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  getStarsArray(): number[] {
    return [1, 2, 3, 4, 5];
  }

  getStarCount(): number {
    if (this.worker?.stars) {
      return Math.min(5, Math.max(0, this.worker.stars));
    }
    if (this.worker?.score) {
      // Convertir score de 0-10 a estrellas de 0-5
      return Math.min(5, Math.max(0, Math.round(this.worker.score / 2)));
    }
    return 0;
  }

  getDescription(): string {
    const desc = this.worker?.description || this.worker?.text || this.worker?.profession || '';
    if (desc.length > 100) {
      return desc.slice(0, 100) + '...';
    }
    return desc;
  }

  getProfession(): string {
    return this.worker?.profession || this.worker?.text || '';
  }

  getProfileImage(): string {
    return this.worker?.image || this.worker?.profileImage || this.worker?.avatar || 'assets/img/freelance.png';
  }

  getProfile(){
    // Pasar los datos del worker como parámetros de ruta
    const workerData = {
      id: this.worker?._id || this.worker?.id,
      name: this.worker?.name,
      profession: this.worker?.profession || this.worker?.text,
      score: this.worker?.score,
      description: this.worker?.description || this.worker?.text,
      image: this.getProfileImage(),
      profileImage: this.getProfileImage(),
      location: this.worker?.location || 'Argentina',
      category: this.worker?.category || this.worker?.categorie,
      experience: this.worker?.experience,
      rating: this.worker?.rating,
      available: this.worker?.available
    };
    
    return this.router.navigate(['preview-profile'], { 
      queryParams: { worker: JSON.stringify(workerData) }
    });
  }

}
