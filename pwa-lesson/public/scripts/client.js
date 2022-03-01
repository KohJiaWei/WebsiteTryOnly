// Your application Javascript

const getExchangeRate = async currency => {
  const fetchApi = await fetch(
    `https://api.exchangeratesapi.io/latest?base=SGD&symbols=${currency}`
  );
  const response = await fetchApi.json();
  const rate = response.rates[currency];

  return rate;
};

const updatePrices = async () => {
  //step 1: retrieve exchange rate for USD and JPY
  const usdRate = await getExchangeRate("USD");
  const jpyRate = await getExchangeRate("JPY");
  //step 2 : GET All product cards
  const productCards = document.querySelectorAll(".product-card");

  //step 3: For each product card, inject prices into the table
  productCards.forEach(card => {
    //step 3.1 get base price in SGD
    const productPriceSGD = Number(card.dataset.price);
    //step 3.2 compute the price for usd and jpy
    const productPriceUSD = productPriceSGD * usdRate;
    const productPriceJPY = productPriceSGD * jpyRate;

    //step 3.3 inject the prices into the table;
    card.querySelector(".productprice-sgd").innerHTML = `$${productPriceSGD}`;
    card.querySelector(
      ".productprice-usd"
    ).innerHTML = `$${productPriceUSD.toFixed(2)}`;
    card.querySelector(
      ".productprice-jpy"
    ).innerHTML = `¥${productPriceJPY.toFixed(0)}`;
  });
};

document.addEventListener("DOMContentLoaded", async () => {
  await updatePrices();
});
