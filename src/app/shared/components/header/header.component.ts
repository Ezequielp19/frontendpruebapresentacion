import { Component, OnInit, Input, ViewChild, HostBinding, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { HeaderLoginComponent } from '../header-login/header-login.component';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../../modal/modal.component';
import Swal from 'sweetalert2';
import { Subject, Subscription } from 'rxjs';
import { Overlay } from '@angular/cdk/overlay';
import { ThemeService } from 'src/app/services/theme.service';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from 'src/app/services/translation.service';
import { AuthService } from 'src/app/services/auth.service';
//import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  switchTheme = new FormControl(false)
  isLoggedIn: boolean = false;
  private authSubscription: Subscription = new Subscription();
  isMasDropdownOpen: boolean = false;

  // Propiedades para el menú hamburguesa
  isMobileMenuOpen: boolean = false;
  isMobileEmpresasOpen: boolean = false;
  isMobileCategoriasOpen: boolean = false;

  /*@ViewChild(HeaderLoginComponent) modal!: HeaderLoginComponent;
  private modalComponent!: HeaderLoginComponent;

  openMyModal(){
    return this.modalService.open(this.modalComponent);
    this.modal.openModal();
  }*/

  title = 'Buscar tus productos...';
  animatedTitle = '';
  searchTerm$ = new Subject<string>();

  onKeyUp(event: KeyboardEvent): void {
    const target = event.target as HTMLInputElement;
    this.searchTerm$.next(target.value);

    const value = target.value;
    if (value) {
      this.listFiltered = this.listDeliciousDishes.filter((item) =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      this.selectedIndex = 0;
    } else {
      this.listFiltered = [];
    }
  }

  selectSuggestion(suggestion: string) {
    // Aquí puedes implementar la lógica para seleccionar la sugerencia
    console.log('Sugerencia seleccionada:', suggestion);
    this.listFiltered = [];
    // Puedes navegar a una página de búsqueda o actualizar el input
  }

  private listDeliciousDishes: string[] = [
    'Samsung',
    'televisores',
    'empresas',
    'motorola',
    'zapatillas',
    'computadoras',
    'herramientas',
    'juegos',
    'notebooks',
    'notebook hp',
    'celular viejo',
    'iphone',
    'huawei',
    'depto buenos aires',
    'notebooks',
    'notebook gaming',
    'parlantes',
    'joystick',
    'herramientas',
    'juegos',
    'notebooks',
    'notebook hp',
  ];
  listFiltered: string[] = [];
  selectedIndex: number = 0;


  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  private passwordPattern: any = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;
  //private passwordPattern:any = /^(?=(?:.*[A-Z]){2})(?=(?:.*[a-z]){2})(?=(?:.*[0-9]){2})\S{8,16}$/;

  formRegister!: FormGroup;
  submitted = false;



  createForm() {
    this.formRegister = this.fb.group({
      nombre: ["", [Validators.required, Validators.minLength(5)]],
      apellido: ["", [Validators.required, Validators.minLength(4)]],
      email: ["", [Validators.required, Validators.email, Validators.pattern(this.emailPattern)]],
      contraseña: ["", [Validators.required, Validators.minLength(8), Validators.maxLength(15), Validators.pattern(this.passwordPattern)]],
      confirmarContraseña: ["", [Validators.required, Validators.minLength(8), Validators.maxLength(15), Validators.pattern(this.passwordPattern)]]
    });
  }

  constructor(
    public translationService: TranslationService,
    private fb: FormBuilder,
    private route: Router,
    private modal: NgbModal,
    private themeService: ThemeService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {
    this.createForm();
  }

  changeLanguage(language: string): void {
    this.translationService.use(language);
  }

  onLanguageChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const lang = selectElement.value;
    this.translationService.use(lang);
  }




  submitRegister() {
    this.submitted = true;
    this.route.navigate(['confirm-verification']);
    this.formRegister.reset();

  }

  /*onClick() {
    this.modal.open(ModalComponent);
  }*/

  sendProfile() {
    Swal.fire(
      'The Internet?', //msg principal
      'That thing is still around?', //msg secundario
      'error' //icono
    )
    //this.route.navigate(['profile'])
  }

  get f() {
    return this.formRegister.controls
  }

  get apellido() {
    return this.formRegister.get('apellido')
  }



    ngOnInit(): void {
    this.filterList();

    // Suscribirse a los cambios del estado de autenticación
    this.authSubscription = this.authService.isAuthenticated$.subscribe(
      (isAuthenticated) => {
        this.isLoggedIn = isAuthenticated;
        console.log('Estado de autenticación actualizado:', isAuthenticated);
      }
    );

    // Verificar estado inicial
    this.isLoggedIn = this.authService.isLoggedIn();

    // Configurar el cierre del dropdown al hacer clic fuera
    this.setupDropdownClose();

    // Iniciar animación de escritura
    this.startTypingAnimation();

    // Forzar inicialización del dropdown en todos los viewports
    this.initializeDropdown();

    // Escuchar cambios de tamaño de ventana para reinicializar
    window.addEventListener('resize', this.onResize);

    // Escuchar scroll para reposicionar el dropdown
    window.addEventListener('scroll', this.onScroll);

    // Escuchar cambios de orientación
    window.addEventListener('orientationchange', this.onOrientationChange);
  }

  // Método para inicializar el dropdown en todos los viewports
  private initializeDropdown(): void {
    // Verificar inmediatamente
    this.checkDropdownAvailability();

    // Verificar después de que Angular termine de renderizar
    setTimeout(() => {
      this.checkDropdownAvailability();
    }, 500);
  }

  private checkDropdownAvailability(): void {
    const dropdown = document.querySelector('.mas-dropdown-menu') as HTMLElement;
    const button = document.querySelector('#dropdownMenuButton1') as HTMLElement;

    console.log('=== Dropdown Availability Check ===');
    console.log('Dropdown available:', !!dropdown);
    console.log('Button available:', !!button);
    console.log('Initial dropdown state:', this.isMasDropdownOpen);

    if (dropdown && button) {
      console.log('Dropdown element found:', dropdown);
      console.log('Button element found:', button);

      // Forzar la detección de cambios
      this.cdr.detectChanges();
    } else {
      console.log('Dropdown or button not found, retrying...');
    }
  }

  private startTypingAnimation(): void {
    let index = 0;
    const fullText = this.title;

    const typeWriter = () => {
      if (index < fullText.length) {
        this.animatedTitle += fullText.charAt(index);
        index++;
        setTimeout(typeWriter, 100); // Velocidad de escritura
      } else {
        // Reiniciar la animación después de 3 segundos
        setTimeout(() => {
          this.animatedTitle = '';
          index = 0;
          this.startTypingAnimation();
        }, 3000);
      }
    };

    typeWriter();
  }

  ngOnDestroy(): void {
    // Limpiar la suscripción al destruir el componente
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }

    // Limpiar listeners de eventos
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('orientationchange', this.onOrientationChange);
  }

  // Método para cerrar sesión
  logout(): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Deseas cerrar sesión?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.logout();
        Swal.fire(
          '¡Sesión cerrada!',
          'Has cerrado sesión exitosamente.',
          'success'
        );
      }
    });
  }



  filterList(): void {
    this.searchTerm$.subscribe(term => {
      if(term !== ''){
        this.listFiltered = this.listDeliciousDishes
        .filter(item => item.toLowerCase().indexOf(term.toLowerCase()) >= 0);
      }else{
        this.listFiltered = []
      }


    });


  }

  toggleSwitch(){
    this.themeService.toggleTheme();
  }

            // Método para abrir/cerrar el dropdown "más"
  toggleMasDropdown(): void {
    console.log('=== Toggle Dropdown Called ===');
    console.log('Toggle dropdown clicked, current state:', this.isMasDropdownOpen);

    // Cambiar el estado
    this.isMasDropdownOpen = !this.isMasDropdownOpen;
    console.log('New state:', this.isMasDropdownOpen);

    // Forzar la detección de cambios inmediatamente
    this.cdr.detectChanges();
    console.log('Change detection triggered');

    // Manejar el estado del dropdown
    const dropdown = document.querySelector('.mas-dropdown-menu') as HTMLElement;
    if (dropdown) {
      if (this.isMasDropdownOpen) {
        // Si se está abriendo, posicionar el dropdown
        setTimeout(() => {
          this.positionDropdown();
        }, 50);
      } else {
        // Si se está cerrando, ocultar el dropdown inmediatamente
        dropdown.style.display = 'none';
        dropdown.style.opacity = '0';
        dropdown.style.visibility = 'hidden';
        dropdown.classList.remove('show');
        console.log('Dropdown closed by button click');
      }
    }
  }

    private positionDropdown(): void {
    const dropdown = document.querySelector('.mas-dropdown-menu') as HTMLElement;
    const button = document.querySelector('#dropdownMenuButton1') as HTMLElement;

    if (dropdown && button) {
      console.log('Positioning dropdown...');

      // Obtener la posición del botón
      const buttonRect = button.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

      console.log('Button position:', buttonRect);
      console.log('Scroll position:', { scrollTop, scrollLeft });

      // Calcular posición absoluta considerando el scroll
      const absoluteTop = buttonRect.top + scrollTop;
      const absoluteLeft = buttonRect.left + scrollLeft;

      // Detectar si estamos en móvil (incluyendo landscape)
      const isMobile = window.innerWidth <= 768 || window.innerHeight <= 768;
      const isLandscape = window.innerWidth > window.innerHeight;
      console.log('Is mobile:', isMobile);
      console.log('Is landscape:', isLandscape);

      // Posicionar el dropdown
      dropdown.style.position = 'absolute';
      dropdown.style.display = 'block';
      dropdown.style.opacity = '1';
      dropdown.style.visibility = 'visible';
      dropdown.style.zIndex = '999999';

      if (isMobile) {
        // En móvil, siempre mostrar debajo del botón con alineación precisa
        const buttonWidth = buttonRect.width;

        // Obtener el ancho real del dropdown después de mostrarlo
        dropdown.style.display = 'block';
        dropdown.style.visibility = 'hidden'; // Oculto temporalmente para medir
        const dropdownWidth = dropdown.offsetWidth;
        dropdown.style.visibility = 'visible';

        // Calcular la posición para centrar el dropdown debajo del botón
        let leftPosition = absoluteLeft;

        // Si el dropdown es más ancho que el botón, centrarlo
        if (dropdownWidth > buttonWidth) {
          leftPosition = absoluteLeft - (dropdownWidth - buttonWidth) / 2;
        }

        // Asegurar que no se salga por la izquierda
        if (leftPosition < 0) {
          leftPosition = 0;
        }

        dropdown.style.top = (absoluteTop + buttonRect.height + 5) + 'px';
        dropdown.style.left = leftPosition + 'px';
        console.log('Mobile positioning - below button, centered', {
          buttonWidth,
          dropdownWidth,
          buttonLeft: absoluteLeft,
          dropdownLeft: leftPosition
        });

        // Verificar si el dropdown se sale del viewport por abajo en móvil
        setTimeout(() => {
          const dropdownRect = dropdown.getBoundingClientRect();
          const viewportHeight = window.innerHeight;
          const viewportWidth = window.innerWidth;

          console.log('Mobile dropdown check:', {
            dropdownBottom: dropdownRect.bottom,
            viewportHeight: viewportHeight,
            isLandscape: isLandscape,
            buttonLeft: absoluteLeft,
            dropdownLeft: leftPosition
          });

          // En móvil landscape, forzar que aparezca debajo del botón
          if (isLandscape) {
            // En landscape, siempre mostrar debajo del botón sin importar el viewport
            dropdown.style.top = (absoluteTop + buttonRect.height + 5) + 'px';
            dropdown.style.left = leftPosition + 'px';
            dropdown.style.position = 'absolute';
            dropdown.style.zIndex = '999999';
            console.log('Mobile landscape: Forced below button positioning');
          } else if (dropdownRect.bottom > viewportHeight) {
            // Si se sale por abajo en portrait, mostrar arriba del botón
            dropdown.style.top = (absoluteTop - dropdownRect.height - 5) + 'px';
            console.log('Mobile portrait: Adjusted top position - showing above button');
          }
        }, 10);
      } else {
        // En desktop, usar la lógica original con alineación mejorada
        const buttonWidth = buttonRect.width;

        // Obtener el ancho real del dropdown después de mostrarlo
        dropdown.style.display = 'block';
        dropdown.style.visibility = 'hidden'; // Oculto temporalmente para medir
        const dropdownWidth = dropdown.offsetWidth;
        dropdown.style.visibility = 'visible';

        // Calcular la posición para centrar el dropdown debajo del botón
        let leftPosition = absoluteLeft;

        // Si el dropdown es más ancho que el botón, centrarlo
        if (dropdownWidth > buttonWidth) {
          leftPosition = absoluteLeft - (dropdownWidth - buttonWidth) / 2;
        }

        dropdown.style.top = (absoluteTop + buttonRect.height + 5) + 'px';
        dropdown.style.left = leftPosition + 'px';

        // Verificar si el dropdown está dentro del viewport
        const dropdownRect = dropdown.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        console.log('Dropdown dimensions:', dropdownRect);
        console.log('Viewport dimensions:', { width: viewportWidth, height: viewportHeight });

        // Si el dropdown se sale del viewport por la derecha, ajustar
        if (dropdownRect.right > viewportWidth) {
          const overflow = dropdownRect.right - viewportWidth;
          dropdown.style.left = (leftPosition - overflow - 10) + 'px';
          console.log('Adjusted left position due to right overflow');
        }

        // Si el dropdown se sale del viewport por abajo, mostrar arriba del botón
        if (dropdownRect.bottom > viewportHeight) {
          dropdown.style.top = (absoluteTop - dropdownRect.height - 5) + 'px';
          console.log('Adjusted top position - showing above button');
        }
      }

      console.log('Dropdown positioned at:', {
        top: dropdown.style.top,
        left: dropdown.style.left
      });

    } else {
      console.log('Dropdown or button element not found!');
    }
  }

  private verifyDropdownState(): void {
    const dropdown = document.querySelector('.mas-dropdown-menu') as HTMLElement;
    console.log('=== Verifying Dropdown State ===');
    console.log('Dropdown element:', dropdown);
    console.log('Dropdown classes:', dropdown?.className);
    console.log('Dropdown display:', dropdown?.style?.display);

    if (dropdown) {
      const isVisible = dropdown.classList.contains('show');
      console.log('Dropdown is visible:', isVisible);

      // Si debería estar visible pero no lo está, forzar la visibilidad
      if (!isVisible && this.isMasDropdownOpen) {
        console.log('Forcing dropdown visibility...');
        dropdown.classList.add('show');
        dropdown.style.display = 'block';
        dropdown.style.opacity = '1';
        dropdown.style.visibility = 'visible';
        dropdown.style.zIndex = '999999';
        console.log('Forced dropdown visibility');

        // Forzar detección de cambios nuevamente
        this.cdr.detectChanges();
      }

      // Verificar dimensiones y posición
      this.checkDropdownPosition(dropdown);
    } else {
      console.log('Dropdown element not found!');
    }
  }

  private checkDropdownPosition(dropdown: HTMLElement): void {
    const rect = dropdown.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    console.log('Dropdown dimensions:', {
      width: rect.width,
      height: rect.height,
      top: rect.top,
      left: rect.left,
      bottom: rect.bottom,
      right: rect.right
    });
    console.log('Viewport dimensions:', {
      width: viewportWidth,
      height: viewportHeight
    });
    console.log('Dropdown computed styles:', {
      display: window.getComputedStyle(dropdown).display,
      visibility: window.getComputedStyle(dropdown).visibility,
      opacity: window.getComputedStyle(dropdown).opacity,
      position: window.getComputedStyle(dropdown).position,
      zIndex: window.getComputedStyle(dropdown).zIndex
    });

    // Verificar si está dentro del viewport
    const isInViewport = (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= viewportHeight &&
      rect.right <= viewportWidth
    );
    console.log('Dropdown is in viewport:', isInViewport);

    // Si no está en el viewport, forzar posición central
    if (!isInViewport && this.isMasDropdownOpen) {
      dropdown.style.position = 'fixed';
      dropdown.style.top = '50%';
      dropdown.style.left = '50%';
      dropdown.style.transform = 'translate(-50%, -50%)';
      dropdown.style.maxWidth = '90vw';
      dropdown.style.maxHeight = '80vh';
      console.log('Forced dropdown to center of viewport');
    }
  }

  // Configurar el cierre del dropdown al hacer clic fuera
  private setupDropdownClose(): void {
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      const dropdownButton = document.getElementById('dropdownMenuButton1');
      const dropdownMenu = document.querySelector('.mas-dropdown-menu');
      const dropdownContainer = document.querySelector('.mas-dropdown-container');

      // Si el clic no es en el botón del dropdown, el contenedor del dropdown, o el menú del dropdown, cerrar el dropdown
      if (dropdownContainer && !dropdownContainer.contains(target) &&
          dropdownMenu && !dropdownMenu.contains(target)) {
        this.isMasDropdownOpen = false;
        this.cdr.detectChanges();

        // Ocultar el dropdown inmediatamente
        if (dropdownMenu) {
          (dropdownMenu as HTMLElement).style.display = 'none';
          (dropdownMenu as HTMLElement).style.opacity = '0';
          (dropdownMenu as HTMLElement).style.visibility = 'hidden';
          (dropdownMenu as HTMLElement).classList.remove('show');
          console.log('Dropdown closed by outside click');
        }
      }
    });
  }

  // Método alternativo para abrir el dropdown
  openDropdown(): void {
    this.isMasDropdownOpen = true;
    this.cdr.detectChanges();
  }

  // Método alternativo para cerrar el dropdown
  closeDropdown(): void {
    this.isMasDropdownOpen = false;
    this.cdr.detectChanges();
  }

  // Métodos para los event listeners
  private onResize = () => {
    console.log('Window resized, reinitializing dropdown...');
    setTimeout(() => {
      this.initializeDropdown();
      // Si el dropdown está abierto, reposicionarlo
      if (this.isMasDropdownOpen) {
        this.positionDropdown();
      }
    }, 100);
  };

  private onScroll = () => {
    if (this.isMasDropdownOpen) {
      this.positionDropdown();
    }
  };

  private onOrientationChange = () => {
    console.log('Orientation changed, repositioning dropdown...');
    setTimeout(() => {
      if (this.isMasDropdownOpen) {
        this.positionDropdown();
        // Forzar reposicionamiento específico para landscape
        const isLandscape = window.innerWidth > window.innerHeight;
        if (isLandscape) {
          this.forceLandscapePosition();
        }
      }
    }, 100);
  };

  private forceLandscapePosition(): void {
    const dropdown = document.querySelector('.mas-dropdown-menu') as HTMLElement;
    const button = document.querySelector('#dropdownMenuButton1') as HTMLElement;

    if (dropdown && button) {
      const buttonRect = button.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

      const absoluteTop = buttonRect.top + scrollTop;
      const absoluteLeft = buttonRect.left + scrollLeft;

      // Forzar posicionamiento debajo del botón en landscape
      dropdown.style.position = 'absolute';
      dropdown.style.top = (absoluteTop + buttonRect.height + 5) + 'px';
      dropdown.style.left = absoluteLeft + 'px';
      dropdown.style.zIndex = '999999';
      dropdown.style.transform = 'none';
      dropdown.style.margin = '0';

      console.log('Forced landscape positioning applied');
    }
  }

  // ===== MÉTODOS PARA EL MENÚ HAMBURGUESA =====

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;

    // Prevenir scroll del body cuando el menú está abierto
    if (this.isMobileMenuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
    this.isMobileEmpresasOpen = false;
    this.isMobileCategoriasOpen = false;
    document.body.classList.remove('menu-open');
  }

  toggleMobileEmpresas(): void {
    this.isMobileEmpresasOpen = !this.isMobileEmpresasOpen;
  }

  toggleMobileCategorias(): void {
    this.isMobileCategoriasOpen = !this.isMobileCategoriasOpen;
  }
}
