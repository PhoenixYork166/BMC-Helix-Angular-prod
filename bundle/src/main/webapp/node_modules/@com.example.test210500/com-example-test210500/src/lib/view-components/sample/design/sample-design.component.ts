import { Component, Input } from '@angular/core';
import { SampleDesignModel } from './sample-design.model';

@Component({
  selector: 'com-example-test210500-sample-design',
  styleUrls: ['./sample-design.scss'],
  templateUrl: './sample-design.component.html'
})
export class SampleDesignComponent {
  @Input()
  model: SampleDesignModel;
}
