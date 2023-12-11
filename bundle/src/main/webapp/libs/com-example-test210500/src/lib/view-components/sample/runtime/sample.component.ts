import { Component, OnInit } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { BaseViewComponent, IViewComponent } from '@helix/platform/view/runtime';
import { RxViewComponent } from '@helix/platform/view/api';
import { ISampleParameters } from '../design/sample.interface';

@Component({
  selector: 'com-example-test210500-sample',
  styleUrls: ['./sample.scss'],
  templateUrl: './sample.component.html'
})
@RxViewComponent({
  name: 'com-example-test210500-sample',
})
export class SampleComponent extends BaseViewComponent implements OnInit,IViewComponent {
  // Contains the view component instance id.
  guid: string;
  // Contains the view component configuration.
  config: Observable<any>;
  // Contains the view component instance parameters.
  inputParams: ISampleParameters;

  // Implementing set property and refresh apis.
  api = {
    // This will be called when an input parameter is set by a button "set property" action.
    setProperty: this.setProperty.bind(this)
  };

  ngOnInit() {
    // Subscribing to input parameter changes.
    this.config.subscribe((config: ISampleParameters) => {
      this.inputParams = config;
    });

    // Registering the custom set property and refresh implementations.
    this.notifyPropertyChanged('api', this.api);
  }


  // This method is triggered by a button "set property" action.
  setProperty(propertyPath: string, propertyValue: any): void | Observable<never>{
    switch (propertyPath) {
      case 'hidden': {
        this.inputParams.hidden = propertyValue;
        this.notifyPropertyChanged(propertyPath, propertyValue);
        break;
      }
      case 'message': {
        this.inputParams.message = propertyValue;
        break;
      }
      default: {
        return throwError(`Sample : property ${propertyPath} is not settable.`);
      }
    }
  }
}
