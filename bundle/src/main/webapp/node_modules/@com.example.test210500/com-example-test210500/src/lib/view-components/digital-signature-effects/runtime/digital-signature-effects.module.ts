import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DigitalSignatureEffectsComponent } from './digital-signature-effects.component';
import { SignaturePadModule } from 'angular2-signaturepad';
import { AdaptButtonModule } from '@bmc-ux/adapt-angular';

@NgModule({
  imports: [CommonModule, SignaturePadModule, AdaptButtonModule],
  exports: [DigitalSignatureEffectsComponent],
  declarations: [DigitalSignatureEffectsComponent],
  entryComponents: [DigitalSignatureEffectsComponent]
})
export class DigitalSignatureEffectsModule {
}
