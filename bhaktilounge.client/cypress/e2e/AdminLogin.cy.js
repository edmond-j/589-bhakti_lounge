describe("Authenticated User Tests", () => {
    const username = "admin";
    const password = "Password123!";

    before(() => {
        cy.loginAndGetToken(username, password);
    });

    beforeEach(() => {
        cy.session(
            [username],
            () => {
                cy.visit("/");
                cy.get('[data-testid="username-input"]').clear().type(username);
                cy.get('[data-testid="password-input"]').clear().type(password);
                cy.get('[data-testid="login-button"]').click();
                cy.url().should("include", "/check/check-in");
            },
            { cacheAcrossSpecs: true }
        );
    });

    it("should display management button", () => {
        cy.visit("/check/check-in");
        cy.get('[data-testid="manage-button"]').should("exist");
    });

    it("navigate to new customer register", () => {
        cy.visit("/check/register");
        cy.url().should("include", "/check/register");
    });

    it("new customer register & back to search", () => {
        cy.visit("/check/register");
        cy.get("#register-firstname-input").type("test");
        cy.get("#register-lastname-input").type("user");
        cy.get("#register-email-input").type("testuser@gg.com");
        cy.get("#register-pronouns-select").select("he");
        cy.get("#register-channel-select").select("Other");
        cy.get("#register-signup-button").click();
        cy.on("window:alert", (str) => {
            expect(str).to.contain("registered");
        });
        cy.url().should("include", "check/check-in");
        cy.get("#detail-membership-input").should("have.value", "None");
        cy.get("#detail-checkin-button").should("be.disabled");
        cy.get("#detail-back-button").click();
        cy.get("#search-searchbar-input").should("exist");
    });

    it("input name to search & open detail", () => {
        cy.visit("/check/check-in");
        cy.get("#search-searchbar-input").type("tes");
        cy.get(".suggestions-list").should("be.visible");
        cy.get(".suggestions-list").contains("li", "testuser@gg.com").click();
        cy.get("#detail-email-input").should("have.value", "testuser@gg.com");
    });

    after(() => {
        cy.deleteCustomerByEmail("testuser@gg.com");
    });
});
