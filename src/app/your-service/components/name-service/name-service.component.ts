import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-name-service',
  templateUrl: './name-service.component.html',
  styleUrls: ['./name-service.component.scss']
})
export class NameServiceComponent implements OnInit, OnDestroy {
  @Output() formDataChange = new EventEmitter<any>();

  nameServiceForm: FormGroup;
  private subscriptions = new Subscription();

  categories = [
    'Electronics',
    'Clothing',
    'Books',
    'Furniture',
    'Toys',
    'Technology',
    'Home & Garden',
    'Sports',
    'Automotive',
    'Health & Beauty'
  ];

  constructor(private fb: FormBuilder) {
    this.nameServiceForm = this.fb.group({
      category: ['', Validators.required],
      nameService: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  ngOnInit(): void {
    // Escuchar cambios en el formulario y emitir datos
    this.subscriptions.add(
      this.nameServiceForm.valueChanges.subscribe(value => {
        this.emitFormData();
      })
    );
  }

  // Emitir datos del formulario al componente padre
  emitFormData() {
    if (this.nameServiceForm.valid) {
      this.formDataChange.emit({
        nameService: this.nameServiceForm.get('nameService')?.value,
        category: this.nameServiceForm.get('category')?.value
      });
    }
  }

  // Validar si el campo tiene error
  hasError(fieldName: string): boolean {
    const field = this.nameServiceForm.get(fieldName);
    return field ? (field.invalid && (field.dirty || field.touched)) : false;
  }

  // Obtener mensaje de error
  getErrorMessage(fieldName: string): string {
    const field = this.nameServiceForm.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) return 'Este campo es requerido';
      if (field.errors['minlength']) return `Mínimo ${field.errors['minlength'].requiredLength} caracteres`;
    }
    return '';
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
