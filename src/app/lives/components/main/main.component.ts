import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import Hls from 'hls.js';
import { LiveService } from './live.service';
import { UbicacionesService, UbicacionResult } from 'src/app/services/ubicaciones.service';
import { StreamingStateService } from 'src/app/services/streaming-state.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

declare const window: any;

interface ChatMessage {
  user: string;
  text: string;
  time: string;
  avatar: string;
  userId?: string;
  username?: string;
  message?: string;
  timestamp?: string;
}

interface Product {
  id: string;
  image: string;
  title: string;
  price: string;
  badge: string;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('300ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ transform: 'translateX(100%)', opacity: 0 }))
      ])
    ])
  ]
})
export class MainComponent implements OnInit, AfterViewInit, OnDestroy {
  trustedStreamingUrl: SafeResourceUrl | undefined;
  private streamUrl: string = '';
  private hls: Hls | undefined;

  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;

  // Variables para WebRTC Streaming
  isStreaming = false;
  isCreatingStream = false;
  currentStream: any = null;
  viewerCount = 0;
  streamTitle = '';
  streamDescription = '';
  streamCategory = 'general';
  streamRole = '';
  streamProduct = '';
  streamProductType = '';
  streamProductStatus = '';
  streamLocation = '';
  streamTags: string[] = [];
  newComment = '';

