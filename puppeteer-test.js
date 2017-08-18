const fs = require('fs');
const path = require('path');
const { EventEmitter } = require('events');
const express = require('express');
const karma = require('karma');
const ngCLIKarmaPlugin = require('@angular/cli/plugins/karma');
const puppeteer = require('puppeteer');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');

class Emitter extends EventEmitter {
  refreshFiles() {    // Called by karma plugin
    this.emit('ready');
  }
}

function createServer(port) {
  const app = express();
  const emitter = new Emitter();
  const handlers = []; // karm plugin will push something like { handler: webpack-dev-middleware }.
  const testConfig = karma.config.parseConfig(path.resolve('./karma.conf.js'));
  const init = ngCLIKarmaPlugin['framework:@angular/cli'][1];
  init(testConfig, emitter, handlers); // conf, emitter, customFileHandlers,
  app.use(express.static(__dirname));
  app.use(handlers[0].handler);
  return new Promise((resolve, reject) => emitter.once('ready', () => app.listen(port, () => resolve(emitter))));
}

(async() => {
  rimraf.sync('actual_images/**/*.png');
  mkdirp.sync('actual_images');
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.exposeFunction('capturePage', name => {
    const filename = path.resolve(__dirname, `actual_images/${name}.png`);
    console.log('Save 🎨 to', filename);
    return page.screenshot({ path: filename, fullPage: true });
  });
  const emitter = await createServer(3100);
  await page.exposeFunction('puppeteerDone', async code => {
    emitter.emit('exit', async () => process.exit(code || 0));
  });
  await page.goto('http://localhost:3100/test/context.html');
})();
