/// <reference types="cypress" />

import settings from '../../../../fixtures/settings.json'

class LoginPage {

    Navigate(){
        return cy.visit(settings.saude_demo.url);
    }

    UsernameInput() {return cy.get('#user-name');}

    PasswordInput() {return cy.get('#password');}

    LoginButon() {return cy.get('#login-button');}

    ErrorMsgContainer() {return cy.get('.error-message-container');}

    Login(username, password){
        this.Navigate();
        this.UsernameInput().type(username);
        this.PasswordInput().type(password);
        this.LoginButon().click();
    }

}
module.exports = new LoginPage();