import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AutonomousService, Autonomous } from 'src/app/services/autonomous.service';
import { DedicatedService, Dedicated } from 'src/app/services/dedicated.service';
import { ProfessionalService, Professional } from 'src/app/services/profesional.service';
import { Subscription, forkJoin } from 'rxjs';

@Component({
  selector: 'app-section-ranking-sellers',
  templateUrl: './section-ranking-sellers.component.html',
  styleUrls: ['./section-ranking-sellers.component.scss'],
})
export class SectionRankingSellersComponent implements OnInit, OnDestroy {
  selfemployedActive: boolean = false;
  dedicatedActive: boolean = false;
  professionalsActive: boolean = false;
  sellersRanked: (Autonomous | Dedicated | Professional)[] = [];
  allSellers: (Autonomous | Dedicated | Professional)[] = [];
  private subscriptions = new Subscription();

  constructor(
    private autonomousService: AutonomousService,
    private dedicatedService: DedicatedService,
    private professionalService: ProfessionalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadRanking();
  }

  loadRanking(): void {
    // Usar forkJoin para ejecutar llamadas en paralelo y evitar callback hell
    this.subscriptions.add(
      forkJoin({
        autonomous: this.autonomousService.getAutonomousRanking(),
        dedicated: this.dedicatedService.getDedicatedRanking(),
        professional: this.professionalService.getAllProfessionals()
      }).subscribe({
        next: ({ autonomous, dedicated, professional }) => {
          // Extraer los datos de las respuestas
          const autonomousArray = autonomous?.data || autonomous || [];
          const dedicatedArray = dedicated?.data || dedicated || [];
          const professionalArray = professional?.professionals || professional?.data || professional || [];

          this.allSellers = [...autonomousArray, ...dedicatedArray, ...professionalArray];
          console.log('Total vendedores cargados:', this.allSellers.length);
          this.filterSellers('Autonomos');
        },
        error: (error) => {
          console.error('Error al obtener el ranking:', error);
        }
      })
    );
  }

  filterSellers(type: string): void {
    this.selfemployedActive = type === 'Autonomos';
    this.dedicatedActive = type === 'Dedicados';
    this.professionalsActive = type === 'Profesionales';

    this.sellersRanked = this.allSellers.filter(seller => {
      if (type === 'Autonomos') {
        // Un autónomo tiene description que incluye "Autonomos" o tiene un campo específico
        return (seller as Autonomous).description?.includes('Autonomos') || false;
      } else if (type === 'Dedicados') {
        // Un dedicado tiene description que incluye "Dedicados"
        return (seller as Dedicated).description?.includes('Dedicados') || false;
      } else if (type === 'Profesionales') {
        // Un profesional simplemente tiene el campo profession definido
        return !!(seller as Professional).profession;
      }
      return false;
    });

    console.log(`Filtrados ${this.sellersRanked.length} vendedores de tipo: ${type}`);
  }

  // Determinar el tipo de vendedor
  getSellerType(seller: Autonomous | Dedicated | Professional): string {
    if ((seller as Autonomous).description?.includes('Autonomos')) {
      return 'autonomous';
    } else if ((seller as Dedicated).description?.includes('Dedicados')) {
      return 'dedicated';
    } else if ((seller as Professional).profession) {
      return 'professional';
    }
    return 'user';
  }

  // Navegar al perfil del vendedor
  viewProfile(seller: Autonomous | Dedicated | Professional): void {
    const sellerId = (seller as any)._id || (seller as any).id;
    const sellerType = this.getSellerType(seller);

    if (!sellerId) {
      console.warn('No se encontró ID para el vendedor:', seller);
      return;
    }

    console.log('Navegando al perfil:', { id: sellerId, type: sellerType, name: seller.name });

    // Navegar a la página de perfil con el ID y tipo
    this.router.navigate(['/preview-profile'], {
      queryParams: {
        id: sellerId,
        type: sellerType
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
