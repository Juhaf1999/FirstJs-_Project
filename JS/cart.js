document.addEventListener("DOMContentLoaded", () =>{

    const navCart = document.querySelector("#nav-cart")
    navCart.addEventListener("click", () =>{
        window.location.href = `cart.html`
    })

    const getCartItems = () =>{
        const cartItems = localStorage.getItem("cartItem");
        const getCartItem = JSON.parse(cartItems)

        getCartItem.forEach((single) => {
            
      const newCartItems = document.querySelector(".newCartItems")
      const singleCartItem = document.createElement("div")
      singleCartItem.className = "single-cart-Item";
      singleCartItem.innerHTML = ` <div class="prod-Img">
      <img src="${single?.productImage}" alt="">
  </div>
  <div class="prod-name">${single?.ProductName}</div>
  <div class="prod-price">${single?.productPrice}$ </div>
  <div class="prod-Quantity">${single?.Quantity}</div>
  <div class="sub-total">${single?.productPrice * single?.Quantity}$</div>`

  newCartItems.appendChild(singleCartItem); 
        });
    }

    const productQuantity = ()=>{
        const qty = document.querySelector(".quantity");
        const cartItems = localStorage.getItem("cartItem");
        const getCartItem = JSON.parse(cartItems)
       // console.log(getCartItem,"getCartItem")
        const totalQuantity = getCartItem.reduce((acc,item) =>{
          return acc = acc + item.Quantity
        },0)
       // console.log(totalQuantity,"totalQuantity")
        qty.innerText = totalQuantity;
      
      };

    
    productQuantity()
    getCartItems()
})