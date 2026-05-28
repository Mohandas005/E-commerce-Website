// category open and close

function listShow(event){
    event.stopPropagation();
    let list = document.getElementById("itemContainer");
    if(list.classList.contains("hidden")){
        list.classList.replace("hidden","show");
    }
    else{
        list.classList.replace("show","hidden");
    }
}

window.addEventListener("click", function(event){
    let list = document.getElementById("itemContainer");
    let maaru = document.querySelector(".itemList"); 

    if(list.classList.contains("show")){
        if(!maaru.contains(event.target) && !list.contains(event.target)){
            list.classList.replace("show","hidden");
        }
    }
});

//CART SHOW AND HIDE
function cartShow(event){
    event.stopPropagation();
    let cart = document.getElementById("cart-container");
    if(cart.classList.contains("cartHidden")){
       cart.classList.replace("cartHidden","cart");
    }
    else{
        cart.classList.replace("cart","cartHidden");
    }
}

//add to cart
let cartItems = []
function addToCart(image, name, price) {
    alert("Product Added")
    let existingItem = cartItems.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        let product = {
            image: image,
            name: name,
            price: price,
            quantity:"1"
        };
        cartItems.push(product);
    }
    displayCart();
}
function displayCart() {
    let cartContainer = document.getElementById("cart-container");
    if(cartItems.length ===0){
        cartContainer.innerHTML = `
        <h2 class="cart-head">YOUR CART ITEMS</h2>
        <i class="fa-solid fa-xmark" onclick="cartShow(event)" id="cartx"></i>
        <p class="empty">Your Cart Is Empty</p>`
      return;
    }
    cartContainer.innerHTML = `
    <h2 class="cart-head">YOUR CART ITEMS</h2>
    <i class="fa-solid fa-xmark" onclick="cartShow(event)" id="cartx"></i>`;

    //grand total calculation
    let grandTotal= 0;
    cartItems.forEach((item,index) => {
        grandTotal += item.price * item.quantity;
        cartContainer.innerHTML += `
        <div class="cart-portion">
            <div class="cart-item">
                <img src="${item.image}" class="cart-img">
                <div class="cart-product">
                    <p class="cart-product-name">${item.name}</p>
                    <div class="cart-dts">
                        <p class="cart-price">₹${item.price}</p>
                        <div class="cart-price-dts">
                            <div class="cart-qty">
                                <span class="qty">Qty:${item.quantity}</span>
                                <div class="qty-up-down">
                                    <i class="fa-solid fa-caret-up" onclick="qtyIncrease(${index})"></i>
                                    <i class="fa-solid fa-caret-down"onclick="qtyDecrease(${index})"></i>
                                </div>
                            </div>
                            <span class="p-total-price">Total:₹${item.price * item.quantity}</span>
                        </div>
                    </div>
                </div>
                <div class="c-trash">
                    <i class="fa-solid fa-trash" id="cart-trash" onclick="removeProduct(${index})"></i>
                </div>
            </div>
        </div>`;
    })

cartContainer.innerHTML +=`
        <div class="g-total">
             <p class="grandTotal">Grand Total<br>₹${grandTotal}</p>
             <button class="orderBtn" onClick="ordered()">Place Order</button>
        </div>`
}
function ordered(){
    alert("Order Placed")
     let cartContainer = document.getElementById("cart-container");
        cartContainer.innerHTML = `<h2 class="cart-head">YOUR CART ITEMS</h2>
    <i class="fa-solid fa-xmark" onclick="cartShow(event)" id="cartx"></i>
    <p class="empty">Your Cart Is Empty</p>`;
}
function qtyIncrease(index){
    cartItems[index].quantity++
    displayCart()
}
function qtyDecrease(index){
    if(cartItems[index].quantity >1){
    cartItems[index].quantity--
    }else{
        removeProduct(index)
    }
    displayCart()
}
 function removeProduct(index){
        cartItems.splice(index,1);
        displayCart();
}
 function removeWishlistProduct(index){
        wishlistItems.splice(index,1);
        displayWishlist();
}
function wishlistShow(event){
    event.stopPropagation();
    let wishlist = document.getElementById("wishlistContainer");
    if(wishlist.classList.contains("wishlistHidden")){
        wishlist.classList.replace("wishlistHidden","wishlistShow");
    }
    else{
        wishlist.classList.replace("wishlistShow","wishlistHidden");
    }
}

let wishlistItems =[];
function addToWishlist(image, name, price,icon) {
    // alert("Product Added")
    icon.style
    let existingItem = wishlistItems.find(item => item.name === name);

    if (existingItem) {
        existingItem.none
    } else {
        let product = {
            image: image,
            name: name,
            price: price,
            icon: icon
        };
        wishlistItems.push(product);
    }
    displayWishlist();
}

//display wishlist
function displayWishlist() {
    let wishlistContainer = document.getElementById("wishlistContainer");
    if(wishlistItems.length === 0){
        wishlistContainer.innerHTML = `
        <h2 class="cart-head">YOUR WHISHLIST ITEMS</h2>
        <i class="fa-solid fa-xmark" onclick="wishlistShow(event)" id="wishlistx"></i>
        <p class="empty">Your List Is Empty</p>`
        return;
    }
    wishlistContainer.innerHTML = `
    <div class="wishlist-head">
        <h2 class="cart-head">YOUR WISHLIST ITEMS</h2>
    </div>
    <div class="xmark">
        <i class="fa-solid fa-xmark" onclick="wishlistShow(event)" id="wishlistx"></i>
    </div>`;
   wishlistItems.forEach((item,index) => {
        wishlistContainer.innerHTML += `
            <div class="wishlist-items">
                <div class="wishlist-img">
                    <img src="${item.image}" class="wishlist_imgs">
                </div>
                <div class="wishlist-product">
                    <p class="wishlist-product-name">${item.name}</p>
                    <div class="wishlist-price">
                        <p class="wishlist-price-text">₹${item.price}</p>
                        <i class="fa-solid fa-shopping-bag" onclick="addToCart('${item.image}','${item.name}',${item.price})"></i>
                    </div>
                </div>
                <div class="wishlistTrash" onclick="removeWishlistProduct(${index})">
                    <i id="w-trash" class="fa-solid fa-trash"></i>
                </div>
                </div>
            </div>`;
    })
}
