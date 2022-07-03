/// <reference types="cypress" />
import settings from '../../../../fixtures/settings.json'

import InventoryPage from '../PageObjects/InventoryPage';
import LoginPage from '../PageObjects/LoginPage';


describe('Login test', () => {

    it('Logs in successfully to the web app', () => {
        LoginPage.Login(settings.saude_demo.credentials.standard_user, settings.saude_demo.credentials.password);
        InventoryPage.TitleField().contains('Products');
    });

    it('Locked user unable to login', () => {
        LoginPage.Login(settings.saude_demo.credentials.locked_out_user, settings.saude_demo.credentials.password);
        LoginPage.ErrorMsgContainer().contains('Sorry, this user has been locked out.');
        cy.url().should('eq', 'https://www.saucedemo.com/');
    });
});