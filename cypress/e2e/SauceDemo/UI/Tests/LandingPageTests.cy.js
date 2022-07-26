/// <reference types="cypress" />
import settings from "../../../../fixtures/settings.json";

import InventoryPage from "../PageObjects/InventoryPage";
import LoginPage from "../PageObjects/LoginPage";

describe("Landing Page Tests", () => {
  beforeEach(() => {
    LoginPage.Login(
      settings.sauce_demo.credentials.standard_user,
      settings.sauce_demo.credentials.password
    );
  });
  it("Verify default sorting on landing page", () => {
    InventoryPage.CurrentSortingField().should(
      "have.prop",
      "textContent",
      "Name (A to Z)"
    );
    const ItemNames = [];
    InventoryPage.InventoryItemNames()
      .each(($el) => {
        ItemNames.push($el.text());
      })
      .then(() => {
        ItemNames.sort();
      });
    InventoryPage.InventoryItemNames().each(($el, $index) => {
      expect($el.text()).to.equal(ItemNames[$index]);
    });
  });

  it("Verify descending sort on landing page", () => {
    InventoryPage.SortingField().select("Name (Z to A)");
    InventoryPage.CurrentSortingField().should(
      "have.prop",
      "textContent",
      "Name (Z to A)"
    );
    let ItemNames = [];
    InventoryPage.InventoryItemNames()
      .each(($el) => {
        ItemNames.push($el.text());
      })
      .then(() => {
        ItemNames.sort().reverse();
      });
    InventoryPage.InventoryItemNames().each(($el, $index) => {
      expect($el.text()).to.equal(ItemNames[$index]);
    });
  });

  it("Verify ascending price sort on landing page", () => {
    InventoryPage.SortingField().select("Price (low to high)");
    InventoryPage.CurrentSortingField().should(
      "have.prop",
      "textContent",
      "Price (low to high)"
    );
    let ItemPrices = [];
    InventoryPage.InventoryItemPrices()
      .each(($el) => {
        ItemPrices.push($el.text());
      })
      .then(() => {
        ItemPrices.sort((a, b) => a - b);
      });
    InventoryPage.InventoryItemPrices().each(($el, $index) => {
      expect($el.text()).to.equal(ItemPrices[$index]);
    });
  });

  it("Verify descending price sort on landing page", () => {
    InventoryPage.SortingField().select("Price (high to low)");
    InventoryPage.CurrentSortingField().should(
      "have.prop",
      "textContent",
      "Price (high to low)"
    );
    let ItemPrices = [];
    InventoryPage.InventoryItemPrices()
      .each(($el) => {
        ItemPrices.push($el.text());
      })
      .then(() => {
        ItemPrices.sort((a, b) => b - a);
      });
    InventoryPage.InventoryItemPrices().each(($el, $index) => {
      expect($el.text()).to.equal(ItemPrices[$index]);
    });
  });
});
