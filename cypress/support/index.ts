export function setBrowserLanguage(win: Cypress.AUTWindow, lang: string): void {
  Object.defineProperty(win.navigator, "languages", {
    value: [lang],
  });
}

export function setDefaultBrowserLanguage(win: Cypress.AUTWindow): void {
  setBrowserLanguage(win, "en-US");
}
