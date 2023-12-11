import { EventEmitter } from '@angular/core';
import { IFormBuilderEvent } from './form-builder.types';
export interface IFormComponent {
    options: any;
    propertyPath?: string;
    events?: EventEmitter<IFormBuilderEvent>;
}
