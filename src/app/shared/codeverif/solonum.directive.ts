import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: 'input[soloNum]'
})
export class SolonumDirective {

  constructor( private readonly elRef:ElementRef) { }

  @HostListener('input', ['$event'])

  onchangeInput(event: Event):void{

    const numberOnly = /[^0-9]*/g

    const initValue = this.elRef.nativeElement.value;

    this.elRef.nativeElement.value = initValue.replace(numberOnly, '')

    if(initValue !== this.elRef.nativeElement.value){
      event.stopPropagation();
    }
  }



}
