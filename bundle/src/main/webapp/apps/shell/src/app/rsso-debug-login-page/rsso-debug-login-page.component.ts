import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RX_BUILD_ENVIRONMENT, RxApplicationLoaderService, RxRssoDebugService } from '@helix/platform/shared/api';
import { DomSanitizer } from '@angular/platform-browser';
import { forEach } from 'lodash';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'rx-rsso-debug-login-page',
  template: '<div [innerHTML]="htmlTemplate"></div>',
  encapsulation: ViewEncapsulation.None
})
export class RxRssoDebugLoginPageComponent implements OnInit {
  htmlTemplate: string;

  constructor(
    private httpClient: HttpClient,
    @Inject(DOCUMENT) private document: Document,
    @Inject(RX_BUILD_ENVIRONMENT) private rxBuildEnvironment: any,
    private rxRssoDebugService: RxRssoDebugService,
    private rxApplicationLoaderService: RxApplicationLoaderService,
    private domSanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    /**
     * 1. Getting all RSSO config parameters from env file
     * 2. Doing the post call to RSSO server to get the RSSO login page and
     * 3. Displaying it in the component.
     */
    this.rxApplicationLoaderService.removeApplicationLoader();

    if (this.rxRssoDebugService.isRssoDebugEnabled()) {
      const params = new URLSearchParams();

      forEach(this.rxBuildEnvironment?.rssoParams, (value: string, key: string) => params.set(key, value));

      if (!params.get('url_hash_handler')) {
        params.set('url_hash_handler', 'true');
      }

      params.set(
        'goto',
        `https://${this.document.location.host}/helix/index.html#/com.bmc.arsys.rx.innovationstudio/workspace`
      );

      this.httpClient
        .post('/rsso/start', params.toString(), {
          headers: new HttpHeaders({ Accept: 'text/html', 'Content-Type': 'application/x-www-form-urlencoded' }),
          responseType: 'text'
        })
        .subscribe((response) => {
          this.htmlTemplate = this.domSanitizer.bypassSecurityTrustHtml(response);
        });
    }
  }
}