  // Listas de opciones para los filtros (igual que dashboard-live)
  categorias: string[] = ['electrodomesticos', 'belleza','vestimenta', 'calzados', 'general', 'tecnologia', 'moda', 'educacion'];
  roles: string[] = ['vendedor', 'comprador', 'proveedor', 'distribuidor', 'revendedor'];
  productos: string[] = ['refrigerador', 'microondas', 'televisor', 'laptop', 'celular', 'ropa', 'zapatos', 'accesorios'];
  tiposProducto: string[] = ['nuevo', 'usado', 'reacondicionado', 'liquidacion', 'oferta especial'];
  estadosProducto: string[] = ['disponible', 'agotado', 'reservado', 'en transito', 'proximamente'];
  ubicaciones: string[] = [
    // CIUDAD AUTÓNOMA DE BUENOS AIRES
    'Ciudad Autónoma de Buenos Aires (CABA)',

    // PROVINCIA DE BUENOS AIRES (Capital: La Plata)
    'La Plata', 'Mar del Plata', 'Bahía Blanca', 'San Isidro', 'Quilmes', 'Avellaneda',
    'Lanús', 'Lomas de Zamora', 'Morón', 'San Martín', 'Tres de Febrero', 'Vicente López',
    'San Miguel', 'Tigre', 'Almirante Brown', 'Berazategui', 'Florencio Varela', 'Esteban Echeverría',
    'Malvinas Argentinas', 'José C. Paz', 'Hurlingham', 'Ituzaingó', 'La Matanza', 'Merlo',
    'Moreno', 'General San Martín', 'Pilar', 'Escobar', 'Campana', 'Zárate', 'Pergamino',
    'Junín', 'Chivilcoy', 'Mercedes', 'Luján', 'Olavarría', 'Tandil', 'Azul', 'Necochea',
    'Tres Arroyos', 'Balcarce', 'General Pueyrredón', 'Dolores', 'Chascomús', 'San Nicolás',
    'Ramallo', 'San Pedro', 'Bragado', 'Carlos Casares', 'Pehuajó', 'Trenque Lauquen',
    'General Villegas', 'Lincoln', 'Nueve de Julio', 'Bolívar', 'Saladillo', 'Lobos',
    'Navarro', 'Cañuelas', 'San Vicente', 'Brandsen', 'Monte', 'General Belgrano',
    'Rauch', 'Ayacucho', 'Tapalqué', 'Las Flores', 'Ranchos', 'General Paz', 'Maipú',

    // PROVINCIA DE CATAMARCA (Capital: San Fernando del Valle de Catamarca)
    'San Fernando del Valle de Catamarca', 'Andalgalá', 'Belén', 'Santa María', 'Tinogasta',
    'Fiambalá', 'Valle Viejo', 'Capayán', 'Recreo', 'Fray Mamerto Esquiú',

    // PROVINCIA DEL CHACO (Capital: Resistencia)
    'Resistencia', 'Barranqueras', 'Fontana', 'Puerto Vilelas', 'Presidencia Roque Sáenz Peña',
    'Villa Ángela', 'Charata', 'General José de San Martín', 'Quitilipi', 'Las Breñas',
    'Juan José Castelli', 'Villa Berthet', 'Machagai', 'Corzuela', 'General Pinedo',

    // PROVINCIA DEL CHUBUT (Capital: Rawson)
    'Rawson', 'Comodoro Rivadavia', 'Puerto Madryn', 'Trelew', 'Esquel', 'Gaiman',
    'Puerto Deseado', 'Dolavon', 'Sarmiento', 'Rada Tilly', 'Gobernador Costa',

    // PROVINCIA DE CÓRDOBA (Capital: Córdoba)
    'Córdoba', 'Villa María', 'Río Cuarto', 'San Francisco', 'Villa Carlos Paz', 'Alta Gracia',
    'Bell Ville', 'Río Tercero', 'Villa Dolores', 'Jesús María', 'Cruz del Eje', 'La Calera',
    'Cosquín', 'Dean Funes', 'Arroyito', 'Laboulaye', 'San Francisco del Chañar', 'Villa Allende',
    'Unquillo', 'Río Segundo', 'Río Primero', 'Villa Nueva', 'Marcos Juárez', 'Las Varillas',
    'Oncativo', 'Oliva', 'Deán Funes', 'Villa del Rosario', 'Malvinas Argentinas',

    // PROVINCIA DE CORRIENTES (Capital: Corrientes)
    'Corrientes', 'Goya', 'Paso de los Libres', 'Curuzú Cuatiá', 'Mercedes', 'Santo Tomé',
    'Esquina', 'Monte Caseros', 'Bella Vista', 'Empedrado', 'Saladas', 'Ituzaingó',
    'Alvear', 'La Cruz', 'Sauce', 'San Luis del Palmar', 'San Roque', 'Berón de Astrada',

    // PROVINCIA DE ENTRE RÍOS (Capital: Paraná)
    'Paraná', 'Concordia', 'Gualeguaychú', 'Concepción del Uruguay', 'Gualeguay', 'Victoria',
    'Villaguay', 'Colón', 'Federación', 'Chajarí', 'La Paz', 'Federal', 'San José',
    'Crespo', 'Diamante', 'San Salvador', 'Nogoyá', 'Basavilbaso', 'Urdinarrain',

    // PROVINCIA DE FORMOSA (Capital: Formosa)
    'Formosa', 'Clorinda', 'Pirané', 'Ibarreta', 'El Colorado', 'Las Lomitas',
    'Comandante Fontana', 'Ingeniero Juárez', 'Laguna Blanca', 'General Güemes',

    // PROVINCIA DE JUJUY (Capital: San Salvador de Jujuy)
    'San Salvador de Jujuy', 'San Pedro de Jujuy', 'Libertador General San Martín', 'Palpalá',
    'La Quiaca', 'Humahuaca', 'Tilcara', 'Perico', 'El Carmen', 'Monterrico',
    'Fraile Pintado', 'Calilegua', 'San Antonio', 'Abra Pampa', 'Purmamarca',

    // PROVINCIA DE LA PAMPA (Capital: Santa Rosa)
    'Santa Rosa', 'General Pico', 'General Acha', 'Toay', 'Realicó', 'Eduardo Castex',
    'Macachín', 'Intendente Alvear', 'Ingeniero Luiggi', 'Victorica', 'Quemú Quemú',

    // PROVINCIA DE LA RIOJA (Capital: La Rioja)
    'La Rioja', 'Chilecito', 'Arauco', 'Chamical', 'Aimogasta', 'Villa Unión',
    'Chepes', 'Vinchina', 'Famatina', 'Sanagasta', 'Nonogasta', 'Villa Castelli',

    // PROVINCIA DE MENDOZA (Capital: Mendoza)
    'Mendoza', 'Godoy Cruz', 'Guaymallén', 'Las Heras', 'Maipú', 'Luján de Cuyo',
    'San Martín', 'Rivadavia', 'Junín', 'San Rafael', 'Tupungato', 'Tunuyán',
    'La Paz', 'Santa Rosa', 'General Alvear', 'Malargüe', 'San Carlos', 'Lavalle',

    // PROVINCIA DE MISIONES (Capital: Posadas)
    'Posadas', 'Oberá', 'Eldorado', 'Puerto Iguazú', 'Apóstoles', 'Jardín América',
    'Puerto Rico', 'Montecarlo', 'Leandro N. Alem', 'San Vicente', 'Aristóbulo del Valle',
    'Campo Grande', 'Garupá', 'Candelaria', 'Wanda', 'Puerto Esperanza', 'Dos de Mayo',

    // PROVINCIA DEL NEUQUÉN (Capital: Neuquén)
    'Neuquén', 'San Martín de los Andes', 'Plottier', 'Centenario', 'Zapala', 'Cutral Có',
    'Plaza Huincul', 'Junín de los Andes', 'Chos Malal', 'Villa La Angostura', 'Añelo',
    'Senillosa', 'San Patricio del Chañar', 'Vista Alegre', 'Aluminé', 'Loncopué',

    // PROVINCIA DE RÍO NEGRO (Capital: Viedma)
    'Viedma', 'San Carlos de Bariloche', 'General Roca', 'Cipolletti', 'Villa Regina',
    'Cinco Saltos', 'Allen', 'Catriel', 'El Bolsón', 'Choele Choel', 'San Antonio Oeste',
    'Río Colorado', 'Ingeniero Jacobacci', 'Sierra Grande', 'Lamarque', 'Luis Beltrán',

    // PROVINCIA DE SALTA (Capital: Salta)
    'Salta', 'San Ramón de la Nueva Orán', 'Tartagal', 'Metán', 'General Güemes',
    'Rosario de la Frontera', 'Cafayate', 'Joaquín V. González', 'Embarcación', 'Cerrillos',
    'San José de Metán', 'El Carril', 'Coronel Moldes', 'La Caldera', 'Campo Quijano',
    'Rosario de Lerma', 'Chicoana', 'Cachi', 'Molinos', 'San Carlos', 'Cafayate',

    // PROVINCIA DE SAN JUAN (Capital: San Juan)
    'San Juan', 'Rivadavia', 'Chimbas', 'Rawson', 'Pocito', 'Santa Lucía', 'Caucete',
    'Albardón', 'Nueve de Julio', 'Veinticinco de Mayo', 'San Martín', 'Jáchal',
    'Ullum', 'Zonda', 'Angaco', 'Valle Fértil', 'Iglesia', 'Calingasta', 'Sarmiento',

    // PROVINCIA DE SAN LUIS (Capital: San Luis)
    'San Luis', 'Villa Mercedes', 'La Punta', 'Merlo', 'Justo Daract', 'Tilisarao',
    'Santa Rosa del Conlara', 'Villa de la Quebrada', 'Concarán', 'Naschel', 'Quines',

    // PROVINCIA DE SANTA CRUZ (Capital: Río Gallegos)
    'Río Gallegos', 'Caleta Olivia', 'Pico Truncado', 'Puerto Deseado', 'Puerto San Julián',
    'Río Turbio', 'El Calafate', 'El Chaltén', 'Las Heras', 'Gobernador Gregores',
    'Puerto Santa Cruz', 'Comandante Luis Piedra Buena', 'Perito Moreno', '28 de Noviembre',

    // PROVINCIA DE SANTA FE (Capital: Santa Fe)
    'Santa Fe', 'Rosario', 'Rafaela', 'Venado Tuerto', 'Reconquista', 'Villa Gobernador Gálvez',
    'Santo Tomé', 'Esperanza', 'San Lorenzo', 'Casilda', 'Cañada de Gómez', 'Funes',
    'Granadero Baigorria', 'Capitán Bermúdez', 'Firmat', 'Gálvez', 'Sunchales', 'Ceres',
    'Coronda', 'Las Parejas', 'San Cristóbal', 'Tostado', 'Vera', 'Avellaneda',
    'Reconquista', 'Villa Ocampo', 'Rufino', 'San Jorge', 'Las Rosas', 'Totoras',

    // PROVINCIA DE SANTIAGO DEL ESTERO (Capital: Santiago del Estero)
    'Santiago del Estero', 'La Banda', 'Termas de Río Hondo', 'Frías', 'Añatuya',
    'Fernández', 'Monte Quemado', 'Suncho Corral', 'Quimilí', 'Loreto', 'Pinto',
    'Clodomira', 'Villa Ojo de Agua', 'Bandera', 'Selva', 'Sumampa', 'Tintina',

    // PROVINCIA DE TIERRA DEL FUEGO (Capital: Ushuaia)
    'Ushuaia', 'Río Grande', 'Tolhuin', 'Puerto Almanza', 'Puerto Williams',

    // PROVINCIA DE TUCUMÁN (Capital: San Miguel de Tucumán)
    'San Miguel de Tucumán', 'San Pedro de Colalao', 'Tafí Viejo', 'Yerba Buena',
    'Banda del Río Salí', 'Concepción', 'Aguilares', 'Monteros', 'Famaillá', 'Alderetes',
    'Simoca', 'Tafí del Valle', 'Lules', 'Trancas', 'Burruyacú', 'Chicligasta', 'Graneros'
  ];

