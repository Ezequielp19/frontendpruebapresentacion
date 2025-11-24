import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { CustomValidators } from '../../validators/custom-validators';

@Component({
  selector: 'app-validation-errors',
  template: `
    <div *ngIf="shouldShowError()" class="validation-error">
      <small class="text-danger">
        <i class="bi bi-exclamation-circle"></i>
        {{ getErrorMessage() }}
      </small>
    </div>
  `,
  styles: [`
    .validation-error {
      margin-top: 0.25rem;
      font-size: 0.875rem;
    }

    .text-danger {
      color: #dc3545;
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }
  `]
})
export class ValidationErrorsComponent {
  @Input() control: AbstractControl | null = null;
  @Input() fieldName: string = 'Este campo';

  shouldShowError(): boolean {
    return !!(this.control && this.control.invalid && (this.control.dirty || this.control.touched));
  }

  getErrorMessage(): string {
    if (!this.control) {
      return '';
    }

    return CustomValidators.getErrorMessage(this.control, this.fieldName);
  }
}
