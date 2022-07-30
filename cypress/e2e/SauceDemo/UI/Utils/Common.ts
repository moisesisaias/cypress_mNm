export function getItemPriceAlias(itemId: number) {
  return `item${itemId}Price`;
}

export function getAddItemToCartButtonId(itemName: string) {
  return "#add-to-cart-" + formatItemName(itemName);
}

export function getRemoveItemToCartButtonId(itemName: string) {
  return "#remove-" + formatItemName(itemName);
}

function formatItemName(itemName: string) {
  return itemName?.toLowerCase().replace(/ /g, "-") ?? "";
}

export function getItemLinkId(itemId: number) {
  return `#item_${itemId}_title_link`;
}
