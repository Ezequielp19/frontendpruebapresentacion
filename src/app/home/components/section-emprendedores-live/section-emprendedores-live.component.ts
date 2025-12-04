import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { StreamingService } from 'src/app/services/streaming.service';
import { Subscription, forkJoin } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-section-emprendedores-live',
  templateUrl: './section-emprendedores-live.component.html',
  styleUrls: ['./section-emprendedores-live.component.scss']
})
export class SectionEmprendedoresLiveComponent implements OnInit, OnDestroy {
  products: any[] = [];
  liveStreams: any[] = [];
  pastStreams: any[] = [];
  allStreams: any[] = [];
  isLoadingProducts = true;
  isLoadingStreams = true;
  activeTab: 'products' | 'live' = 'products';
  private subscriptions = new Subscription();

  constructor(
    private productService: ProductService,
    private streamingService: StreamingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    // Cargar productos y streams en paralelo
    const products$ = this.productService.getAllProducts();
    const liveStreams$ = this.streamingService.getActiveStreams({ status: 'live', limit: 6 });
    const pastStreams$ = this.streamingService.getActiveStreams({ status: 'ended', limit: 6 });

    this.subscriptions.add(
      forkJoin([products$, liveStreams$, pastStreams$]).subscribe(
        ([productsResponse, liveResponse, pastResponse]: any[]) => {
          // Procesar productos
          this.processProducts(productsResponse);
          
          // Procesar streams
          this.processStreams(liveResponse, pastResponse);
        },
        (error) => {
          console.error('Error al cargar datos:', error);
          this.loadProductsOnly();
          this.loadStreamsOnly();
        }
      )
    );
  }

  processProducts(response: any): void {
    this.products = (response?.response?.data?.products || []).slice(0, 4);
    
    if (this.products.length === 0) {
      this.products = this.getFallbackProducts().slice(0, 4);
    }
    
    this.isLoadingProducts = false;
  }

  processStreams(liveResponse: any, pastResponse: any): void {
    // Procesar streams en vivo
    if (liveResponse.success && liveResponse.streams) {
      this.liveStreams = liveResponse.streams
        .filter((s: any) => this.isActuallyLive(s))
        .map((s: any) => ({ ...s, isLive: true }));
    } else if (Array.isArray(liveResponse)) {
      this.liveStreams = liveResponse
        .filter((s: any) => this.isActuallyLive(s))
        .map((s: any) => ({ ...s, isLive: true }));
    }

    // Procesar streams pasados
    if (pastResponse.success && pastResponse.streams) {
      this.pastStreams = pastResponse.streams.map((s: any) => ({ ...s, isLive: false }));
    } else if (Array.isArray(pastResponse)) {
      this.pastStreams = pastResponse.map((s: any) => ({ ...s, isLive: false }));
    }

    // Mover streams "live" que realmente no lo están
    if (liveResponse.success && liveResponse.streams) {
      const fakeLiveStreams = liveResponse.streams
        .filter((s: any) => !this.isActuallyLive(s))
        .map((s: any) => ({ ...s, isLive: false }));
      this.pastStreams = [...this.pastStreams, ...fakeLiveStreams];
    } else if (Array.isArray(liveResponse)) {
      const fakeLiveStreams = liveResponse
        .filter((s: any) => !this.isActuallyLive(s))
        .map((s: any) => ({ ...s, isLive: false }));
      this.pastStreams = [...this.pastStreams, ...fakeLiveStreams];
    }

    // Combinar y limitar a 6 streams
    this.allStreams = [
      ...this.liveStreams.slice(0, 6),
      ...this.pastStreams.slice(0, 6 - this.liveStreams.length)
    ].slice(0, 6);

    this.isLoadingStreams = false;
  }

  loadProductsOnly(): void {
    this.subscriptions.add(
      this.productService.getAllProducts().subscribe({
        next: (response) => {
          this.processProducts(response);
        },
        error: (error) => {
          console.error('Error al cargar productos:', error);
          this.products = this.getFallbackProducts().slice(0, 4);
          this.isLoadingProducts = false;
        }
      })
    );
  }

  loadStreamsOnly(): void {
    this.subscriptions.add(
      this.streamingService.getActiveStreams({ limit: 6 }).subscribe(
        (response: any) => {
          if (response.success && response.streams) {
            this.allStreams = response.streams.map((s: any) => ({
              ...s,
              isLive: this.isActuallyLive(s)
            })).slice(0, 6);
          } else if (Array.isArray(response)) {
            this.allStreams = response.map((s: any) => ({
              ...s,
              isLive: this.isActuallyLive(s)
            })).slice(0, 6);
          }
          this.isLoadingStreams = false;
        },
        (error) => {
          console.error('Error al obtener streams:', error);
          this.isLoadingStreams = false;
          this.allStreams = [];
        }
      )
    );
  }

  isActuallyLive(stream: any): boolean {
    if (!stream) return false;
    if (stream.endedAt) {
      const endedDate = new Date(stream.endedAt);
      const now = new Date();
      if (!isNaN(endedDate.getTime()) && endedDate.getTime() < now.getTime()) {
        return false;
      }
    }
    if (stream.status !== 'live') {
      return false;
    }
    return true;
  }

  isStreamLive(stream: any): boolean {
    if (!stream) return false;
    if (stream.isLive) {
      return this.isActuallyLive(stream);
    }
    if (stream.status === 'live') {
      return this.isActuallyLive(stream);
    }
    return false;
  }

  getStreamTime(stream: any): string {
    if (this.isStreamLive(stream)) {
      return 'En vivo ahora';
    }
    
    if (stream.endedAt) {
      const endedDate = new Date(stream.endedAt);
      const now = new Date();
      const diffMs = now.getTime() - endedDate.getTime();
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMs / 3600000);
      const diffDays = Math.floor(diffMs / 86400000);

      if (diffMins < 1) {
        return 'Finalizó hace un momento';
      } else if (diffMins < 60) {
        return `Finalizó hace ${diffMins} min`;
      } else if (diffHours < 24) {
        return `Finalizó hace ${diffHours} ${diffHours === 1 ? 'hora' : 'horas'}`;
      } else if (diffDays < 7) {
        return `Finalizó hace ${diffDays} ${diffDays === 1 ? 'día' : 'días'}`;
      } else {
        return endedDate.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
      }
    }
    
    return 'Transmisión finalizada';
  }

  goToStream(stream: any): void {
    if (this.isStreamLive(stream) && stream.streamId) {
      this.router.navigate(['/live/watch', stream.streamId]);
    } else if (stream.streamId) {
      this.router.navigate(['/dashboard-live']);
    }
  }

  getFallbackProducts(): any[] {
    return [
      {
        _id: '690f88bed87dfe080187b672',
        name: 'Samsung Galaxy S24 Ultra',
        image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=300&fit=crop',
        price: 1299.99,
        commission: 194.99
      },
      {
        _id: '690f88bed87dfe080187b675',
        name: 'MacBook Pro 14 M3',
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop',
        price: 2199.00,
        commission: 329.85
      },
      {
        _id: '690f88bed87dfe080187b677',
        name: 'Sony WH-1000XM5',
        image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&h=300&fit=crop',
        price: 399.99,
        commission: 59.99
      },
      {
        _id: '690f88bed87dfe080187b679',
        name: 'Samsung 65" QLED 4K',
        image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=400&h=300&fit=crop',
        price: 1499.00,
        commission: 224.85
      }
    ];
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}

