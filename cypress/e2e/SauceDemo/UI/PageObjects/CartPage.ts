/// <reference types="cypress" />
import * as settings from "../../../../fixtures/settings.json";

export class Cart {
  Navigate() {
    return cy.visit(`${settings.sauce_demo.url}?/cart.html`);
  }

  CartItems() {
    return cy.get('div[class="cart_item"]');
  }

  ContinueShoppingButton() {
    return cy.get("#continue-shopping");
  }

  CheckoutButton() {
    return cy.get("#checkout");
  }
}

export const CartPage = new Cart();