  private language = 'es';
  private streamingService: any;

  // Datos para productos adicionales
  additionalProducts: Product[] = [
    { id: 'camisa-cuadrille-1', image: 'https://i.imgur.com/QpjAiHq.jpg', title: 'Camisa Cuadrille con Botones', price: '$35,000', badge: 'En Venta' },
    { id: 'camisa-cuadrille-2', image: 'https://i.imgur.com/QpjAiHq.jpg', title: 'Camisa Cuadrille con Botones', price: '$35,000', badge: 'En Venta' },
    { id: 'camisa-cuadrille-3', image: 'https://i.imgur.com/QpjAiHq.jpg', title: 'Camisa Cuadrille con Botones', price: '$35,000', badge: 'En Venta' },
    { id: 'camisa-cuadrille-4', image: 'https://i.imgur.com/QpjAiHq.jpg', title: 'Camisa Cuadrille con Botones', price: '$35,000', badge: 'En Venta' },
    { id: 'camisa-cuadrille-5', image: 'https://i.imgur.com/QpjAiHq.jpg', title: 'Camisa Cuadrille con Botones', price: '$35,000', badge: 'En Venta' },
    { id: 'camisa-cuadrille-6', image: 'https://i.imgur.com/QpjAiHq.jpg', title: 'Camisa Cuadrille con Botones', price: '$35,000', badge: 'En Venta' },
    { id: 'camisa-cuadrille-7', image: 'https://i.imgur.com/QpjAiHq.jpg', title: 'Camisa Cuadrille con Botones', price: '$35,000', badge: 'En Venta' },
    { id: 'camisa-cuadrille-8', image: 'https://i.imgur.com/QpjAiHq.jpg', title: 'Camisa Cuadrille con Botones', price: '$35,000', badge: 'En Venta' },
    { id: 'saco-gabardina', image: '../../../../assets/img/product-3.png', title: 'Saco Gabardina Mujer', price: '$35,000', badge: 'En Venta' }
  ];

