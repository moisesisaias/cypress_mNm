/// <reference types="cypress" />
import * as settings from "../../../../fixtures/settings.json";

import { InventoryPage } from "../PageObjects/InventoryPage";
import { LoginPage } from "../PageObjects/LoginPage";

describe("Login test", () => {
  it("Logs in successfully to the web app", () => {
    LoginPage.Login(
      settings.sauce_demo.credentials.standard_user,
      settings.sauce_demo.credentials.password
    );
    InventoryPage.TitleField().contains("Products");
  });

  it("Locked user unable to login", () => {
    LoginPage.Login(
      settings.sauce_demo.credentials.locked_out_user,
      settings.sauce_demo.credentials.password
    );
    LoginPage.ErrorMsgContainer().contains(
      "Sorry, this user has been locked out."
    );
    cy.url().should("eq", "https://www.saucedemo.com/");
  });

  it("Logs in with problem user", () => {
    LoginPage.Login(
      settings.sauce_demo.credentials.problem_user,
      settings.sauce_demo.credentials.password
    );
    InventoryPage.TitleField().contains("Products");
    InventoryPage.InventoryItemImgs().each(($item) => {
      cy.wrap($item).should(
        "have.attr",
        "src",
        "/static/media/sl-404.168b1cce.jpg"
      );
    });
  });

  it("Logs in with performance glitch user", () => {
    LoginPage.Login(
      settings.sauce_demo.credentials.performance_glitch_user,
      settings.sauce_demo.credentials.password
    );
    const startTime = performance.now();
    cy.log("Start time: " + startTime);
    InventoryPage.TitleField().then(($titleField) => {
      const endTime = performance.now();
      cy.wrap($titleField).contains("Products");
      cy.log("End time: " + endTime);
      const elapsedTimeMs = endTime - startTime;
      cy.log("Elapsed time (ms): " + elapsedTimeMs);
      cy.wrap(elapsedTimeMs).should("be.at.least", 4000);
    });
  });
});
