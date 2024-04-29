 

const BASE_URL = "https://fakestoreapi.com/";

document.addEventListener("DOMContentLoaded", () =>{

const url = new URL(window.location.href)
const ProductID = url.searchParams.get("product-id")

const navCart = document.querySelector("#nav-cart")
    navCart.addEventListener("click", () =>{
        window.location.href = `cart.html`
    
    })


const addtoCart = (prod)=>{
   const navCart = document.querySelector("#nav-cart");

  const existingItem = localStorage.getItem("cartItem");
  //console.log(convertItems,"convertItems")

    const cartArray =JSON.parse(existingItem) || [];

    const isExist = cartArray.some((singleItem) =>{
      return singleItem.productID===prod.id;
    })
    //console.log(cartArray,"cartArray")
    if(isExist){
      //console.log("Index",prod.id)
      const index = cartArray.findIndex((itemIndex) =>{
        if(itemIndex.productID === prod.id){
          return itemIndex;
        }
      });
      cartArray[index].Quantity +=1
      localStorage.setItem("cartItem", JSON.stringify(cartArray))
      //console.log(cartArray,"Quantity")
      productQuantity()
    }
    else{
      const prodObj = {
        productID:prod.id,
        ProductName:prod.title,
        productCategory:prod.category,
        productPrice:prod.price,
        Quantity:1,
        productImage:prod.image,
    };
     cartArray.push(prodObj);
    
    localStorage.setItem("cartItem", JSON.stringify(cartArray))
    productQuantity()
   

    };
    
   
};
const getProductByID = (ProductID) =>{

    const singleProductCart = document.querySelector(".single-product-cart")
    fetch(BASE_URL + "products/" + ProductID).then((res) =>{
        res.json().then((data) =>{
            //console.log(data, "Data")

            singleProductCart.innerHTML = `<div class="product-img-wrapper">
            <img src="${data?.image}"  alt="">
            <div class="product-category">${data?.category}</div>
          </div>
          <div class="Product-detail-wrapper">
            <div class="product-name">${data?.title}</div>
            <hr>
            <div class="product-description">${data?.description}</div>
            
            <div class="product-price-rating-wrapper">
              <div class="product-price">${data?.price}$</div>
              <div class="product-rate">${data?.rating?.rate}* (${data?.rating?.count})</div>
            </div>
            <div class="product-cart-button">
            <button class="cart-btn" id="addToCart">Add to Cart</button>
            <button class="cart-btn">Buy Now</button>
            </div>
          </div>`
          const addToCartBtn = document.querySelector("#addToCart");
          addToCartBtn.addEventListener("click",() =>{
            addtoCart(data)
           
          });
         
        });
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

}
getProductByID(ProductID)
productQuantity()
})
