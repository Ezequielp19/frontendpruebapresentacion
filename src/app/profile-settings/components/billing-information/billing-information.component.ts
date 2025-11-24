import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validators} from '@angular/forms'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-billing-information',
  templateUrl: './billing-information.component.html',
  styleUrls: ['./billing-information.component.scss'],
})
export class BillingInformationComponent implements OnInit {

  private cuitPattern: any = /^[1-9]\d{2}-\d{8}-\d{1}$/;

  formRegister!: FormGroup

  constructor(private fb: FormBuilder) {
    this.createForm();
  }


  createForm(){
    this.formRegister = this.fb.group({
      cuit: ['', [Validators.required,Validators.pattern(this.cuitPattern)]]
    })
  }

  get f(){
    return this.formRegister.controls
  }

  submitRegister(){
    

   
    return Swal.fire('Cambios guardados!', '', 'success')
     
    

  }



  ngOnInit(): void {}
}
