import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AutonomousService } from './../../../services/autonomous.service';
import { SellersCategoryRankedService } from 'src/app/services/sellers-category-ranked.service';
import { Autonomous } from 'src/app/services/autonomous.service';
import { Dedicated } from 'src/app/services/dedicated.service';
import { Professional } from 'src/app/services/profesional.service';
import { DedicatedService } from 'src/app/services/dedicated.service';
import { ProfessionalService } from 'src/app/services/profesional.service';
import { RankingService } from 'src/app/services/ranking.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-section-feactured-sellers',
  templateUrl: './section-feactured-sellers.component.html',
  styleUrls: ['./section-feactured-sellers.component.scss'],
})
export class SectionFeacturedSellersComponent implements OnInit, OnDestroy {
  categories = ['Tecnologia', 'Electronica', 'Deportes', 'Social'];
  sellersAvailable: (Autonomous | Dedicated | Professional)[] = [];
  selectedCategory: string | null = null;
  rankings: any[] = [];
  private subscriptions = new Subscription();

  constructor(
    private autonomousService: AutonomousService,
    private dedicatedService: DedicatedService,
    private profesionalService: ProfessionalService,
    private rankingService: RankingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadSellers();
    this.loadRankings(); // Cargar los rankings al inicializar el componente
  }

  selectCategory(cat: string): void {
    this.selectedCategory = cat;
    this.sellersAvailable = [];
    this.loadSellers();
  }

  loadSellers(): void {
    this.loadAutonomousSellers();
    this.loadDedicatedSellers();
    this.loadProfesionalSellers();
  }

  loadAutonomousSellers(): void {
    this.subscriptions.add(
      this.autonomousService.getAllAutonomous().subscribe((response) => {
        // Manejar tanto {products: []} como array directo
        const data = response.products || (Array.isArray(response) ? response : []);
        if (!Array.isArray(data)) {
          console.error("Error: data no es un array", data);
          return;
        }

        this.sellersAvailable = this.sellersAvailable.concat(data.filter(seller => {
          return seller && typeof seller.description === 'string' &&
                 (!this.selectedCategory || seller.description.includes(this.selectedCategory));
        }).map(seller => ({ ...seller, category: 'Autonomous' })));
      }, (error: any) => {
        console.error("Error al obtener los vendedores autónomos:", error);
      })
    );
  }

  loadDedicatedSellers(): void {
    this.subscriptions.add(
      this.dedicatedService.getAllDedicated().subscribe((response) => {
        // Manejar tanto {products: []} como array directo
        const data = response.products || (Array.isArray(response) ? response : []);
        if (!Array.isArray(data)) {
          console.error("Error: data no es un array", data);
          return;
        }

        this.sellersAvailable = this.sellersAvailable.concat(data.filter(seller => {
          return seller && typeof seller.description === 'string' &&
                 (!this.selectedCategory || seller.description.includes(this.selectedCategory));
        }).map(seller => ({ ...seller, category: 'Dedicated' })));
      }, error => {
        console.error("Error al obtener los vendedores dedicados:", error);
      })
    );
  }

  loadProfesionalSellers(): void {
    this.subscriptions.add(
      this.profesionalService.getAllProfessionals().subscribe((response) => {
        // Manejar tanto {professionals: []} como array directo
        const data = response.professionals || (Array.isArray(response) ? response : []);
        if (!Array.isArray(data)) {
          console.error("Error: data no es un array", data);
          return;
        }

        this.sellersAvailable = this.sellersAvailable.concat(data.filter(seller => {
          return seller && typeof seller.description === 'string' &&
                 (!this.selectedCategory || seller.description.includes(this.selectedCategory));
        }).map(seller => ({ ...seller, category: 'Profesional' })));
      }, error => {
        console.error("Error al obtener los vendedores profesionales:", error);
      })
    );
  }

  loadRankings(): void {
    this.subscriptions.add(
      this.rankingService.getRankings().subscribe((data) => {
        this.rankings = data;
      }, error => {
        console.error("Error al obtener los rankings:", error);
      })
    );
  }

  // Navegar al perfil del vendedor
  viewSellerProfile(seller: Autonomous | Dedicated | Professional): void {
    const sellerId = (seller as any)._id || (seller as any).id;
    let sellerType = 'user';

    // Determinar tipo de vendedor
    if ((seller as any).category === 'Autonomous') {
      sellerType = 'autonomous';
    } else if ((seller as any).category === 'Dedicated') {
      sellerType = 'dedicated';
    } else if ((seller as any).category === 'Profesional') {
      sellerType = 'professional';
    }

    if (!sellerId) {
      console.warn('No se encontró ID para el vendedor:', seller);
      return;
    }

    console.log('Navegando al perfil del vendedor destacado:', {
      id: sellerId,
      type: sellerType,
      name: seller.name
    });

    // Navegar a la página de perfil
    this.router.navigate(['/preview-profile'], {
      queryParams: {
        id: sellerId,
        type: sellerType
      }
    });
  }

  // Navegar al perfil desde Top Rankings
  viewRankingProfile(ranking: any): void {
    if (!ranking.id || !ranking.type) {
      console.warn('Ranking sin ID o tipo:', ranking);
      console.log('Intentando navegar con datos disponibles...');
    }

    const rankingId = ranking.id || ranking._id;
    const rankingType = ranking.type || 'professional';

    if (!rankingId) {
      console.error('No se puede navegar: falta ID del ranking', ranking);
      alert('No se puede ver el perfil: datos incompletos');
      return;
    }

    console.log('Navegando al perfil desde Top Rankings:', {
      id: rankingId,
      type: rankingType,
      name: ranking.name
    });

    this.router.navigate(['/preview-profile'], {
      queryParams: {
        id: rankingId,
        type: rankingType
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
