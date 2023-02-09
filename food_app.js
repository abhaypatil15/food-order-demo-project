if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        console.log("cart values store in button variable : "+button)
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        console.log("cart values store in button variable : "+button)
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked() {
    alert('Thank you for your purchase')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    // button.innerHTML="ADD TO CART"
    updateCartTotal()
}

// function quantityChanged(event) {
//     var input = event.target
//     if (isNaN(input.value) || input.value <= 0) {
//         input.value = 1
//     }
//     updateCartTotal()
// }

function quantityChanged(){
    increaseCount()
    decreaseCount()
}
function increaseCount(a, b) {
    var input = b.previousElementSibling;
    var value = parseInt(input.value, 10);
    value = isNaN(value) ? 0 : value;
    value++;
    input.value = value;
  }
  
  function decreaseCount(a, b) {
    var input = b.nextElementSibling;
    var value = parseInt(input.value, 10);
    if (value > 1) {
      value = isNaN(value) ? 0 : value;
      value--;
      input.value = value;
    }
  }

function addToCartClicked(event) {
    console.log("add To Cart Clicked")
    var button = event.target
    var shopItem = button.parentElement.parentElement
    console.log("button : "+shopItem)
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    console.log(title)
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    console.log(price)
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    console.log(imageSrc)
    //button.innerHTML = " Added ";

    addItemToCart(title, price, imageSrc)
    console.log("add iteams to cart")
    updateCartTotal()
    console.log("update successfully")
}

function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div')
    console.log("created element throw this row : "+cartRow)
    cartRow.classList.add('cart-row')
    console.log()
    var cartItems = document.getElementsByClassName('cart-items')[0]
    console.log("cart iteams : "+cartItems)
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    console.log("cart iteams name : "+cartItemNames)
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            //alert('This item is already added to the cart')
            return
        }
      
    }
    var cartRowContents = `
    <div class="cart-item-contaner">
        <div class="cart-item cart-column-contaner" >
            <div class="cart-item cart-column">
                <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            </div>
            <div class="cart-item cart-column" id="titel-id">
                <span class="cart-item-title">${title}</span>
            </div>
            <div class="cart-item cart-column">
                <span class="cart-price cart-column">${price}</span>
            </div>
            <div class="cart-quantity cart-column">
                <div class="cart-quantity-input">
                    <span class="down" onClick='decreaseCount(event, this)'>-</span>                
                    <input class="cart-quantity-input" type="number" value="10">
                    <span class="up" onClick='increaseCount(event, this)'>+</span>
                </div>
            </div>
        </div>
        <div class="">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>
    </div`
        //   <input class="cart-quantity-input" type="number" value="1">
        //      <div class=”count”>2</div>

    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}
function updateButtonFild(){

}