/// <reference types="cypress" />
import settings from '../../../../fixtures/settings.json'

class InventoryPage {

    Navigate(){
        return cy.visit(`${settings.sauce_demo.url}/inventory.html`);
    }

    TitleField() {return cy.get('span[class="title"]');}
    InventoryItemImgs() {return cy.get('img[class="inventory_item_img"]');}

}
module.exports = new InventoryPage();