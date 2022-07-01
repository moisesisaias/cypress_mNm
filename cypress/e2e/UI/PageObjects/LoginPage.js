/// <reference types="cypress" />

class LoginPage {

    // elements = {
    //     UsernameInput: () => cy.get('#user-name'),
    //     PasswordInput: () => cy.get('#password'),
    //     LoginButton: () => cy.get('#login-button'),
    // }

    Navigate(){
        return cy.visit('https://www.saucedemo.com/');
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