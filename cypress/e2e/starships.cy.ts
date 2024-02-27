describe("Starships cards", () => {
  beforeEach(() => {
    cy.visit("cards/starships", {
      onBeforeLoad(win) {
        Object.defineProperty(win.navigator, "languages", {
          value: ["en-US"],
        });
      },
    });
    cy.get("[data-test=play-button]").as("playBtn");
    cy.get("[data-test=player]").as("player");
    cy.get("@player").first().as("player1");
    cy.get("@player").last().as("player2");
  });

  it("display starships game", () => {
    cy.contains("Starships");
    cy.get("@playBtn").should("not.be.disabled");
    cy.get("[data-test=card-container]").should("have.text", "");
    cy.get("[data-test=spinner]").should("have.length", 0);
  });

  it("has 2 players (Player 1, Computer)", () => {
    cy.get("@player").should("have.length", 2);

    cy.get("@player1").contains("Player 1");
    cy.get("@player1")
      .find("[data-test=score]")
      .should("have.text", "Score: 0");

    cy.get("@player2").contains("Computer");
    cy.get("@player2")
      .find("[data-test=score]")
      .should("have.text", "Score: 0");
  });

  describe("Draw cards successfully", () => {
    beforeEach(() => {
      let counter = 0;
      cy.intercept("**/api/starships*", (req) => {
        req.reply({
          fixture: `starships/starship-collection-${counter++ || 1}.json`,
        });
      });

      cy.intercept("**/api/starships/1", {
        delay: 1000,
        fixture: "starships/starship-1.json",
      }).as("player1Request");
      cy.intercept("**/api/starships/2", {
        delay: 1000,
        fixture: "starships/starship-2.json",
      }).as("player2Request");
    });

    it("display loaders while cards drawing", () => {
      cy.get("@playBtn").click();

      cy.get("@player1").find("[data-test=spinner]").should("have.length", 1);
      cy.get("@player2").find("[data-test=spinner]").should("have.length", 1);
    });

    it("disable play button while cards drawing", () => {
      cy.get("@playBtn").click();
      cy.get("@playBtn").should("be.disabled");
    });

    it("hide spinners after drawing", () => {
      cy.get("@playBtn").click();
      cy.wait("@player1Request");
      cy.wait("@player2Request");
      cy.get("[data-test=spinner]").should("have.length", 0);
    });

    it("display cards after drawing", () => {
      cy.get("@playBtn").click();

      cy.wait("@player1Request");
      cy.wait("@player2Request");

      cy.get("@player1").find("[data-test=card]").contains("Crew: 1");
      cy.get("@player2").find("[data-test=card]").contains("Crew: 5");
    });

    it("display winner", () => {
      cy.get("@playBtn").click();

      cy.wait("@player1Request");
      cy.wait("@player2Request");

      cy.get("@player1")
        .find("[data-test=player-name]")
        .should("not.contain", "WIN");
      cy.get("@player2").find("[data-test=player-name]").contains("WIN");
    });

    it("display score", () => {
      cy.get("@playBtn").click();

      cy.wait("@player1Request");
      cy.wait("@player2Request");

      cy.get("@player1")
        .find("[data-test=score]")
        .should("have.text", "Score: 0");
      cy.get("@player2")
        .find("[data-test=score]")
        .should("have.text", "Score: 1");
    });

    it("allow play again", () => {
      cy.get("@playBtn").click();

      cy.wait("@player1Request");
      cy.wait("@player2Request");

      cy.get("@playBtn").should("not.be.disabled");
    });
  });

  describe("Draw cards failure", () => {
    it("draw cards failure (error from api/starships*)", () => {
      cy.intercept("api/starships*", { statusCode: 500 });
      cy.get("@playBtn").click();
      cy.get("[data-test=card-container]").should("have.text", "");
      cy.get("[data-test=spinner]").should("have.length", 0);
      cy.get("@playBtn").should("not.be.disabled");
    });

    it("draw cards failure (error from api/starships/*)", () => {
      cy.intercept("api/starships*", {
        fixture: "starships/starship-collection-1.json",
      });
      cy.intercept("api/starships/*", { statusCode: 500 });
      cy.get("@playBtn").click();
      cy.get("[data-test=card-container]").should("have.text", "");
      cy.get("[data-test=spinner]").should("have.length", 0);
      cy.get("@playBtn").should("not.be.disabled");
    });
  });
});
