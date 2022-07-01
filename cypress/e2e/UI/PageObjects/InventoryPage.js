/// <reference types="cypress" />
import settings from '../../../fixtures/settings.json'

class InventoryPage {

    Navigate(){
        return cy.visit(`${settings.cypress_example_url}/inventory.html`);
    }

    TitleField() {return cy.get('span[class="title"]');}


}
module.exports = new InventoryPage();