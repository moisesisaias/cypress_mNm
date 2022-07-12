/// <reference types="cypress" />
import Stopwatch from 'timer-stopwatch/lib/Stopwatch';
import settings from '../../../../fixtures/settings.json'

import InventoryPage from '../PageObjects/InventoryPage';
import LoginPage from '../PageObjects/LoginPage';


describe('Login test', () => {

    it('Logs in successfully to the web app', () => {
        LoginPage.Login(settings.sauce_demo.credentials.standard_user, settings.sauce_demo.credentials.password);
        InventoryPage.TitleField().contains('Products');
    });

    it('Locked user unable to login', () => {
        LoginPage.Login(settings.sauce_demo.credentials.locked_out_user, settings.sauce_demo.credentials.password);
        LoginPage.ErrorMsgContainer().contains('Sorry, this user has been locked out.');
        cy.url().should('eq', 'https://www.saucedemo.com/');
    });

    it('Logs in with problem user', () => {
        LoginPage.Login(settings.sauce_demo.credentials.problem_user, settings.sauce_demo.credentials.password);
        InventoryPage.TitleField().contains('Products');
        InventoryPage.InventoryItemImgs().each(($item)=>{
            cy.wrap($item).should('have.attr', 'src', '/static/media/sl-404.168b1cce.jpg');
        })
    });

    it('Logs in with performance glitch user', () => {
        // LoginPage.Login(settings.saude_demo.credentials.performance_glitch_user, settings.saude_demo.credentials.password);
        var startTime = Date.now();
        LoginPage.Navigate();
        LoginPage.UsernameInput().type(settings.sauce_demo.credentials.performance_glitch_user);
        LoginPage.PasswordInput().type(settings.sauce_demo.credentials.password);
        //start timer
        LoginPage.LoginButon().click();
        InventoryPage.TitleField().contains('Products');
        //stop timer
        var endTime = Date.now();
        cy.log(startTime);
        cy.log(endTime);
        cy.log(endTime - startTime);
        //expect that it takes 4 or more seconds
    });
});