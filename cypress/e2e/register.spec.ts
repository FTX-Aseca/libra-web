/* eslint-disable */
// @ts-nocheck
/// <reference types="cypress" />

// Smoke e2e test
describe("Register Test", () => {
  it("allows user to sign up and login", () => {
    // Stub account balance and details to avoid loading errors
    cy.intercept("GET", "/api/accounts/*/balance", {
      statusCode: 200,
      body: { balance: 1000 },
    }).as("getBalance");
    cy.intercept("GET", "/api/accounts/*", {
      statusCode: 200,
      body: { email: "testuser", alias: "Test", cvu: "0000" },
    }).as("getDetails");
    // Intercept registration and login API calls
    cy.intercept("POST", "/api/auth/register").as("registerReq");
    cy.intercept("POST", "/api/auth/login").as("loginReq");

    cy.visit("/login");
    cy.contains("Sign Up").click();
    const email = `testuser-${Date.now()}@example.com`;
    const password = "Password*123";
    cy.get("input#email").type(email);
    cy.get("input#password").type(password);
    cy.get("input#confirmPassword").type(password);
    cy.get("[data-cy=sign_up_button]").click();
    cy.wait("@registerReq");
    cy.url().should("include", "/login");

    cy.get("input#email").type(email);
    cy.get("input#password").type(password);
    cy.get("[data-cy=login_button]").click();
    cy.wait("@loginReq");

    cy.url().should("include", "/home");
    cy.wait("@getBalance");
    cy.wait("@getDetails");
    cy.contains("Welcome,").should("be.visible");
  });
});
