/// <reference types="cypress" />

import * as settings from "../../../../fixtures/settings.json";

export class Login {
  Navigate() {
    return cy.visit(settings.sauce_demo.url);
  }

  UsernameInput() {
    return cy.get("#user-name");
  }

  PasswordInput() {
    return cy.get("#password");
  }

  LoginButon() {
    return cy.get("#login-button");
  }

  ErrorMsgContainer() {
    return cy.get(".error-message-container");
  }

  Login(username, password) {
    this.Navigate();
    this.UsernameInput().type(username);
    this.PasswordInput().type(password);
    this.LoginButon().click();
  }
}
export const LoginPage = new Login();
