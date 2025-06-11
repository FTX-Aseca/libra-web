/* eslint-disable */
// @ts-nocheck
/// <reference types="cypress" />

describe("DEBIN success flow", () => {
  it("completes a DEBIN request successfully", () => {
    // Intercept the login and DEBIN requests
    cy.intercept("POST", "/api/auth/login").as("loginReq");
    cy.intercept("POST", "/api/debin/request").as("debinReq");

    cy.visit("/login");
    cy.get("input#email").type("alice@example.com");
    cy.get("input#password").type("Password1!");
    // Click the login button via data-cy attribute
    cy.get("[data-cy=login_button]").click();
    // Wait for login to complete before redirect
    cy.wait("@loginReq");

    cy.url().should("include", "/home");
    // Ensure account API calls are stubbed
    cy.wait("@getBalance");
    cy.wait("@getDetails");

    // Navigate to Transfer page
    cy.contains("Transfer").click();

    // Select DEBIN tab and enter alias
    cy.contains("DEBIN").click();
    cy.get("input#identifier").type("AlphaAlias");
    cy.contains("Continue").click();

    // Enter amount and confirm
    cy.get("input#amount").type("10");
    cy.contains("Confirm").click();
    // Wait for DEBIN simulation to complete
    cy.wait("@debinReq");

    // Verify DEBIN completed confirmation
    cy.contains("DEBIN Completed").should("be.visible");
    cy.contains("Done").click();
    cy.url().should("include", "/home");
  });
});
