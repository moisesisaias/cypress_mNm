/// <reference types="cypress" />
import * as settings from "../../../../fixtures/settings.json";
import { Product } from "../Interfaces/Product";
import { CartPage } from "../PageObjects/CartPage";
import { LoginPage } from "../PageObjects/LoginPage";
import Shared from "../PageObjects/Shared";
import { getItemLinkId, getItemPriceAlias } from "../Utils/Common";

describe("Cart tests container", () => {
  // using 2 describe() functions to avoid
  // where aliases are wiped out after every test
  before(() => {
    const sauceDemo = Cypress.env("sauce_demo");
    cy.wrap(sauceDemo.test_item1).as("item1");
    cy.wrap(sauceDemo.test_item2).as("item2");
  });

  describe("Cart page tests", function () {
    before(function () {
      cy.get("@item1").then(() => {
        expect(this.item1)
          .to.exist.and.be.an("object")
          .that.has.all.keys("name", "id");
        expect(this.item2)
          .to.exist.and.be.an("object")
          .that.has.all.keys("name", "id");
      });
    });

    beforeEach(function () {
      LoginPage.Login(
        settings.sauce_demo.credentials.standard_user,
        settings.sauce_demo.credentials.password
      );
    });

    it("should be able to navigate cart page", () => {
      CartPage.Navigate();
      // check URL
      cy.url().should("eq", `${settings.sauce_demo.url}cart.html`);
      // check title
      Shared.TitleField().should("have.text", "Your Cart");
    });

    it("should be able to navigate cart page by cart button", () => {
      Shared.CartLink().click();
      // check URL
      cy.url().should("eq", `${settings.sauce_demo.url}cart.html`);
      // check title
      Shared.TitleField().should("have.text", "Your Cart");
    });

    it("cart is empty by default.", () => {
      CartPage.Navigate();
      // check there are no items in cart
      CartPage.CartItems().should("have.length", 0);
    });

    it("continue shopping return site to inventory page", () => {
      CartPage.Navigate();
      // click continue shopping button
      CartPage.ContinueShoppingButton().click();
      // check URL
      cy.url().should("eq", `${settings.sauce_demo.url}inventory.html`);
    });

    it("items added to cart should show up on cart page", function () {
      // add items and create aliases with their price
      addItemToCartAndCapturePrice(this.item1);
      addItemToCartAndCapturePrice(this.item2);

      CartPage.Navigate();
      // check items by looking up their links and checking their
      // name and price
      checkCartItem(0, this.item1);
      checkCartItem(1, this.item2);
    });

    it("cart badge should show current amount of items", function () {
      Shared.ItemAddButton(this.item1.name).click();
      addItemToCartAndCapturePrice(this.item2);
      CartPage.Navigate();

      Shared.CartLinkBadge().should("have.text", 2);
      Shared.ItemRemoveButton(this.item1.name).click();
      Shared.CartLinkBadge().should("have.text", 1);

      checkCartItem(0, this.item2);
    });

    it("should navigate to checkout", function () {
      Shared.ItemAddButton(this.item2.name).click();

      CartPage.Navigate();

      CartPage.CheckoutButton().click();

      cy.url().should("eq", `${settings.sauce_demo.url}checkout-step-one.html`);
      Shared.TitleField().should("have.text", "Checkout: Your Information");
    });

    it("should be able to remove items from cart", function () {
      // add items to cart
      Shared.ItemAddButton(this.item2.name).click();
      Shared.ItemAddButton(this.item1.name).click();

      CartPage.Navigate();
      Shared.CartLinkBadge().should("have.text", 2);
      CartPage.CartItems().should("have.length", 2);
      // remove item 2
      Shared.ItemRemoveButton(this.item2.name).click();

      Shared.CartLinkBadge().should("have.text", 1);
      CartPage.CartItems().should("have.length", 1);
      // should have item1
      checkCartItem(0, this.item1, false);
    });
  });
});

/**
 * Captures the price of an item and add it to the cart.
 * @param item
 */
function addItemToCartAndCapturePrice(item: Product) {
  Shared.ItemAddButton(item.name).then((button) => {
    cy.get(".inventory_item_price", { withinSubject: button.parent() })
      .invoke("text")
      .as(getItemPriceAlias(item.id));

    cy.wrap(button).click();
  });
}

/**
 * Validates item in the cart with the provided `index`
 * and then check it has the provide item.id, item.name and price
 * @param index
 * @param item
 * @param checkPrice
 */
function checkCartItem(
  index: number,
  item: Product,
  checkPrice: boolean = true
): void {
  let price: string = null;
  if (checkPrice) {
    cy.get<string>("@" + getItemPriceAlias(item.id)).then(
      ($itemPrice) => (price = $itemPrice)
    );
  }

  CartPage.CartItems()
    .eq(index)
    .should("exist")
    .within(() => {
      cy.get(getItemLinkId(item.id)).should("exist").contains(item.name);
      if (checkPrice) {
        cy.get(".inventory_item_price").should("exist").contains(price);
      }
    });
}
