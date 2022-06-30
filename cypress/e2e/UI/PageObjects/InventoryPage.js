/// <reference types="cypress" />

class InventoryPage {

    Navigate(){
        return cy.visit('https://www.saucedemo.com/inventory.html');
    }

    TitleField() {return cy.get('span[class="title"]');}


}
module.exports = new InventoryPage();