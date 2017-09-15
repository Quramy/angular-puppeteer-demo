# Angular Puppeteer Demo [![CircleCI](https://circleci.com/gh/Quramy/angular-puppeteer-demo.svg?style=svg)](https://circleci.com/gh/Quramy/angular-puppeteer-demo)

:sunglasses: A demonstration repository explains how to replace from Karma to Puppeteer.

## Running unit tests

Run `npm test` to execute the unit tests via ~~[Karma](https://karma-runner.github.io)~~ **[Puppeteer](https://github.com/GoogleChrome/puppeteer)**.
And captures screenshot viewport after each spec. [The captured images are here](https://s3.amazonaws.com/reg-publish-bucket-dc9621d1-4693-41e6-8e94-51eaeea162fb/06039132dbfe644740481e18dbc8e53019e91ace/index.html)(by [reg-suit](https://github.com/reg-viz/reg-suit)).

## How to replace test runner

In summary, I did:

1. Create a webpack-dev-middleware instance using angualr-cli's karma plugin.
1. Boot an Express server using thi middleware
  - This app serves a custom context HTML file([test/context.html](test/context.html)) while referring https://github.com/jasmine/jasmine#installation.
1. Expose Puppeteer's `screenshot` function and use it via `afterEach`.
1. Let the Puppeteer's page object go to the html file served by the Express app.

If you want more details, please see [puppeteer-test.js](puppeteer-test.js).
