import { TypeDecorator } from '@angular/core';
export interface RxApplicationInitializer {
    applicationId: string;
}
export interface RxViewComponentDecorator {
    (rxApplicationInitializer?: RxApplicationInitializer): TypeDecorator;
    new (rxApplicationInitializer?: RxApplicationInitializer): RxApplicationInitializer;
}
export declare const RxApplicationInitializer: RxViewComponentDecorator;
