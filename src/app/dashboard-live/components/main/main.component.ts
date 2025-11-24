import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoriesLivesService } from 'src/app/services/categories-lives.service';
import { LiveService } from 'src/app/lives/components/main/live.service';
import { Router } from '@angular/router';
import { UbicacionesService } from 'src/app/services/ubicaciones.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  // Filtros disponibles
  categorias: string[] = ['electrodomesticos', 'belleza','vestimenta', 'calzados', 'general', 'tecnologia', 'moda', 'educacion'];
  roles: string[] = ['vendedor', 'comprador', 'proveedor', 'distribuidor', 'revendedor'];
  productos: string[] = ['refrigerador', 'microondas', 'televisor', 'laptop', 'celular', 'ropa', 'zapatos', 'accesorios'];
  tiposProducto: string[] = ['nuevo', 'usado', 'reacondicionado', 'liquidacion', 'oferta especial'];
  estadosProducto: string[] = ['disponible', 'agotado', 'reservado', 'en transito', 'proximamente'];
  
  // Búsqueda de ubicaciones
  ubicacionesResultados: any[] = [];
  ubicacionesCargando: boolean = false;
  private ubicacionSearchSubject = new Subject<string>();

  // Valores seleccionados
  categoriaSeleccionada: string = '';
  rolSeleccionado: string = '';
  productoSeleccionado: string = '';
  tipoProductoSeleccionado: string = '';
  estadoSeleccionado: string = '';
  ubicacionSeleccionada: string = '';

  // Lista de vivos (streams) - ahora desde el backend
  vivos: any[] = [];
  activeStreams: any[] = [];
  isLoading = false;

  // Paginación
  currentPage = 1;
  pageSize = 12;
  totalStreams = 0;
  totalPages = 1;

  private refreshInterval: any;

  constructor(
    private liveService: CategoriesLivesService,
    private streamService: LiveService,
    private router: Router,
    private ubicacionesService: UbicacionesService
  ) {
    // Configurar búsqueda de ubicaciones con debounce
    this.ubicacionSearchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(query => {
        if (query.length < 2) {
          return [];
        }
        this.ubicacionesCargando = true;
        return this.ubicacionesService.buscarUbicaciones(query, 10);
      })
    ).subscribe({
      next: (resultados) => {
        this.ubicacionesResultados = resultados;
        this.ubicacionesCargando = false;
      },
      error: (error) => {
        console.error('Error al buscar ubicaciones:', error);
        this.ubicacionesCargando = false;
        this.ubicacionesResultados = [];
      }
    });
  }

  ngOnInit(): void {
    this.loadActiveStreams();

    // Refrescar la lista cada 10 segundos
    this.refreshInterval = setInterval(() => {
      this.loadActiveStreams(false);
    }, 10000);
  }

  ngOnDestroy(): void {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
  }

  // Métodos para manejar los filtros (ahora solo guardan valores, no aplican)
  seleccionarCategoria(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.categoriaSeleccionada = selectElement.value;
  }

  seleccionarRol(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.rolSeleccionado = selectElement.value;
  }

  seleccionarProducto(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.productoSeleccionado = selectElement.value;
  }

  seleccionarTipoProducto(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.tipoProductoSeleccionado = selectElement.value;
  }

  seleccionarEstado(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.estadoSeleccionado = selectElement.value;
  }

  seleccionarUbicacion(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.ubicacionSeleccionada = selectElement.value;
  }

  // Búsqueda de ubicaciones
  onUbicacionSearch(query: string) {
    this.ubicacionSearchSubject.next(query);
  }

  seleccionarUbicacionBusqueda(ubicacion: any) {
    this.ubicacionSeleccionada = ubicacion.nombreCompleto;
    this.ubicacionesResultados = [];
  }

  limpiarUbicacion() {
    this.ubicacionSeleccionada = '';
    this.ubicacionesResultados = [];
  }

  // Método para verificar si hay filtros activos
  hayFiltrosActivos(): boolean {
    return !!(
      this.categoriaSeleccionada ||
      this.rolSeleccionado ||
      this.productoSeleccionado ||
      this.tipoProductoSeleccionado ||
      this.estadoSeleccionado ||
      this.ubicacionSeleccionada
    );
  }

  // Método para aplicar todos los filtros
  aplicarFiltros() {
    // Aplicar filtros locales (legacy)
    if (this.categoriaSeleccionada) {
      this.liveService.getVivosPorCategoria(this.categoriaSeleccionada).subscribe((vivos) => {
        this.vivos = vivos;
      });
    }

    // Aplicar filtros a streams WebRTC del backend
    this.loadActiveStreams(true);
  }

  // Método para limpiar todos los filtros
  limpiarFiltros() {
    this.categoriaSeleccionada = '';
    this.rolSeleccionado = '';
    this.productoSeleccionado = '';
    this.tipoProductoSeleccionado = '';
    this.estadoSeleccionado = '';
    this.ubicacionSeleccionada = '';
    this.ubicacionesResultados = [];
    this.vivos = [];
    this.currentPage = 1;

    // Resetear todos los selects
    const selects = document.querySelectorAll('.filter-select') as NodeListOf<HTMLSelectElement>;
    selects.forEach(select => {
      select.value = '';
    });

    // Resetear el input de ubicación
    const ubicacionInput = document.querySelector('.ubicacion-search-input') as HTMLInputElement;
    if (ubicacionInput) {
      ubicacionInput.value = '';
    }

    this.loadActiveStreams(true);
  }

  // Cargar streams activos desde el backend
  loadActiveStreams(showLoader = true) {
    if (showLoader) {
      this.isLoading = true;
    }

    const params: any = {
      page: this.currentPage,
      limit: this.pageSize
    };

    // Aplicar TODOS los filtros si están seleccionados
    if (this.categoriaSeleccionada) {
      params.category = this.categoriaSeleccionada;
    }
    if (this.rolSeleccionado) {
      params.role = this.rolSeleccionado;
    }
    if (this.productoSeleccionado) {
      params.product = this.productoSeleccionado;
    }
    if (this.tipoProductoSeleccionado) {
      params.productType = this.tipoProductoSeleccionado;
    }
    if (this.estadoSeleccionado) {
      params.productStatus = this.estadoSeleccionado;
    }
    if (this.ubicacionSeleccionada) {
      params.location = this.ubicacionSeleccionada;
    }

    this.streamService.getActiveStreams(params).subscribe({
      next: (response) => {
        if (response.success) {
          // Filtrar y validar que los streams realmente estén en vivo
          const allStreams = response.streams || [];
          this.activeStreams = allStreams.map((stream: any) => ({
            ...stream,
            isLive: this.isActuallyLive(stream)
          }));

          if (response.pagination) {
            this.totalStreams = response.pagination.total;
            this.totalPages = response.pagination.pages;
            this.currentPage = response.pagination.page;
          }
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar streams activos:', error);
        this.isLoading = false;
        this.activeStreams = [];
      }
    });
  }

  // Navegar a ver un stream específico
  watchStream(streamId: string) {
    console.log('Navegando a stream:', streamId);
    this.router.navigate(['/live/watch', streamId]);
  }

  // Paginación
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadActiveStreams();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadActiveStreams();
    }
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadActiveStreams();
    }
  }

  // Helper para calcular tiempo transcurrido
  getTimeAgo(startedAt: string): string {
    if (!startedAt) return 'Reciente';

    const now = new Date().getTime();
    const start = new Date(startedAt).getTime();
    const diff = Math.floor((now - start) / 1000); // en segundos

    if (diff < 60) return `${diff}s`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m`;
    return `${Math.floor(diff / 3600)}h`;
  }

  /**
   * Valida si un stream realmente está en vivo
   * Verifica múltiples condiciones para asegurar que el stream esté activo
   */
  isActuallyLive(stream: any): boolean {
    if (!stream) return false;

    // Si tiene endedAt, definitivamente no está en vivo
    if (stream.endedAt) {
      const endedDate = new Date(stream.endedAt);
      const now = new Date();
      // Si endedAt es válido y es anterior a ahora, no está en vivo
      if (!isNaN(endedDate.getTime()) && endedDate.getTime() < now.getTime()) {
        return false;
      }
    }

    // El status debe ser 'live'
    if (stream.status !== 'live') {
      return false;
    }

    // Si pasa todas las validaciones, está en vivo
    return true;
  }

  /**
   * Método para verificar si un stream debe mostrarse como en vivo
   */
  isStreamLive(stream: any): boolean {
    if (!stream) return false;
    
    // Si ya tiene isLive marcado, validar que realmente esté en vivo
    if (stream.isLive !== undefined) {
      return stream.isLive;
    }
    
    // Si no tiene isLive pero tiene status 'live', validar
    if (stream.status === 'live') {
      return this.isActuallyLive(stream);
    }
    
    return false;
  }
}
