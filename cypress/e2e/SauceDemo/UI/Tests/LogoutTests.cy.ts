/// <reference types="cypress" />
import * as settings from "../../../../fixtures/settings.json";

import { InventoryPage } from "../PageObjects/InventoryPage";
import { LoginPage } from "../PageObjects/LoginPage";

describe("Logout Test", () => {
  it("should log out a regular user", () => {
    LoginPage.Login(
      settings.sauce_demo.credentials.standard_user,
      settings.sauce_demo.credentials.password
    );
    cy.url().should("eq", `${settings.sauce_demo.url}inventory.html`);
    InventoryPage.Logout();
    cy.url().should("eq", settings.sauce_demo.url);

    LoginPage.LoginButton().click();

    LoginPage.UsernameInput()
      .should("have.class", "input_error")
      .and("have.class", "form_input")
      .and("have.class", "error");
    LoginPage.PasswordInput()
      .should("have.class", "input_error")
      .and("have.class", "form_input")
      .and("have.class", "error");

    LoginPage.ErrorMsgContainer().contains(
      "Epic sadface: Username is required"
    );
  });
});
