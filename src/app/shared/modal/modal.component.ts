import { Component, Input, OnInit, Output, TemplateRef, EventEmitter, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal, NgbModalOptions, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  
  @Input() title ='¡Titulo!'
  @Input() textMessage ='Este es el texto relleno que debe mostrar el modal.'
  @Input()  accionButton = 'acción'
  @Input()  nameIcon = 'check'


  @ViewChild("modalMessage") private modalMessage!: TemplateRef<Object>;  
 

  constructor( private modalService: NgbModal,) { }

  ngOnInit(): void {
    setTimeout(()=>{
      console.log(this.nameIcon)
      this.showModal(this.modalMessage, {size: 'md', backdrop: "static", keyboard: false })
    },300)
  }

  showModal(content: TemplateRef<unknown>, modalOptions: NgbModalOptions = {}) {
    this.modalService.open(content, modalOptions).result.then(
        result => {
            if (result === 'Save Click') {
            }
        },
        reason => {
            console.log(`Dismissed ${this._getDismissReason(reason)}`);
        }
    )
  }

  _getDismissReason(reason: unknown): string {
    if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
    } else {
        return `with: ${reason}`;
    }
  }
  

}
