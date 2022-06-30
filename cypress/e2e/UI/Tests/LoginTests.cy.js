/// <reference types="cypress" />

import LoginPage from '../PageObjects/LoginPage';

describe('Login test', () => {

    it('Logs in successfully to the web app', () => {
        
        LoginPage.Navigate();
        LoginPage.UsernameInput().type('standard_user');
        LoginPage.PasswordInput().type('secret_sauce');
        LoginPage.LoginButon().click();
        
    });
});