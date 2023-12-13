import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';
import { SampleDesignComponent } from './sample-design.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [SampleDesignComponent],
  entryComponents: [SampleDesignComponent]
})
export class SampleDesignModule {
}
