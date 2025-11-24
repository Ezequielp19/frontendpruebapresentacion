import { Component, OnInit, ViewChild } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { SwiperComponent } from 'swiper/angular';
import SwiperCore, { SwiperOptions, Virtual, Autoplay, Navigation } from 'swiper';

SwiperCore.use([Autoplay, Navigation]);

@Component({
  selector: 'app-section-freelance',
  templateUrl: './section-freelance.component.html',
  styleUrls: ['./section-freelance.component.scss'],
})
export class SectionFreelanceComponent implements OnInit {
  active = 1;

  config: SwiperOptions = {
    slidesPerView: 'auto',
    spaceBetween: 40,
    loop: true,
    centeredSlides: false,
    navigation: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false
    },
    speed: 800,
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 10
      },
      480: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 30
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 40
      }
    }
  };

  arrayFreelance = [
    {
      id: 1,
      name: 'Juan Pérez',
      role: 'Diseñador Gráfico',
      image: 'assets/img/bussines-man.png',
      rating: 4.8
    },
    {
      id: 2,
      name: 'María García',
      role: 'Desarrolladora Web',
      image: 'assets/img/bussines-man.png',
      rating: 4.9
    },
    {
      id: 3,
      name: 'Carlos López',
      role: 'Marketing Digital',
      image: 'assets/img/bussines-man.png',
      rating: 4.7
    },
    {
      id: 4,
      name: 'Ana Martínez',
      role: 'Consultora SEO',
      image: 'assets/img/bussines-man.png',
      rating: 4.9
    },
    {
      id: 5,
      name: 'Roberto Silva',
      role: 'Fotógrafo',
      image: 'assets/img/bussines-man.png',
      rating: 4.8
    }
  ];

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="fas fa-chevron-left"></i>', '<i class="fas fa-chevron-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  };

  arrayBrands = [
    {
      // id: 1,
      name: 'facebook',
      image: 'brand1.png',
    },
    {
      // id: 2,
      name: 'google',
      image: 'brand2.png',
    },
    {
      // id: 3,
      name: 'netflix',
      image: 'brand3.png',
    },
    {
      
      image: 'brand4.png',
    },
    {
      
      image: 'brand5.png',
    },
    {
      
      image: 'brand6.png',
    },
    {
      
      image: 'brand1.png',
    },
    {
      
      image: 'brand2.png',
    },
    {
      
      image: 'brand3.png',
    },
    {
      
      image: 'brand4.png',
    },
    {
      
      image: 'brand5.png',
    },
    {
      
      image: 'brand6.png',
    },
   
   
   
   
   
   
   
  ];

  constructor() {}

  ngOnInit(): void {}

  onSwiper(swiper: any) {
    console.log(swiper);
  }

  onSlideChange() {
    console.log('slide change');
  }
}
