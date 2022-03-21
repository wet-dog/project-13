/// <reference types="cypress" />
import { getAuth, deleteUser, onAuthStateChanged, updateCurrentUser } from "firebase/auth";
import { doc, deleteDoc, query, collection, getDocs, where } from "firebase/firestore";
import { db } from "../../src/utils/firebase";
import { auth } from "../../src/utils/registration";

describe("Sign up tests", () => {

    before(() => {
        auth.signOut();
        cy.visit("/");
        cy.waitForReact(1000, "#root"); // 1000 is the timeout in milliseconds, you can provide as per AUT
    });

    it("navigates to sign up screen", () => {
        cy.get("[data-testid=SignUpLink]").click();
        cy.getReact("SignUpScreen").should("exist");
    });

    it("displays choose an email error", () => {
        cy.get("[data-testid=SignUpButton]").click();

        cy.get("[data-testid=EmailErrorMessage")
            .contains("Choose an email address")
            .should("exist");
    });

    it("displays password too short error", () => {
        cy.get("[data-testid=SignUpButton]").click();

        cy.get("[data-testid=PasswordErrorMessage")
            .should('have.text', "Use 8 characters or more for your password");
    });

    it("displays passwords do not match error", () => {
        cy.get("[data-testid=PasswordInput]").type("password123");
        cy.get("[data-testid=ConfirmationInput]").type("password1234");

        cy.get("[data-testid=SignUpButton]").click();

        cy.get("[data-testid=ConfirmationErrorMessage")
            .should('have.text', "Those passwords didn't match. Try again.");
    });

    it("signs up a donor with valid details", () => {
        cy.get("[data-testid=EmailInput]").clear().type("endtoend@gmail.com");
        cy.get("[data-testid=PasswordInput]").clear().type("password123");
        cy.get("[data-testid=ConfirmationInput]").clear().type("password123");
        
        cy.get("[data-testid=DonorSelect]").type("donor", {force:true});

        cy.get("[data-testid=SignUpButton]").click();
        cy.get("[data-testid=SignInButton]").should('be.visible');

        // Delete test user account after sign up
        onAuthStateChanged(auth, user => {
            if (user != null && user.email === "endtoend@gmail.com") {
                deleteUser(user!)
                    .then(() => console.log("Deleted test user. " + user.email))
                    .catch((error) => console.log(error));

                console.log("TYHAUSDAISDIASDISADIDI");

                async function deleteUserDb() {
                    const q = query(collection(db, "users"), where("email", "==", "endtoend@gmail.com"));
                    
                    const querySnapshot = await getDocs(q);
                    querySnapshot.forEach(async (doc) => {
                        await deleteDoc(doc.ref);
                        console.log("Deleted user db");
                    });
                }

                deleteUserDb();
            }
        });

    });

});
