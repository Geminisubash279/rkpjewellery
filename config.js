export const BASE_URL = "https://rkpjewellery-production.up.railway.app";

export const safeFetch = (url, options) => {
  if (!url.startsWith(BASE_URL)) {
    throw new Error("Invalid request URL");
  }
  return fetch(url, options);
};