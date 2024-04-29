


const BASE_URL = "https://fakestoreapi.com/";

document.addEventListener("DOMContentLoaded", () =>{

    const allProduct = document.querySelector("#all-Products")
    allProduct.addEventListener("click",() =>{
        getAllProducts()
    })

    const navCart = document.querySelector("#nav-cart")
    navCart.addEventListener("click", () =>{
        window.location.href = `cart.html`
    
    })

    const getCategory = () =>{
        fetch(BASE_URL + "products/categories").then((response) =>{
           const categoryElement = document.querySelector(".category-list")
            response.json().then((catesdata) =>{
                //console.log(catesdata,"catsDATA")
                catesdata.forEach((singleData) => {
            const singleCategory = document.createElement('div')
            singleCategory.className = "singele-category";
            singleCategory.innerText = singleData;
            singleCategory.addEventListener("click", () =>{
                getProductCategory(singleData)
            })

            categoryElement.appendChild(singleCategory);
                });
            })
        })
    
        // const category = async () =>{
        // const menu = await fetch(BASE_URL + "products/categories")
        // menu.json().then((final) =>{
        //     console.log(final,"final")
        // })
        
        // }
    
        // category()
    }

    const getAllProducts = () =>{

        const singleProductWrapper = document.querySelector(".singleProduct-wrapper")
        const singleProductElement = document.querySelectorAll(".single-product")
        const sowingCategory = document.querySelector("#showing-category")

        singleProductElement.forEach((singleremove) =>{
            singleremove.remove();
        })
        sowingCategory.style. textTransform = "capitalize"
        sowingCategory.innerText = "All"

        fetch(BASE_URL + "products/").then((res) =>{
            res.json().then((productsData) =>{
               // console.log(productsData);

                productsData.forEach((singleProducts) =>{
                const singleProductElement = document.createElement("div")
               
                singleProductElement.className = "single-product";
                singleProductElement.innerHTML = `<div class="img-wrapper">
                <img src= ${singleProducts?.image}
             alt=""
             class="single-product-img"
             />
            </div>
             <div class="prod-name">${singleProducts?.title}</div>
             <div class="prod-price">${singleProducts?.price}$</div>
             <div class="prod-rate">${singleProducts?.rating?.rate} Stars (${singleProducts?.rating?.count})</div>`

             singleProductElement.addEventListener("click", () =>{
              //  console.log("Is Clicked?")
              //  console.log("Is Clicked?" ,  singleProducts.id)
              window.location.href = `singleProduct.html?product-id=${singleProducts?.id}`
                
            })
        
            singleProductWrapper.appendChild(singleProductElement)
                })
            })
        })
    };

    const getProductCategory = (clickedData) =>{
       //console.log(clickedData,"categoryDatas")

        const singleProductWrapper = document.querySelector(".singleProduct-wrapper")
        const singleProductElement = document.querySelectorAll(".single-product")
        const sowingCategory = document.querySelector("#showing-category")
        sowingCategory.style. textTransform = "capitalize" 
        sowingCategory.innerText = clickedData
        //singleproductsElement.remove();
        singleProductElement.forEach((singleremove) =>{
            singleremove.remove();
        })

        fetch(BASE_URL + "products/").then((res) =>{
            res.json().then((productsData) =>{
              //  console.log(productsData)

                const filterData = productsData.filter((categoryFilter) =>{
                    if(categoryFilter.category === clickedData){
                        return categoryFilter;
                    }
                })
              

                filterData.forEach((singleProducts) =>{
                 //console.log(singleProducts,"SingleProduct")

                const singleProductElement = document.createElement("div")
                singleProductElement.className = "single-product";
                singleProductElement.innerHTML = `<div class="img-wrapper">
                <img src= ${singleProducts?.image}
             alt=""
             class="single-product-img"
             />
            </div>
             <div class="prod-name">${singleProducts?.title}</div>
             <div class="prod-price">${singleProducts?.price}$</div>
             <div class="prod-rate">${singleProducts?.rating?.rate} Stars (${singleProducts?.rating?.count})</div>`;

             singleProductElement.addEventListener("click", () =>{
                 //console.log("Is Clicked?")
                //  console.log("Is Clicked?" ,  singleProducts.id)
                window.location.href = `singleProduct.html?product-id=${singleProducts?.id}`
                  
              });  
                singleProductWrapper.appendChild(singleProductElement)
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
      
      };

    productQuantity()
    getCategory()
    getAllProducts()
});

