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

  it("Contains Image URL and description input, and Publish Button", () => {
    const image = cy.get("input[name='image']");
    image
      .should("be.visible")
      .and("have.attr", "type", "url")
      .and("have.attr", "required", "required")
      .and("have.attr", "placeholder", "Image URL");

    const description = cy.get("input[name='desc']");
    description
      .should("be.visible")
      .and("have.attr", "type", "text")
      .and("have.attr", "required", "required")
      .and("have.attr", "placeholder", "What's on your mind?");

    const button = cy.get("button[type='submit']");
    button
      .should("be.visible")
      .contains("Publish!")
      .should("have.css", "background-color", "rgb(79, 70, 229)")
      .and("have.css", "color", "rgb(255, 255, 255)");
  });

  it("Upload Some Photos", () => {
    const photos = [
      {
        imageValues:
          "https://www.gardeningknowhow.com/ornamental/trees/italian-cypress/growing-italian-cypress-trees.htm",
        descriptionValues: "Image1:Lorem Ipsum",
      },
      {
        imageValues:
          "https://3dwarehouse.sketchup.com/model/c28f011c3ad141f68d1fe8cdc415f4c5/Cypress",
        descriptionValues: "Image2:lorem ipsum",
      },
    ];

    photos.forEach(({ imageValues, descriptionValues }) => {
      cy.get("input[name='image']").type(imageValues);

      cy.get("input[name='desc']").type(descriptionValues);

      cy.get("button[type='submit']").click();

      //check apakah foto dan deskripsi sudah ke upload?
      cy.get("img").should("have.attr", "src", imageValues);
      cy.contains(descriptionValues);
    });

    //check jumlah foto yang ke upload
    cy.contains(`Found ${photos.length} photos`);
  });
});