  // Datos para comentarios
  comments: ChatMessage[] = [
    { user: 'Usuario 1', text: '¡Gran transmisión!', time: 'hace 2 min', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face' },
    { user: 'Usuario 2', text: '¡Me encanta el contenido!', time: 'hace 5 min', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face' },
    { user: 'Usuario 1', text: '¡Gran transmisión!', time: 'hace 8 min', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face' },
    { user: 'Usuario 2', text: '¡Me encanta el contenido!', time: 'hace 12 min', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face' }
  ];

  // Sistema de búsqueda de ubicaciones
  ubicacionesResultados: UbicacionResult[] = [];
  ubicacionesCargando = false;
  ubicacionSeleccionada: UbicacionResult | null = null;
  private ubicacionSearchSubject = new Subject<string>();

  // Configuración de dispositivos y calidad
  showSettingsMenu = false;
  videoDevices: MediaDeviceInfo[] = [];
  audioDevices: MediaDeviceInfo[] = [];
  selectedVideoDevice = '';
  selectedAudioDevice = '';
  selectedVideoQuality = '720p';

  // Constraints de calidad de video
  private videoQualityConstraints: any = {
    '1080p': { width: 1920, height: 1080, frameRate: 30 },
    '720p': { width: 1280, height: 720, frameRate: 30 },
    '480p': { width: 854, height: 480, frameRate: 25 },
    '360p': { width: 640, height: 360, frameRate: 25 }
  };

  constructor(
    private router: Router,
    private sanitizer: DomSanitizer,
    private liveService: LiveService,
    private ubicacionesService: UbicacionesService,
    private streamingStateService: StreamingStateService
  ) {
    this.streamingService = this.liveService.getStreamingService();

    // Configurar búsqueda de ubicaciones con debounce
    this.ubicacionSearchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(query => {
        if (!query || query.trim().length < 2) {
          this.ubicacionesResultados = [];
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
        console.error('Error en búsqueda de ubicaciones:', error);
        this.ubicacionesResultados = [];
        this.ubicacionesCargando = false;
      }
    });
  }

  /**
   * Método para buscar ubicaciones en tiempo real
   */
  onUbicacionSearch(query: string): void {
    this.ubicacionSearchSubject.next(query);
  }

  /**
   * Seleccionar una ubicación de los resultados
   */
  seleccionarUbicacion(ubicacion: UbicacionResult): void {
    this.ubicacionSeleccionada = ubicacion;
    this.streamLocation = ubicacion.nombreCompleto;
    this.ubicacionesResultados = [];

    // Actualizar el input del modal si existe
    const input = document.getElementById('ubicacion-search-input') as HTMLInputElement;
    if (input) {
      input.value = ubicacion.nombreCompleto;
    }
  }

  /**
   * Limpiar selección de ubicación
   */
  limpiarUbicacion(): void {
    this.ubicacionSeleccionada = null;
    this.streamLocation = '';
    this.ubicacionesResultados = [];

    const input = document.getElementById('ubicacion-search-input') as HTMLInputElement;
    if (input) {
      input.value = '';
    }
  }

  /**
   * Seleccionar ubicación desde el modal de SweetAlert
   */
  seleccionarUbicacionDesdeModal(nombreCompleto: string, index: number): void {
    const searchInput = document.getElementById('ubicacion-search-input') as HTMLInputElement;
    const resultsContainer = document.getElementById('ubicacion-results') as HTMLDivElement;

    if (searchInput) {
      searchInput.value = nombreCompleto;
    }

    if (resultsContainer) {
      resultsContainer.innerHTML = '';
      resultsContainer.style.display = 'none';
    }
  }

  async startStreaming() {
    if (this.isStreaming) {
      await this.stopStreaming();
      return;
    }

    // Obtener el tipo de usuario desde localStorage (se usará como rol)
    const userDataStr = localStorage.getItem('user_data');
    const userData = userDataStr ? JSON.parse(userDataStr) : null;
    const userType = localStorage.getItem('userType') || userData?.primary_data?.type || 'professional';

    // Mostrar formulario para configurar el stream con TODOS los filtros
    const { value: formValues } = await Swal.fire({
      title: '🎥 Configurar Transmisión en Vivo',
      html: `
        <div class="stream-form-container">
          <!-- Información Principal -->
          <div class="form-section">
            <h3 class="section-title">📝 Información Principal</h3>
            <div class="form-row full-width">
              <label for="swal-input1" class="form-label">
                <span class="label-icon">🏷️</span>
                Título del Stream
              </label>
              <input
                id="swal-input1"
                class="form-input"
                type="text"
                placeholder="Ej: Ofertas especiales de electrodomésticos"
                value="Mi Transmisión en Vivo"
              />
            </div>

            <div class="form-row full-width">
              <label for="swal-input2" class="form-label">
                <span class="label-icon">📄</span>
                Descripción (opcional)
              </label>
              <textarea
                id="swal-input2"
                class="form-textarea"
                placeholder="Describe de qué tratará tu transmisión..."
                rows="3"
              ></textarea>
            </div>
          </div>

          <!-- Clasificación del Stream -->
          <div class="form-section">
            <h3 class="section-title">🎯 Clasificación</h3>
            <div class="form-grid">
              <div class="form-row full-width">
                <label for="swal-input3" class="form-label">
                  <span class="label-icon">📂</span>
                  Categoría
                </label>
                <select id="swal-input3" class="form-select">
                  <option value="" disabled selected>Seleccionar...</option>
                  <option value="electrodomesticos">🔌 Electrodomésticos</option>
                  <option value="belleza">💄 Belleza</option>
                  <option value="vestimenta">👕 Vestimenta</option>
                  <option value="calzados">👟 Calzados</option>
                  <option value="tecnologia">💻 Tecnología</option>
                  <option value="moda">👗 Moda</option>
                  <option value="educacion">📚 Educación</option>
                  <option value="general">🌐 General</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Detalles del Producto -->
          <div class="form-section">
            <h3 class="section-title">📦 Detalles del Producto</h3>
            <div class="form-grid">
              <div class="form-row">
                <label for="swal-input4" class="form-label">
                  <span class="label-icon">🏷️</span>
                  Producto
                </label>
                <select id="swal-input4" class="form-select">
                  <option value="" disabled selected>Seleccionar...</option>
                  <option value="refrigerador">❄️ Refrigerador</option>
                  <option value="microondas">🔥 Microondas</option>
                  <option value="televisor">📺 Televisor</option>
                  <option value="laptop">💻 Laptop</option>
                  <option value="celular">📱 Celular</option>
                  <option value="ropa">👕 Ropa</option>
                  <option value="zapatos">👟 Zapatos</option>
                  <option value="accesorios">⌚ Accesorios</option>
                </select>
              </div>

              <div class="form-row">
                <label for="swal-input5" class="form-label">
                  <span class="label-icon">🏭</span>
                  Tipo
                </label>
                <select id="swal-input5" class="form-select">
                  <option value="" disabled selected>Seleccionar...</option>
                  <option value="nuevo">✨ Nuevo</option>
                  <option value="usado">🔄 Usado</option>
                  <option value="reacondicionado">🔧 Reacondicionado</option>
                  <option value="liquidacion">💸 Liquidación</option>
                  <option value="oferta especial">🎁 Oferta Especial</option>
                </select>
              </div>

              <div class="form-row full-width-grid">
                <label for="swal-input6" class="form-label">
                  <span class="label-icon">📊</span>
                  Estado
                </label>
                <select id="swal-input6" class="form-select">
                  <option value="" disabled selected>Seleccionar...</option>
                  <option value="disponible">✅ Disponible</option>
                  <option value="agotado">❌ Agotado</option>
                  <option value="reservado">🔒 Reservado</option>
                  <option value="en transito">🚚 En Tránsito</option>
                  <option value="proximamente">🔜 Próximamente</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Ubicación -->
          <div class="form-section">
            <h3 class="section-title">Ubicación</h3>
            <div class="form-row full-width">
              <label for="ubicacion-search-input" class="form-label">
                Ciudad / Localidad
              </label>
              <div class="ubicacion-search-container">
                <input
                  id="ubicacion-search-input"
                  class="form-input"
                  type="text"
                  placeholder="Buscar ubicación..."
                  autocomplete="off"
                  oninput="window.currentComponent && window.currentComponent.onUbicacionSearch(this.value)"
                />
                <div id="ubicacion-results" class="ubicacion-results"></div>
              </div>
              <small style="color: #888; font-size: 0.85em; margin-top: 5px; display: block;">
                Escribe al menos 2 caracteres para buscar
              </small>
            </div>
          </div>
        </div>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: '🚀 Iniciar Transmisión',
      cancelButtonText: '❌ Cancelar',
      width: '750px',
      customClass: {
        popup: 'stream-config-modal'
      },
      didOpen: () => {
        // Guardar referencia del componente para acceso desde el HTML
        (window as any).currentComponent = this;

        // Configurar búsqueda de ubicaciones
        const searchInput = document.getElementById('ubicacion-search-input') as HTMLInputElement;
        const resultsContainer = document.getElementById('ubicacion-results') as HTMLDivElement;

        if (searchInput) {
          searchInput.addEventListener('input', (e) => {
            const query = (e.target as HTMLInputElement).value;

            if (!query || query.length < 2) {
              resultsContainer.innerHTML = '';
              resultsContainer.style.display = 'none';
              return;
            }

            // Mostrar loading
            resultsContainer.innerHTML = '<div class="ubicacion-loading">Buscando...</div>';
            resultsContainer.style.display = 'block';

            // Buscar ubicaciones
            this.ubicacionesService.buscarUbicaciones(query, 10).subscribe({
              next: (resultados) => {
                if (resultados.length === 0) {
                  resultsContainer.innerHTML = '<div class="ubicacion-no-results">No se encontraron resultados</div>';
                } else {
                  let html = '';
                  resultados.forEach((ub, index) => {
                    html += `
                      <div class="ubicacion-result-item" onclick="window.currentComponent.seleccionarUbicacionDesdeModal('${ub.nombreCompleto}', ${index})">
                        ${ub.nombreCompleto}
                      </div>
                    `;
                  });
                  resultsContainer.innerHTML = html;
                }
                resultsContainer.style.display = 'block';
              },
              error: (error) => {
                resultsContainer.innerHTML = '<div class="ubicacion-error">Error al buscar ubicaciones</div>';
                console.error('Error:', error);
              }
            });
          });
        }
      },
      preConfirm: () => {
        return {
          title: (document.getElementById('swal-input1') as HTMLInputElement).value,
          description: (document.getElementById('swal-input2') as HTMLTextAreaElement).value,
          category: (document.getElementById('swal-input3') as HTMLSelectElement).value,
          product: (document.getElementById('swal-input4') as HTMLSelectElement).value,
          productType: (document.getElementById('swal-input5') as HTMLSelectElement).value,
          productStatus: (document.getElementById('swal-input6') as HTMLSelectElement).value,
          location: (document.getElementById('ubicacion-search-input') as HTMLInputElement).value
        }
      }
    });

    if (formValues) {
      this.streamTitle = formValues.title || 'Transmisión en Vivo';
      this.streamDescription = formValues.description || '';
      this.streamCategory = formValues.category || 'general';
      this.streamRole = userType; // Se toma del tipo de usuario
      this.streamProduct = formValues.product || '';
      this.streamProductType = formValues.productType || '';
      this.streamProductStatus = formValues.productStatus || '';
      this.streamLocation = formValues.location || '';

      await this.createAndStartStream();
    }
  }

  private async createAndStartStream() {
    try {
      this.isCreatingStream = true;

      // 1. Crear el stream en el servidor
      this.liveService.createWebRTCStream({
        title: this.streamTitle,
        description: this.streamDescription,
        quality: '720p',
        isPrivate: false,
        category: this.streamCategory,
        role: this.streamRole,
        product: this.streamProduct,
        productType: this.streamProductType,
        productStatus: this.streamProductStatus,
        location: this.streamLocation,
        tags: this.streamTags
      }).subscribe({
        next: async (response) => {
          if (response.success) {
            this.currentStream = response.stream;

            // 2. Conectar Socket.IO
            this.streamingService.connectSocket();
            this.setupSocketListeners();

            // 3. Obtener permisos de cámara y micrófono e iniciar WebRTC
            try {
              const mediaStream = await this.streamingService.startBroadcasting(
                this.currentStream.streamId,
                this.videoPlayer.nativeElement
              );

              // 4. Unirse a la sala del stream
              const userId = localStorage.getItem('userId') || 'streamer';
              const username = localStorage.getItem('username') || 'Streamer';
              const role = localStorage.getItem('role') || 'professional';

              this.streamingService.joinStreamRoom(
                this.currentStream.streamId,
                userId,
                username,
                role
              );

              // 5. Crear y enviar offer WebRTC
              await this.streamingService.createOffer(this.currentStream.streamId);

              // 6. Marcar el stream como live en el servidor
              this.liveService.startWebRTCStream(this.currentStream.streamId).subscribe({
                next: () => {
                  this.isStreaming = true;
                  this.isCreatingStream = false;

                  // Guardar streamId en localStorage para recuperar después de refresh
                  localStorage.setItem('activeStreamId', this.currentStream.streamId);
                  localStorage.setItem('activeStreamRole', 'streamer');

                  // Actualizar estado global para el botón flotante
                  this.streamingStateService.startStreaming(this.currentStream.streamId);
                  this.streamingStateService.updateState({
                    videoDevices: this.videoDevices,
                    audioDevices: this.audioDevices,
                    selectedVideoDevice: this.selectedVideoDevice,
                    selectedAudioDevice: this.selectedAudioDevice,
                    selectedVideoQuality: this.selectedVideoQuality
                  });

                  // Notificar via Socket.IO que el broadcast comenzó
                  this.streamingService.startBroadcastEvent(this.currentStream.streamId);

                  Swal.fire('¡Transmisión iniciada!', 'Estás en vivo', 'success');
                },
                error: (error) => {
                  console.error('Error al marcar stream como live:', error);
                  this.cleanupStream();
                }
              });

            } catch (error) {
              console.error('Error al obtener permisos de medios:', error);
              Swal.fire('Error', 'No se pudo acceder a la cámara o micrófono', 'error');
              this.cleanupStream();
            }
          }
        },
        error: (error) => {
          console.error('Error al crear stream:', error);
          this.isCreatingStream = false;

          // Verificar si es error 429 (ya hay un stream activo)
          if (error.status === 429 || error.error?.error?.includes('stream(s) activo')) {
            Swal.fire({
              title: 'Ya tienes una transmisión activa',
              text: '¿Deseas finalizar la transmisión anterior y crear una nueva?',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonText: 'Sí, finalizar anterior',
              cancelButtonText: 'Cancelar'
            }).then((result) => {
              if (result.isConfirmed) {
                this.endPreviousStreamAndCreateNew();
              }
            });
          } else {
            Swal.fire('Error', 'No se pudo crear la transmisión. ' + (error.error?.message || error.message || ''), 'error');
          }
        }
      });

    } catch (error) {
      console.error('Error en createAndStartStream:', error);
      this.isCreatingStream = false;
    }
  }

  private async stopStreaming() {
    if (!this.currentStream) return;

    const result = await Swal.fire({
      title: '¿Finalizar transmisión?',
      text: 'Se terminará el stream para todos los espectadores',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, finalizar',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      // 1. Finalizar stream en el servidor
      this.liveService.endWebRTCStream(this.currentStream.streamId).subscribe({
        next: (response) => {
          // 2. Notificar via Socket.IO
          this.streamingService.stopBroadcastEvent(this.currentStream.streamId);

          // 3. Salir de la sala
          const userId = localStorage.getItem('userId') || 'streamer';
          this.streamingService.leaveStreamRoom(this.currentStream.streamId, userId);

          // 4. Actualizar estado global
          this.streamingStateService.stopStreaming();

          // 5. Limpiar recursos
          this.cleanupStream();

          // 5. Mostrar estadísticas
          Swal.fire({
            title: 'Transmisión finalizada',
            html: `
              <p>Duración: ${Math.floor(response.stream.duration / 60)} minutos</p>
              <p>Espectadores totales: ${response.stream.viewerCount}</p>
              <p>Pico de espectadores: ${response.stream.peakViewers}</p>
            `,
            icon: 'success'
          });
        },
        error: (error) => {
          console.error('Error al finalizar stream:', error);
          this.cleanupStream();
        }
      });
    }
  }

  private cleanupStream() {
    this.streamingService.closeWebRTC();
    this.streamingService.disconnectSocket();
    this.isStreaming = false;
    this.isCreatingStream = false;
    this.currentStream = null;
    this.viewerCount = 0;

    // Limpiar localStorage
    localStorage.removeItem('activeStreamId');
    localStorage.removeItem('activeStreamRole');

    // Limpiar el video
    if (this.videoPlayer && this.videoPlayer.nativeElement) {
      this.videoPlayer.nativeElement.srcObject = null;
    }
  }

  private endPreviousStreamAndCreateNew() {
    // Obtener streams activos del usuario
    this.liveService.getMyStreams().subscribe({
      next: (response) => {
        if (response.success && response.streams && response.streams.length > 0) {
          // Finalizar todos los streams activos
          const activeStream = response.streams[0];
          this.liveService.endWebRTCStream(activeStream.streamId).subscribe({
            next: () => {
              console.log('Stream anterior finalizado');
              // Esperar un poco y crear el nuevo stream
              setTimeout(() => {
                this.createAndStartStream();
              }, 1000);
            },
            error: (error) => {
              console.error('Error al finalizar stream anterior:', error);
              Swal.fire('Error', 'No se pudo finalizar la transmisión anterior', 'error');
            }
          });
        } else {
          // Si no hay streams activos, crear uno nuevo directamente
          this.createAndStartStream();
        }
      },
      error: (error) => {
        console.error('Error al obtener streams:', error);
        Swal.fire('Error', 'No se pudo verificar transmisiones anteriores', 'error');
      }
    });
  }

  private setupSocketListeners() {
    // Escuchar cuando viewers se unen
    this.streamingService.onViewerJoined((data: any) => {
      this.viewerCount = data.viewerCount;
      this.streamingStateService.updateViewerCount(this.viewerCount);
      console.log(`Viewer ${data.username} se unió. Total: ${this.viewerCount}`);
    });

    // Escuchar cuando viewers se van
    this.streamingService.onViewerLeft((data: any) => {
      this.viewerCount = data.viewerCount;
      this.streamingStateService.updateViewerCount(this.viewerCount);
      console.log(`Viewer salió. Total: ${this.viewerCount}`);
    });

    // Escuchar mensajes del chat
    this.streamingService.onChatMessage((data: any) => {
      this.comments.push({
        user: data.username || data.user,
        text: data.message || data.text,
        time: 'ahora',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
        userId: data.userId,
        username: data.username,
        message: data.message,
        timestamp: data.timestamp
      });
    });

    // Escuchar respuestas WebRTC de viewers
    this.streamingService.onWebRTCAnswer(async (data: any) => {
      try {
        await this.streamingService.handleAnswer(data.answer);
        console.log('Answer recibido de viewer:', data.from);
      } catch (error) {
        console.error('Error al manejar answer:', error);
      }
    });

    // Escuchar ICE candidates
    this.streamingService.onWebRTCIceCandidate(async (data: any) => {
      try {
        await this.streamingService.handleIceCandidate(data.candidate);
        console.log('ICE candidate recibido');
      } catch (error) {
        console.error('Error al manejar ICE candidate:', error);
      }
    });
  }

  sendComment() {
    if (this.newComment.trim() && this.currentStream) {
      this.streamingService.sendChatMessage(
        this.currentStream.streamId,
        this.newComment.trim()
      );
      this.newComment = '';
    }
  }

  addBuy() {
    return this.router.navigate(['buy-prod']);
  }

  addFriend() {
    return Swal.fire('solicitud de amistad enviada', '', 'success');
  }

  ngOnInit(): void {
    // Verificar si hay un stream activo guardado (después de refresh)
    const savedStreamId = localStorage.getItem('activeStreamId');
    const savedRole = localStorage.getItem('activeStreamRole');

    if (savedStreamId && savedRole === 'streamer') {
      // Recuperar el stream del servidor
      this.liveService.getStreamInfo(savedStreamId).subscribe({
        next: async (response) => {
          if (response.success && response.stream && response.stream.status === 'live') {
            this.currentStream = response.stream;
            this.isStreaming = true;
            this.viewerCount = response.stream.viewerCount || 0;
            this.streamingStateService.startStreaming(savedStreamId);
            this.streamingStateService.updateViewerCount(this.viewerCount);

            // Reconectar Socket.IO y WebRTC
            try {
              this.streamingService.connectSocket();
              this.setupSocketListeners();

              const userId = localStorage.getItem('userId') || 'streamer';
              const username = localStorage.getItem('username') || 'Streamer';
              const role = localStorage.getItem('role') || 'professional';

              this.streamingService.joinStreamRoom(
                savedStreamId,
                userId,
                username,
                role
              );

              // Reiniciar broadcasting
              await this.streamingService.initWebRTC();
              await this.streamingService.startBroadcasting(
                savedStreamId,
                this.videoPlayer.nativeElement
              );
              await this.streamingService.createOffer(savedStreamId);

              console.log('Stream recuperado exitosamente después de refresh');
            } catch (error) {
              console.error('Error al reconectar stream:', error);
              this.cleanupStream();
              Swal.fire('Error', 'No se pudo reconectar al stream', 'error');
            }
          } else {
            // El stream ya no está activo
            localStorage.removeItem('activeStreamId');
            localStorage.removeItem('activeStreamRole');
          }
        },
        error: (error) => {
          console.error('Error al recuperar stream:', error);
          localStorage.removeItem('activeStreamId');
          localStorage.removeItem('activeStreamRole');
        }
      });
    }

    // Método legacy para HLS (mantener por compatibilidad)
    // Se puede comentar si solo se usa WebRTC
    /*
    this.liveService.getStreamUrl().subscribe({
      next: (response) => {
        this.streamUrl = response.streamingUrl;
        this.trustedStreamingUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.streamUrl);
        if (this.hls && this.videoPlayer) {
          this.hls.loadSource(this.streamUrl);
        }
      },
      error: (err) => console.error('Error al obtener la URL de streaming:', err)
    });
    */
  }

  ngAfterViewInit(): void {
    // Solo inicializar HLS si no se usa WebRTC
    // this.initPlayer();

    // Cargar dispositivos disponibles
    this.loadMediaDevices();

    // Cargar configuración guardada
    this.loadSavedSettings();

    // Escuchar eventos de cambio de dispositivos desde el botón flotante
    window.addEventListener('videoDeviceChanged', (event: any) => {
      this.selectedVideoDevice = event.detail.deviceId;
      if (this.isStreaming) {
        this.changeVideoDevice();
      }
    });

    window.addEventListener('audioDeviceChanged', (event: any) => {
      this.selectedAudioDevice = event.detail.deviceId;
      if (this.isStreaming) {
        this.changeAudioDevice();
      }
    });

    window.addEventListener('videoQualityChanged', (event: any) => {
      this.selectedVideoQuality = event.detail.quality;
      if (this.isStreaming) {
        this.changeVideoQuality();
      }
    });

    // Escuchar evento para detener transmisión desde el botón flotante
    window.addEventListener('stopStreaming', () => {
      if (this.isStreaming) {
        this.stopStreaming();
      }
    });
  }

  ngOnDestroy(): void {
    // Limpiar recursos al destruir el componente
    if (this.isStreaming) {
      this.cleanupStream();
    }
  }

  // ============================================
  // MÉTODOS DE CONFIGURACIÓN DE DISPOSITIVOS
  // ============================================

  toggleSettingsMenu(event: Event): void {
    event.stopPropagation();
    this.showSettingsMenu = !this.showSettingsMenu;
  }

  closeSettingsMenu(): void {
    this.showSettingsMenu = false;
  }

  async loadMediaDevices(): Promise<void> {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();

      this.videoDevices = devices.filter(device => device.kind === 'videoinput');
      this.audioDevices = devices.filter(device => device.kind === 'audioinput');

      // Si no hay dispositivos seleccionados, usar los primeros disponibles
      if (!this.selectedVideoDevice && this.videoDevices.length > 0) {
        this.selectedVideoDevice = this.videoDevices[0].deviceId;
      }

      if (!this.selectedAudioDevice && this.audioDevices.length > 0) {
        this.selectedAudioDevice = this.audioDevices[0].deviceId;
      }

      console.log('Dispositivos cargados:', {
        video: this.videoDevices.length,
        audio: this.audioDevices.length
      });
    } catch (error) {
      console.error('Error al cargar dispositivos:', error);
      Swal.fire('Error', 'No se pudieron cargar los dispositivos disponibles', 'error');
    }
  }

  loadSavedSettings(): void {
    const savedVideoDevice = localStorage.getItem('preferredVideoDevice');
    const savedAudioDevice = localStorage.getItem('preferredAudioDevice');
    const savedQuality = localStorage.getItem('preferredVideoQuality');

    if (savedVideoDevice) {
      this.selectedVideoDevice = savedVideoDevice;
    }

    if (savedAudioDevice) {
      this.selectedAudioDevice = savedAudioDevice;
    }

    if (savedQuality) {
      this.selectedVideoQuality = savedQuality;
    }
  }

  async changeVideoDevice(): Promise<void> {
    if (!this.isStreaming) {
      localStorage.setItem('preferredVideoDevice', this.selectedVideoDevice);
      return;
    }

    try {
      // Guardar preferencia
      localStorage.setItem('preferredVideoDevice', this.selectedVideoDevice);

      // Reiniciar stream con nuevo dispositivo
      await this.restartStreamWithNewDevices();

      Swal.fire({
        icon: 'success',
        title: 'Cámara cambiada',
        text: 'La cámara se ha actualizado correctamente',
        timer: 2000,
        showConfirmButton: false
      });
    } catch (error) {
      console.error('Error al cambiar cámara:', error);
      Swal.fire('Error', 'No se pudo cambiar la cámara', 'error');
    }
  }

  async changeAudioDevice(): Promise<void> {
    if (!this.isStreaming) {
      localStorage.setItem('preferredAudioDevice', this.selectedAudioDevice);
      return;
    }

    try {
      // Guardar preferencia
      localStorage.setItem('preferredAudioDevice', this.selectedAudioDevice);

      // Reiniciar stream con nuevo dispositivo
      await this.restartStreamWithNewDevices();

      Swal.fire({
        icon: 'success',
        title: 'Micrófono cambiado',
        text: 'El micrófono se ha actualizado correctamente',
        timer: 2000,
        showConfirmButton: false
      });
    } catch (error) {
      console.error('Error al cambiar micrófono:', error);
      Swal.fire('Error', 'No se pudo cambiar el micrófono', 'error');
    }
  }

  async changeVideoQuality(): Promise<void> {
    if (!this.isStreaming) {
      localStorage.setItem('preferredVideoQuality', this.selectedVideoQuality);
      return;
    }

    try {
      // Guardar preferencia
      localStorage.setItem('preferredVideoQuality', this.selectedVideoQuality);

      // Reiniciar stream con nueva calidad
      await this.restartStreamWithNewDevices();

      Swal.fire({
        icon: 'success',
        title: 'Calidad actualizada',
        text: `Video configurado a ${this.selectedVideoQuality}`,
        timer: 2000,
        showConfirmButton: false
      });
    } catch (error) {
      console.error('Error al cambiar calidad:', error);
      Swal.fire('Error', 'No se pudo cambiar la calidad de video', 'error');
    }
  }

  private async restartStreamWithNewDevices(): Promise<void> {
    if (!this.currentStream) return;

    try {
      // Detener el stream actual
      this.streamingService.stopBroadcasting();

      // Obtener constraints actualizados
      const constraints = this.getMediaConstraints();

      // Reiniciar broadcasting con nuevos dispositivos
      await this.streamingService.startBroadcasting(
        this.currentStream.streamId,
        this.videoPlayer.nativeElement,
        constraints
      );

      // Recrear offer con nuevos tracks
      await this.streamingService.createOffer(this.currentStream.streamId);

      console.log('Stream reiniciado con nuevos dispositivos');
    } catch (error) {
      console.error('Error al reiniciar stream:', error);
      throw error;
    }
  }

  getMediaConstraints(): MediaStreamConstraints {
    const quality = this.videoQualityConstraints[this.selectedVideoQuality];

    return {
      video: {
        deviceId: this.selectedVideoDevice ? { exact: this.selectedVideoDevice } : undefined,
        width: { ideal: quality.width },
        height: { ideal: quality.height },
        frameRate: { ideal: quality.frameRate }
      },
      audio: {
        deviceId: this.selectedAudioDevice ? { exact: this.selectedAudioDevice } : undefined,
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true
      }
    };
  }

  private initPlayer() {
    const video: HTMLVideoElement = this.videoPlayer.nativeElement;
    if (Hls.isSupported()) {
      this.hls = new Hls();
      if (this.streamUrl) {
        this.hls.loadSource(this.streamUrl);
      }
      this.hls.attachMedia(video);
      this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(err => console.error('Error al reproducir el video:', err));
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = this.streamUrl;
      video.addEventListener('loadedmetadata', () => {
        video.play().catch(err => console.error('Error al reproducir el video:', err));
      });
    } else {
      console.error('El navegador no soporta HLS.');
    }
  }

  /**
   * Navegar al perfil del streamer (usuario actual que está transmitiendo)
   */
  goToProfile(): void {
    // Obtener el ID del usuario actual desde localStorage
    const userId = localStorage.getItem('userId') || 
                   localStorage.getItem('user_id') ||
                   '';

    if (!userId) {
      // Si no hay ID de usuario (usuario estático), navegar a preview-profile sin parámetros
      this.router.navigate(['/preview-profile']);
      return;
    }

    // Navegar a preview-profile con el ID del usuario
    this.router.navigate(['/preview-profile'], {
      queryParams: {
        id: userId,
        type: 'user' // Tipo por defecto
      }
    });
  }
}
