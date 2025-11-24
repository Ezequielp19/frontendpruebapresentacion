import { Component, OnInit, Renderer2 } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatDialog } from '@angular/material/dialog';
import { TranslationService } from 'src/app/services/translation.service';
import { TranslateService } from '@ngx-translate/core';






@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  isEmpresasDropdownOpen = false;

  categories = [
    {
      name: 'Electronics',
      subcategories: ['Mobile Phones', 'Laptops', 'Cameras']
    },
    {
      name: 'Home Appliances',
      subcategories: ['Refrigerators', 'Microwaves', 'Washing Machines']
    },
    {
      name: 'Books',
      subcategories: ['Fiction', 'Non-fiction', 'Comics']
    },
    // {
    //   name: 'Envios',
    //   subcategories: ['Fiction', 'Non-fiction', 'Comics']
    // },

  ];

  selectedLang = 'es'

  //arrayLang = ['Español', 'Ingles','Spanish', 'English']
  constructor(
    public dialog: MatDialog,
    public translate: TranslateService,
    private renderer: Renderer2
  ) {
    // //translate.addLangs([]);
    // //translate.setDefaultLang('en');
    // this.translate.setDefaultLang(this.selectedLang);
    // this.translate.use(this.selectedLang)

    translate.setDefaultLang(this.selectedLang);
    translate.use(this.selectedLang) // Establece el idioma por defecto

    // Cambia el idioma basado en la preferencia del usuario
    const browserLang = translate.getBrowserLang();
    if (browserLang) {
      translate.use(browserLang.match(/en|es/) ? browserLang : 'es');
    }


  }

  changeLanguage(language: string) {
    this.translate.use(language)
  }

  onLanguageChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement; // Asegúrate de que sea un `HTMLSelectElement`
    const lang = selectElement.value; // Accede a `value` de forma segura
    this.translate.use(lang);
  }

  toggleMode(){

  }

  toggleEmpresasDropdown() {
    this.isEmpresasDropdownOpen = !this.isEmpresasDropdownOpen;

    // Forzar posicionamiento en móviles si está abierto
    if (this.isEmpresasDropdownOpen) {
      setTimeout(() => {
        this.forceMobilePosition();
      }, 50);
    }
  }



  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  // Añadir método para manejar el touch/hover
  onItemInteraction(event: Event) {
    const element = event.target as HTMLElement;

    if (element.classList.contains('empresas-dropdown-item')) {
      // Mantener todos los submenús ocultos - solo mostrar opciones principales
      this.closeAllSubmenus();

      this.renderer.addClass(element, 'visited');

      // Cambiar color de texto temporalmente
      this.renderer.setStyle(element, 'color', '#236bd8');

      // Restaurar color después de un momento
      setTimeout(() => {
        this.renderer.setStyle(element, 'color', '#333');
      }, 200);
    }
  }

  // Método para cerrar otros submenús
  private closeOtherSubmenus(currentElement: HTMLElement) {
    const allSubmenus = document.querySelectorAll('.dropdown-submenu');
    allSubmenus.forEach(submenu => {
      if (submenu !== currentElement.nextElementSibling) {
        this.renderer.setStyle(submenu, 'display', 'none');
      }
    });
  }

  ngOnInit(): void {
    // Añadir listeners para eventos touch y mouse
    const dropdownItems = document.querySelectorAll('.empresas-dropdown-item');
    dropdownItems.forEach(item => {
      this.renderer.listen(item, 'touchstart', (event) => this.onItemInteraction(event));
      this.renderer.listen(item, 'mouseenter', (event) => this.onItemInteraction(event));
    });

    // Cerrar submenús cuando se hace clic fuera del dropdown
    this.renderer.listen('document', 'click', (event) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.empresas-dropdown-menu')) {
        this.closeAllSubmenus();
      }
    });

    // Cerrar dropdown EMPRESAS cuando se hace clic fuera de él
    this.renderer.listen('document', 'click', (event) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.empresas-dropdown-container')) {
        this.isEmpresasDropdownOpen = false;
      }
    });

    // Escuchar cambios de orientación
    this.renderer.listen('window', 'orientationchange', () => {
      // Cerrar dropdown al cambiar orientación
      this.isEmpresasDropdownOpen = false;

      // Re-inicializar después de un breve delay
      setTimeout(() => {
        const dropdownItems = document.querySelectorAll('.empresas-dropdown-item');
      }, 500);
    });
  }

  // Método para cerrar todos los submenús
  private closeAllSubmenus() {
    const allSubmenus = document.querySelectorAll('.empresas-dropdown-submenu');
    allSubmenus.forEach(submenu => {
      this.renderer.setStyle(submenu, 'display', 'none');
    });
  }

  // Método para forzar posicionamiento en móviles
  private forceMobilePosition() {
    const dropdownMenu = document.querySelector('.empresas-dropdown-menu') as HTMLElement;
    if (dropdownMenu && this.isEmpresasDropdownOpen) {
      // Verificar si estamos en móvil
      const isMobile = window.innerWidth <= 768;
      const isLandscape = window.innerWidth > window.innerHeight;

      if (isMobile) {
        if (isLandscape) {
          // Landscape móvil
          this.renderer.setStyle(dropdownMenu, 'position', 'absolute');
          this.renderer.setStyle(dropdownMenu, 'top', '100%');
          this.renderer.setStyle(dropdownMenu, 'left', '0');
          this.renderer.setStyle(dropdownMenu, 'transform', 'none');
          this.renderer.setStyle(dropdownMenu, 'max-width', '250px');
        } else {
          // Portrait móvil
          this.renderer.setStyle(dropdownMenu, 'position', 'absolute');
          this.renderer.setStyle(dropdownMenu, 'top', '100%');
          this.renderer.setStyle(dropdownMenu, 'left', '0');
          this.renderer.setStyle(dropdownMenu, 'transform', 'none');
          this.renderer.setStyle(dropdownMenu, 'max-width', '300px');
        }
      }
    }
  }



}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog-content-example-dialog.html',
})
export class DialogContentExampleDialog {}


