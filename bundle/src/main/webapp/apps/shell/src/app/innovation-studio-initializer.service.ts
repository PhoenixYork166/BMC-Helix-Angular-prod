import { IRxApplicationInitializer, RxWhatfixConfiguratorService } from '@helix/platform/shared/api';
import { Injectable } from '@angular/core';
import { RxGainsightConfiguratorService, RxApplicationContext } from '@helix/platform/shared/components';

@Injectable()
export class InnovationStudioInitializerService implements IRxApplicationInitializer {
  constructor(
    private rxWhatfixConfiguratorService: RxWhatfixConfiguratorService,
    private rxGainsightConfiguratorService: RxGainsightConfiguratorService
  ) {}

  initialize(): void {
    this.rxWhatfixConfiguratorService.setConfig('4d0def70-3289-11ec-b536-bacbbe07b880');
  }
}
