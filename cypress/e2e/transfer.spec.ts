/* eslint-disable */
// @ts-nocheck
/// <reference types="cypress" />

describe("Transfer and receive flow", () => {
  it("sends funds and recipient sees it", () => {
    // Register intercepts for login and transfer
    cy.intercept("POST", "/api/auth/login").as("loginAlice");
    cy.intercept("POST", "/api/transfers").as("transferReq");
    // Login as Alice
    cy.visit("/login");
    cy.get("input#email").type("alice@example.com");
    cy.get("input#password").type("Password1!");
    cy.contains("Submit").click();
    cy.url().should("include", "/home");

    // Navigate to Transfer page
    cy.contains("Transfer").click();

    // Enter Bob's alias and continue
    cy.get("input#alias").type("happy.mountain.002");
    cy.contains("Continue").click();

    // Enter amount and confirm
    cy.get("input#amount").type("10");
    cy.contains("Confirm").click();
    // Wait for the POST /api/transfers request to complete
    cy.wait("@transferReq");

    // Verify transfer success
    cy.contains("Transfer Sent Successfully").should("be.visible");
    cy.contains("Done").click();

    // Logout
    cy.contains("Settings").click();
    cy.contains("Logout").click();
    cy.url().should("include", "/login");

    // Login as Bob
    cy.get("input#email").type("bob@example.com");
    cy.get("input#password").type("Password2!");
    cy.contains("Submit").click();
    cy.url().should("include", "/home");

    // Navigate to Transactions page
    cy.intercept("GET", "/api/accounts/*/transactions").as("getTransactions");
    cy.contains("Transactions").click();
    // Wait for transactions to load
    cy.wait("@getTransactions");

    // Verify received transaction
    cy.contains("Received").should("exist");
  });
});
