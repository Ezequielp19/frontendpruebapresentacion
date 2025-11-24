import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  submitRegister(){
    

   
    return Swal.fire('Cambios guardados!', '', 'success')
     
    

  }

}
