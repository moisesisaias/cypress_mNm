import {
  getAddItemToCartButtonId,
  getItemLinkId,
  getRemoveItemToCartButtonId,
} from "../Utils/Common";

export class Common {
  ItemButtons() {
    return cy.get("button.btn.btn_inventory");
  }

  TitleField() {
    return cy.get('span[class="title"]');
  }

  ItemAddButton(itemName: string) {
    return cy.get(getAddItemToCartButtonId(itemName));
  }

  ItemRemoveButton(itemName: string) {
    return cy.get(getRemoveItemToCartButtonId(itemName));
  }

  ItemLink(itemId: number) {
    return cy.get(getItemLinkId(itemId));
  }

  CartLink() {
    return cy.get("#shopping_cart_container > a.shopping_cart_link");
  }

  CartLinkBadge() {
    return this.CartLink().within(() => cy.get("span.shopping_cart_badge"));
  }
}

export const Shared = new Common();
export default Shared;
