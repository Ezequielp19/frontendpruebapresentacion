import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  formRegister! : FormGroup;
  submitted = false; 

  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
  constructor(private fb:FormBuilder, ) {
    this.createForm();
   }

  createForm(){
    this.formRegister = this.fb.group({
      email: ["", [Validators.required,Validators.email]]
    })
  }

  ngOnInit(): void {
  }

  get f(){
    return this.formRegister.controls
  }

  get email(){
    return this.formRegister.get('email')
  }

  onSubmitPassword(){
    this.submitted = true,
    Swal.fire('Envio exitoso', 'Hemos enviado un codigo a tu mail,revisa en spam en caso que no lo encuentres', 'success')
    this.formRegister.reset()
   
  }

}
