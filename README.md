# Angular Puppeteer Demo

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.3.0.

## Running unit tests

Run `ng test` to execute the unit tests via ~~[Karma](https://karma-runner.github.io)~~ [Puppeteer](https://github.com/GoogleChrome/puppeteer).
And captures screenshot viewport after each spec.

## How to replace test runner

In summary, I did:

1. Create a webpack-dev-middleware instance using angualr-cli's karma plugin.
1. Boot an Express server using thi middleware
  - This app serves a custom context HTML file([test/context.html](blob/master/test/context.html)) while referring https://github.com/jasmine/jasmine#installation.
1. Expose Puppeteer's `screenshot` function and use it via `afterEach`.
1. Let the Puppeteer's page object go to the html file served by the Express app.

If you want more details, please see [puppeteer-test.js](blob/master/puppeteer-test.js).
