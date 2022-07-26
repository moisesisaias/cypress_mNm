/// <reference types="cypress" />
import settings from "../../../../fixtures/settings.json";

class InventoryPage {
  Navigate() {
    return cy.visit(`${settings.sauce_demo.url}/inventory.html`);
  }

  TitleField() {
    return cy.get('span[class="title"]');
  }

  MenuButton() {
    return cy.get("#react-burger-menu-btn");
  }

  InventoryItemImgs() {
    return cy.get('img[class="inventory_item_img"]');
  }

  InventoryItemNames() {
    return cy.get('div[class="inventory_item_name"]');
  }

  CurrentSortingField() {
    return cy.get('span[class="active_option"]');
  }

  SortingField() {
    return cy.get('select[class="product_sort_container"]');
  }

  InventoryItemPrices() {
    return cy.get('div[class="inventory_item_price"]');
  }

  LogoutAnchor() {
    return cy.get("#logout_sidebar_link");
  }

  Logout() {
    this.MenuButton().click();
    this.LogoutAnchor().click();
  }
}
module.exports = new InventoryPage();
