# Getting started

This is a step-by-step guide on how to run local dev server if remote server is protected by 'RSSO'.


### 1. Configure proxies

To get the details of the API & RSSO servers,
Open Chrome's Developer Tools, go to Network tab, check Preserve log option.

Open the Innovation Studio application, e.g.
> https://foo.bmc.com/helix/index.html#/com.bmc.arsys.rx.innovationstudio/workspace

The apiHost is the host of the Innovation Studio, e.g.
> https://foo.bmc.com

In RSSO enabled environment, you will be redirected to the RSSO login page, e.g.
> https://bar.bmc.com/rsso/start

Note the RSSO host name here, e.g.
> https://bar.bmc.com

Set apiHost and rssoHost variables in the `.env` file, e.g.
> apiHost=https://foo.bmc.com  
> rssoHost=https://bar.bmc.com

On the Network tab in Developer Tools, filter requests by `rsso/start`.  
Locate the `rsso/start` `POST` call, go to the Payload tab and copy the payload information, e.g.
```
url_hash_handler: true
goto: https://foo.bmc.com/helix/index.html#/com.bmc.dsm.bwfa
tenant: foo.bmc.com@tenant-admin
```

Open `apps/shell/src/environments/environment.ts` and add the params inside the `rssoParams` property, e.g.
```
export const environment = {
  production: false,
  isRssoDebugEnabled: false,
  rssoParams: {
    url_hash_handler: "true",
    goto: "https://foo.bmc.com/helix/index.html#/com.bmc.dsm.bwfa",
    tenant: "foo.bmc.com@tenant-admin"
  }
  //, bundleId: '' //WIP: comment out this line if you don't want the code of other angular bundles to be loaded
};
```

> Note: On a customer environment, BMC support may provide a special URL to bypass the customer IDP provider, e.g.
https://foo-qa-is.onbmc.com/innovationstudio/index.html?bypass-auth=true

The form payload in the rsso/start form-data would be different, e.g.
```
url_hash_handler: true
bypass-referer: https://foo-qa-is.onbmc.com/
goto: https://foo-qa-is.onbmc.com/innovationstudio/index.html?bypass-auth=true
tenant: foo-qa-is.onbmc.com@foo-qa
bypass-auth: true
```
Copy all the properties in the environment.ts file.

### 2. Enable RSSO debugging for local server

Open `apps/shell/src/environments/environment.ts`.

Step 1: Set `isRssoDebugEnabled` to true.

Step 2: Set `rssoParams` to an object with properties taken from the POST call payload. See more details above.

### 3. Install self-signed certificate for HTTPS

Locate the certificate in `tools/certificate` directory.
You will have to install the certificate on your local system. Refer to `tools/certificate/README.md` for more details.

> Note: You can use the provided certificate or you can create your own if desired.

### 4. (Optional) How to debug locales other than English

Visit the application that you want to debug, e.g.
https://foo.bmc.com/helix/index.html#/com.bmc.foo

1. On the top right side open the dropdown (user profile) & click on option "My preferences"
2. "My preferences" modal dialog will open, here you can choose the "Preferred language" from the options.
3. Save the selected preferred language by clicking on the apply button.

### 5. Enable `rsso-debug-login-page` component

Search for `TODO-RSSO-DEBUG` comments in `apps/shell/src/app` directory and uncomment the code as described in each comment.
There are 4 occurrences in two files:
* apps/shell/src/app/app-routing.module.ts
* apps/shell/src/app/app.module.ts

### 6. Open Chrome in disable-web-security mode (cors disabled)

We need to disable CORS, otherwise some rest API calls will fail. Make sure to close all open Chrome windows. Using Chrome with CORS disabled should only be done for this specific use case and not for daily use.

##### On Mac:
> `open -na Google\ Chrome --args --disable-web-security --user-data-dir=/tmp`

Confirm Chrome displays the message
> You are using an unsupported command-line flag: --disable-web-security. Stability and security will suffer.

##### On Windows:
Go to the directory where chrome.exe is installed and run the following command
> `chrome.exe --user-data-dir="C:/tmp" --disable-web-security`

> Note: If C:/tmp directory does not exist, create it, or use a different empty directory.

Confirm Chrome displays the message
> You are using an unsupported command-line flag: --disable-web-security. Stability and security will suffer.

### 7. Start the dev server

##### Run the following command in the /bundle/src/main/webapp/ directory:
> yarn run start --configuration=rsso-debug --host=localhost.bmc.com

> Note: The host suffix should be the same as the RSSO domain name. See Step 1 for details on how to identify the RSSO domain.

> In the example below, the RSSO domain is `bmc.com`.
https://bar.bmc.com/rsso/start

### 8. Disabling RSSO debugging

To disable RSSO debugging, set `isRssoDebugEnabled` to `false` in `apps/shell/src/environments/environment.ts`.
