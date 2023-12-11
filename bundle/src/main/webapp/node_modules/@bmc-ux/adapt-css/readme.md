# [Welcome to the BMC ADAPT UI Framework](https://github.bmc.com/pages/bmc-ux/adapt-css/docs)

[![Slack](https://bmcuxd-slack.herokuapp.com/badge.svg)](https://bmcuxd-slack.herokuapp.com)


##### ADAPT is an OpenBMC Internal Open Source Project.
![](https://s3.amazonaws.com/aws-uxd-cdn/docs/badge-internal.png)

## Table of contents
* [Getting Started](#getting-started)
* [Bugs and feature requests](#bugs-and-new-feature-requests)
* [Documentation](#documentation)
* [Versioning](#versioning)
* [Licensing](#licensing)
* [Contributing](#contributing)

## Getting Started
1. Make sure you have a BMC GitHub account. If you don’t, submit a request to Helpdesk.
2. Open Terminal on OS X, or Command Prompt on Windows. Alternatively you can download the desktop app for GitHub and set it up.
3. Clone ADAPT 

   ```sh 
   git clone https://github.bmc.com/bmc-ux/adapt-css.git
   ```
   
4. **Navigate to the directory created,** and create a new branch for your changes.
5. Install NodeJS and NPM **in the directory created.** Detailed instructions can be found at https://docs.npmjs.com/getting-started/installing-node
6. Still in the created directory, install the ADAPT project dependencies using the terminal command `npm install`. 
You may need to use `sudo npm install` on OS if you encounter any permissions errors. On Windows you'll need to be logged in as an administrator.
7. Install Jekyll 

   ```sh
       gem install bundler jekyll;
       bundle pack;
   ```
     
    Detailed instructions can be found at [https://jekyllrb.com](https://jekyllrb.com).

8. Launch the Jekyll server:

   ```sh 
    bundler exec jekyll serve
   ```
   
   Local Jekyll Server Address: <https://127.0.0.1:4000>
   
   The demo site source code can be found under `docs/demo`.
   
9. If you will be working with .scss files you can use `npm` script to compile it.
	* For CSS compilation - `npm run sass:compile`
	* For CSS minification - `npm run sass:build`
	* For watching changes - `npm run sass:watch`
 
10. Submit a pull request and assigning it to the appropriate person.


## Bugs and new feature requests
Have a bug or a feature request? Please first search for existing and closed issues. If your problem or idea is not addressed yet, [please open a new issue](https://github.bmc.com/bmc-ux/adapt-css/issues/new) and follow the guidelines for [creating a new issue or feature request.](https://github.bmc.com/bmc-ux/adapt-css/blob/master/general_issue_template.md)

## Documentation

The BMC ADAPT documentation, included in this repo in the root directory, is  publicly hosted on GitHub Pages at <https://github.bmc.com/pages/bmc-ux/adapt-css/docs/>. The docs may also be run locally. The ADAPT docmentation includes examples, guidance and design rational for all of the components available in the ADAPT framework, and should be the first stop for anyone getting started with ADAPT.

The BMC Iconfont documentation, included in this repo, is publicly hosted on GitHub Pages at <https://github.bmc.com/pages/bmc-ux/dpl-iconfont/>. The docs may also be run locally.

ADAPT documentation also comes with a handful of demo pages, which provide a condensed view of all the latest components. These pages are useful for enhancing or expanding on a particular component for inclusion back into ADAPT. You can find it at <https://github.bmc.com/pages/bmc-ux/adapt-css/docs/demo/>


## Versioning

For transparency into our release cycle, and in striving to maintain backward compatibility, the BMC icon font is maintained under the [Semantic Versioning](http://semver.org) guidelines.

`<major>.<minor>.<patch>`

And constructed with the following guidelines:
release.notes.txt
* Breaking backward compatibility bumps the major (and resets the minor and patch)
* New additions, including new icons, without breaking backward compatibility bumps the minor (and resets the patch)
* Bug fixes, changes to brand logos, and misc changes bumps the patch

## Licensing

When using ADAPT, teams must follow the proper procedure in the [BMC Product Lifecycle Portal](http://phx-plcweb-01.adprod.bmc.com) for referencing any included third-party license agreements (e.g., Bootstrap, Angular JS, jQuery, etc.).

Note: This requirement also includes any additional third-party license agreements that may be referenced in the .md files associated with individual components downloaded from the ADAPT git repositories.

### Third-party components/libraries and associated licenses included in ADAPT:
#### MIT Licensed Libraries - https://choosealicense.com/licenses/mit/:
* Angular JS (“MIT-Style” license: https://angular.io/license)
* Bootstrap 4.0 
* ng-bootstrap: 1.0.0-beta.6 
* jQuery 3.2.1 
* ag-grid: 13.2.0 
* ag-grid-angular: 13.2.0 
* core-js: ^2.4.1
* hammerjs: ^2.0.8 )
* moment-es6: ^1.0.0 
* siema: 1.4.6 
* svgxuse: ^1.2.6 
* ts-helpers: ^1.1.2 
* zone.js: ^0.8.5 
* popper js 
* ZeroClipboard js 
* TipueSearch js 

#### BSD Licensed Libraries - https://opensource.org/licenses/BSD-3-Clause:
* d3: 5.0.0  

#### Apache Licensed Libraries - https://choosealicense.com/licenses/apache-2.0/:
* angular-split: ^0.2.0 
* rxjs: ^5.2.0 
* web-animations-js: ^2.2.5 
* primeng (PrimeFaces): 4.2.0 
* ng2-rx: version 3.0.0

Please contact the UX Group with any questions.

## Contributing

Please follow the guidance provided in the [contributing.md file](https://github.bmc.com/bmc-ux/adapt-css/blob/master/contributing.md) for submitting issues or feature requests to ADAPT. You can also read these guidelines on the [Getting Started page of the ADAPT documentation.](https://github.bmc.com/pages/bmc-ux/adapt-css/docs/getting-started.html#contributing)
