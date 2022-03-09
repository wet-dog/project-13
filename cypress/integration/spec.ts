/// <reference types="cypress" />


function getPasswordControl() {
    return cy.get("[data-testid=PasswordControl]");
}

function getPasswordInput() {
    return getPasswordControl().react("input");        
}

function getEmailControl() {
    return cy.get("[data-testid=EmailControl]");
}

function getEmailInput() {
    return getEmailControl().react("input");        
}


describe("Sign in tests", () => {

    before(() => {
        cy.visit("/");
        cy.waitForReact(1000, "#root"); // 1000 is the timeout in milliseconds, you can provide as per AUT
    });

    it("displays choose an email error", () => {
        cy.get("[data-testid=SignInButton]").click();

        cy.get("[data-testid=EmailErrorMessage")
            .contains("Choose an email address")
            .should("exist");
    });

    it("displays password too short error", () => {
        getPasswordInput().type("invalid");

        cy.get("[data-testid=SignInButton]").click();

        cy.get("[data-testid=PasswordErrorMessage")
            .contains("Use 8 characters or more for your password")
            .should("exist");
    });

    it("navigates to donor screen on valid donor account details", () => {
        getEmailInput().clear();
        getPasswordInput().clear();

        getEmailInput().type("donor@gmail.com");
        getPasswordInput().type("password123");
        cy.get("[data-testid=SignInButton]").click();

        cy.getReact("Donor").should("exist");
    });

    it("navigates to staff screen on valid staff account details", () => {
        cy.visit("/");
        cy.waitForReact(1000, "#root");

        getEmailInput().clear();
        getPasswordInput().clear();

        getEmailInput().type("bathstaff@gmail.com");
        getPasswordInput().type("password123");
        cy.get("[data-testid=SignInButton]").click();

        cy.getReact("Staff").should("exist");
    });
});


describe("Staff screen tests", () => {

    it("tab navigates to profile screen", () => {
        cy.get('[href="/Staff/Profile"]').click();
        cy.getReact("BankProfile").should("exist");
    });

    it("tab navigates to food list screen", () => {
        cy.get('[href="/Staff/Requests"]').click();
        cy.getReact("Staff").should("exist");
    });

    it("displays an add food component", () => {
        cy.get("[data-testid=AddFoodButton]").click();
        cy.getReact("CreateFood").should("exist");
    });

    it("adds a new food", () => {
        cy.react("CreateFood").find("input").type("banana");
        cy.react("CreateFood").react("Pressable").click();
        // Check length of list/ that food in list
    });

    it("deletes a food", () => {
        cy.get("[data-testid=DeleteButton]").eq(-1).click({ force: true });
    });

});


// describe("", () => {

//     it("displays an add food item", () => {
//         cy.visit("/");
//         cy.waitForReact(1000, "#root");
        
//         getEmailInput().type("donor@gmail.com");
//         getPasswordInput().type("password123");
//         cy.get("[data-testid=SignInButton]").click();        
//     });

// });

