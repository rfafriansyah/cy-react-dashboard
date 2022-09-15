describe("Test Cases -> Dashboard Page", () => {
  it("Do login with correct values", () => {
    cy.visit("https://taufanfadhilah.github.io/react-gallery/");

    const email = cy.get("input[name='email']");
    email.type("user@react.test");

    const password = cy.get("input[name='password']");
    password.type("password");

    const button = cy.get("button");
    button.click();
    cy.on("window:alert", (t) => {
      expect(t).to.contains("welcome");
    });
    cy.url().should(
      "eq",
      "https://taufanfadhilah.github.io/react-gallery/dashboard"
    );
  });

  it("Found No Post for the First Time", () => {
    cy.contains("Found 0 photos");
  });
});
