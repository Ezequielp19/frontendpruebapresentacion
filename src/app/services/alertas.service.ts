import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AlertasService {

  constructor(private toast: ToastrService) { }

  showSuccess(desc:string, titulo: string){
    this.toast.success(desc, titulo,{
      closeButton: true,
      timeOut: 4000,
      progressBar: true,
      
    });
  }
  
  //error
  showError(desc:string, titulo:string){
    this.toast.error(desc, titulo,{
      closeButton: true,
      timeOut: 4000
    })
  }
  

}
