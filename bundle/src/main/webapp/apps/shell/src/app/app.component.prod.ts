import { Component } from '@angular/core';
import { RxApplicationConfiguratorService } from '@helix/platform/shared/api';
import { AdaptIconConfig } from '@bmc-ux/adapt-angular';
import { ADAPT_SVG_ICON_SET } from '@bmc-ux/dpl-iconfont';

@Component({
  selector: 'rx-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponentProd {
  constructor(
    private rxApplicationConfiguratorService: RxApplicationConfiguratorService,
    private iconConfig: AdaptIconConfig
  ) {
    this.iconConfig.registerIcons(ADAPT_SVG_ICON_SET);
    this.rxApplicationConfiguratorService.configure();
  }
}
