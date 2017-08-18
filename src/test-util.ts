
export function isPuppeteer(): boolean {
  return !!(window as any)['__puppeteer__'];
}

export function capturePage(path: string): Promise<void> {
  if (!isPuppeteer()) {
    return Promise.resolve();
  }
  return (window as any)['capturePage'](path);
}

