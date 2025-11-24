import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertasService } from 'src/app/services/alertas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-email-verif-password',
  templateUrl: './email-verif-password.component.html',
  styleUrls: ['./email-verif-password.component.scss']
})
export class EmailVerifPasswordComponent implements OnInit {

  
   /*@ViewChild(HeaderLoginComponent) modal!: HeaderLoginComponent;
  private modalComponent!: HeaderLoginComponent;

  openMyModal(){
    return this.modalService.open(this.modalComponent);
    this.modal.openModal();
  }*/


  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


  formRegister! : FormGroup;
  submitted = false; 
  
 
 
  createForm() {
    this.formRegister = this.fb.group({
      email: ["", [Validators.required,Validators.email,Validators.pattern(this.emailPattern)]],
     
    });
  }

  constructor(private fb:FormBuilder, private route:Router, private modal: NgbModal, private alertaService: AlertasService) { 
    this.createForm();
  }


 


  submitRegister(){
    this.submitted = true;
    

    if(!this.formRegister.valid){
      this.alertaService.showError('error', 'no ingresaste bien los datos')
    }else{
      this.alertaService.showSuccess('Se envio un codigo para cambiar contraseña', '!')
      this.route.navigate(['/change-password'])
      this.formRegister.reset();
    }
    

  }

  /*onClick() {
    this.modal.open(ModalComponent);
  }*/

  sendProfile(){
    Swal.fire(
      'The Internet?', //msg principal
      'That thing is still around?', //msg secundario
      'error' //icono
    )
    //this.route.navigate(['profile'])
  }

  get f(){
    return this.formRegister.controls
  }

  


  ngOnInit(): void {
    
  }

  

}
