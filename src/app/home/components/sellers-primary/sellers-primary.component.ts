import { Component, OnInit } from '@angular/core';
import { Professional, ProfessionalService } from 'src/app/services/profesional.service';

interface WorkerDisplay {
  name: string;
  text: string;
  stars: number;
  image: string;
}


@Component({
  selector: 'app-sellers-primary',
  templateUrl: './sellers-primary.component.html',
  styleUrls: ['./sellers-primary.component.scss']
})
export class SellersPrimaryComponent implements OnInit {
 workers: Professional[]  =   [];

    constructor(private professionalService: ProfessionalService) {}

  ngOnInit(): void {
    this.loadProfessionals();
  }

   loadProfessionals(): void {
    this.professionalService.getAllProfessionals().subscribe(
      (response) => {
        // Manejar ambos formatos: {professionals: []} o array directo
        const data = response.professionals || (Array.isArray(response) ? response : []);
        // Limitar estrictamente a solo 3 emprendedores
        const limitedData = data.slice(0, 3);
        // Asignar los profesionales al arreglo workers, manteniendo la estructura del modelo
        this.workers = limitedData.map((prof: any) => ({
          ...prof, // Mantiene todas las propiedades de Professional
          text: prof.profession || prof.description || 'Profesional',
          stars: Math.round((prof.score || 0) / 2), // Convierte el score de 0-10 a 5 estrellas
          image: prof.profileImage || prof.image || prof.avatar || 'assets/img/freelance.png' // Usa imagen real o por defecto
        }));
        // Asegurar que solo hay 3 elementos
        if (this.workers.length > 3) {
          this.workers = this.workers.slice(0, 3);
        }
      },
      (error) => {
        console.error('Error al obtener profesionales:', error);
      }
    );
  }

}
