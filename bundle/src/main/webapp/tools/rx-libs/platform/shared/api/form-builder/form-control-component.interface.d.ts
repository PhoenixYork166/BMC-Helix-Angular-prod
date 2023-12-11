import { ControlValueAccessor } from '@angular/forms';
import { IFormComponent } from './form-component.interface';
export interface IFormControlComponent extends ControlValueAccessor, IFormComponent {
}
