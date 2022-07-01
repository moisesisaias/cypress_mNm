/// <reference types="cypress" />

import InventoryPage from '../PageObjects/InventoryPage';
import LoginPage from '../PageObjects/LoginPage';

describe('Login test', () => {

    it('Logs in successfully to the web app', () => {
        LoginPage.Login('standard_user', 'secret_sauce');
        InventoryPage.TitleField().contains('Products');
    });

    it('Locked user unable to login', () => {
        LoginPage.Login('locked_out_user', 'secret_sauce');
        LoginPage.ErrorMsgContainer().contains('Sorry, this user has been locked out.');
        cy.url().should('eq', 'https://www.saucedemo.com/');
    });
});