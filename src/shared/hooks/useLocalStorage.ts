import { v4 as uuidv4 } from "uuid";
import { useSyncExternalStore } from "react";

function getBasketId() {
  let id = localStorage.getItem("basketId");
  if (!id) {
    id = uuidv4();
    localStorage.setItem("basketId", id);
  }
  return id;
}

// بتسمع للتغييرات
// netlify react to re-render if change
// empty for my case i need id just when i call so React will just read the value one time
function subscribe() {
  return () => {}; // No-op subscribe local storage do reactive
}

export function useBasketId() {
  return useSyncExternalStore(subscribe, getBasketId);
  // subscript for if changing happen call react for decide if need re-render” -- getBasket  tell react what is the value in external store
}
