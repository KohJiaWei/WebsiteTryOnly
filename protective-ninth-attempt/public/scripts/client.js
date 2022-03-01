// Your application Javascript
document.addEventListener("DOMContentLoaded", async () => {
  await initDatabase();
  makeAddToCartBtnsClickable();
});

//get exchange rate for a given currency
const getExchangeRate = async (currency) =>{
  const fetchApi = await fetch(`https://api.exchangeratesapi.io/latest?base=SGD&symbols=${currency}`);
  const response = await fetchApi.json();
  const rate = response.rates[currency];
  
  return rate;
}

const updatePrices = async () => {
  //Step 1: Retrieve foreign exchange rate for USD and JPY
  const usdRate = await getExchangeRate('USD');  
  const jpyRate = await getExchangeRate('JPY');
  
  //Step 2: Select all Product Cards
  const productCards = document.querySelectorAll('.product-card');
  
  //Step 3: For each of the product cards, inject the prices into the table
  productCards.forEach((card) => {
    //Step 3.1: get the base price in Singapore dollars
    const productPriceSgd = Number(card.dataset.price);
        
    //Step 3.2: Compute the price for USD and JPY 
    const productPriceUSD = productPriceSgd * usdRate;
    const productPriceJPY = productPriceSgd * jpyRate;
    
    
    //Step 3.3: Inject the prices into the table
    card.querySelector('.price-sgd').innerHTML = `$${productPriceSgd}`;
    card.querySelector('.price-usd').innerHTML = `$${productPriceUSD.toFixed(2)}`;
    card.querySelector('.price-jpy').innerHTML = `¥${productPriceJPY.toFixed(0)}`;
    
  })
  
}

const initDatabase = async () => {
  await localforage.config({
    driver: localforage.INDEXEDDB, // Force INDEXEDDB; same as using setDriver()
    name: "my-cake-shop-db",
    version: 1.0,
    storeName: "cake_shop_app", // Should be alphanumeric, with underscores.
    description: "IndexedDB Store for our Cake Shop"
  });
  
  await localforage.getItem("shopping-cart");
};

const makeAddToCartBtnsClickable = () => {
  //Step 1: get All product cards
 const productCards = document.querySelectorAll(".product-card");
  
  
  //Step 2: for each of the product cards, make the add to cart button clickable
  productCards.forEach(card => {
    const addToCartBtn = card.querySelector(".add-to-cart-btn");
    
    
    addToCartBtn.addEventListener("click", async () =>{
      //Step 2.1: Construct an object representing the product containing the price and name
      const productName = card.dataset.productname;
      const price = Number(card.dataset.price);
      
      const productData = {name: productName, price: price};
      
      
      //Step 2.2: update the cart with our product data
      await updateCart(productData);
      
      //Step 2.3: Show an alert box to the user
      alert("you have added an item into the cart!");
      
    })    
  })
}

const updateCart = async (productData) => {
  //Step 1: get shopping cart from INDEXEDDB
  const shoppingCart = await getShoppingCart();
  
  //Step 2: add the product to the shopping cart
  shoppingCart.push(productData);
  
  await localforage.setItem("shopping-cart" , shoppingCart);
  
  //Step 3: update the cart badge count
  await updateCartBadgeCount();
}

const updateCartBadgeCount = async () =>{
  //Step 1: get shopping cart from INDEXEDDB
  const shoppingCart = await getShoppingCart();
  
  //Step 2: Get the number of items in the shopping cart
  const numberOfItemsInCart = shoppingCart.length;
  
  //Step 3: get all the badges
  const badges = document.querySelectorAll(".cart-badge");
  
  //Step 4: for each badge, inject the number of items
  badges.forEach(badge => {
    badge.innerHTML = numberOfItemsInCart;
    
  })
  
}

//retrieve shopping cart from indexedDB
const getShoppingCart = async () =>{
  let shoppingCart = await localforage.getItem("shopping-cart");
  
  if(shoppingCart === null){
    shoppingCart = [];
        
  }
  
  return shoppingCart;
  
}