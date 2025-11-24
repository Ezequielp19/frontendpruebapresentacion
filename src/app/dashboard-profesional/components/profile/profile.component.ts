import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  submitRegister(){



    return Swal.fire('Cambios guardados!', '', 'success')



  }

  profileImage: string | null = null; // Inicia como null, no hay imagen por defecto

  // Método para manejar la selección de imagen
  onImageSelect(event: any): void {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      // Leer la imagen como un URL base64
      reader.onload = () => {
        this.profileImage = reader.result as string; // Asignar la imagen leída
      };

      reader.readAsDataURL(file); // Leer el archivo seleccionado
    }
  }

}
