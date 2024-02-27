describe("i18n", () => {
  it("using pl-PL translations to display homepage, when langugage in browser is set to pl-PL", () => {
    cy.visit("/", {
      onBeforeLoad(win) {
        Object.defineProperty(win.navigator, "languages", {
          value: ["pl-PL"],
        });
      },
    });

    cy.contains("Witaj");
    cy.contains("Postaci");
  });

  it("using en-US translations to display homepage, when langugage in browser is set to en-US", () => {
    cy.visit("/", {
      onBeforeLoad(win) {
        Object.defineProperty(win.navigator, "languages", {
          value: ["en-US"],
        });
      },
    });

    cy.contains("Welcome");
    cy.contains("People");
  });

  it("using default en-US translations to display homepage, when langugage from browser is not supported", () => {
    cy.visit("/", {
      onBeforeLoad(win) {
        Object.defineProperty(win.navigator, "languages", {
          value: ["es-ES"],
        });
      },
    });

    cy.contains("Welcome");
    cy.contains("People");
  });
});
