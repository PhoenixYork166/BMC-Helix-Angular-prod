import { Component, Input } from '@angular/core';
import { DigitalSignatureEffectsDesignModel } from './digital-signature-effects-design.model';

@Component({
  selector: 'com-example-test210500-digital-signature-effects-design',
  styleUrls: ['./digital-signature-effects-design.scss'],
  templateUrl: './digital-signature-effects-design.component.html'
})
export class DigitalSignatureEffectsDesignComponent {
  @Input()
  model: DigitalSignatureEffectsDesignModel;
}
