import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
})
export class HeroComponent implements OnInit, AfterViewInit {
  private currentSlide = 0;
  private totalSlides = 5;
  private autoplayInterval: any;
  private isDragging = false;
  private startPos = 0;
  private currentTranslate = 0;
  private prevTranslate = 0;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.setupCarousel();
    this.startAutoplay();
  }

  private setupCarousel(): void {
    const prevButton = document.querySelector('.prev-button') as HTMLButtonElement;
    const nextButton = document.querySelector('.next-button') as HTMLButtonElement;
    const track = document.querySelector('.carousel-track') as HTMLElement;
    
    if (prevButton && nextButton) {
      prevButton.addEventListener('click', () => this.prevSlide());
      nextButton.addEventListener('click', () => this.nextSlide());
    }

    if (track) {
      track.addEventListener('mousedown', (e) => this.startDragging(e));
      track.addEventListener('mousemove', (e) => this.drag(e));
      track.addEventListener('mouseup', () => this.endDragging());
      track.addEventListener('mouseleave', () => this.endDragging());
      track.addEventListener('touchstart', (e) => this.startDragging(e));
      track.addEventListener('touchmove', (e) => this.drag(e));
      track.addEventListener('touchend', () => this.endDragging());
    }

    const container = document.querySelector('.carousel-container');
    if (container) {
      container.addEventListener('mouseenter', () => this.stopAutoplay());
      container.addEventListener('mouseleave', () => {
        this.endDragging();
        this.startAutoplay();
      });
    }
  }

  private startDragging(e: MouseEvent | TouchEvent): void {
    this.isDragging = true;
    this.stopAutoplay();

    if (e instanceof MouseEvent) {
      this.startPos = e.clientX;
    } else {
      this.startPos = e.touches[0].clientX;
    }

    this.currentTranslate = this.currentSlide * -100;
  }

  private drag(e: MouseEvent | TouchEvent): void {
    if (!this.isDragging) return;

    e.preventDefault();
    const currentPosition = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
    const diff = (currentPosition - this.startPos) / (document.querySelector('.carousel-container')?.clientWidth || 1) * 100;
    const newTranslate = this.currentTranslate + diff;

    this.updateSlidePosition(newTranslate);
  }

  private endDragging(): void {
    if (!this.isDragging) return;

    this.isDragging = false;
    const track = document.querySelector('.carousel-track') as HTMLElement;
    const currentTransform = track ? parseFloat(track.style.transform.replace('translateX(', '').replace('%)', '')) : 0;
    
    const slideMove = Math.round(-currentTransform / 100);
    this.currentSlide = Math.max(0, Math.min(slideMove, this.totalSlides - 1));
    
    this.updateSlidePosition(this.currentSlide * -100);
  }

  private updateSlidePosition(translate: number = this.currentSlide * -100): void {
    const track = document.querySelector('.carousel-track') as HTMLElement;
    if (track) {
      track.style.transform = `translateX(${translate}%)`;
    }
  }

  private prevSlide(): void {
    this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
    this.updateSlidePosition();
  }

  private nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
    this.updateSlidePosition();
  }

  private startAutoplay(): void {
    if (!this.isDragging) {
      this.autoplayInterval = setInterval(() => {
        this.nextSlide();
      }, 3000);
    }
  }

  private stopAutoplay(): void {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
    }
  }

  ngOnDestroy(): void {
    this.stopAutoplay();
  }
}
