/// <reference types="cypress" />
import * as settings from "../../../../fixtures/settings.json";
import { CartPage } from "../PageObjects/CartPage";
import { InventoryPage } from "../PageObjects/InventoryPage";
import { LoginPage } from "../PageObjects/LoginPage";

describe("Cart page tests", () => {
  beforeEach(() => {
    LoginPage.Login(
      settings.sauce_demo.credentials.standard_user,
      settings.sauce_demo.credentials.password
    );
  });

  it("should be able to navigate cart page", () => {
    CartPage.Navigate();
    cy.url().should("eq", `${settings.sauce_demo.url}cart.html`);
    CartPage.TitleField().should("have.text", "Your Cart");
  });

  it("should be able to navigate cart page by cart button", () => {
    InventoryPage.CartAnchor().click();
    cy.url().should("eq", `${settings.sauce_demo.url}cart.html`);
    CartPage.TitleField().should("have.text", "Your Cart");
  });

  it("cart is empty by default.", () => {
    CartPage.Navigate();
    CartPage.CartItems().should("have.length", 0);
  });

  it("continue shopping return site to inventory page", () => {
    CartPage.Navigate();
    CartPage.ContinueShoppingButton().click();
    cy.url().should("eq", `${settings.sauce_demo.url}inventory.html`);
  });
});
