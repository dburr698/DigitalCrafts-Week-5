const ordersUL = document.getElementById("ordersUL")
const emailTextBox = document.getElementById("emailTextBox")
const typeTextBox = document.getElementById("typeTextBox")
const sizeSelection = document.getElementById("sizeSelection")
const priceInput = document.getElementById("priceInput")
const submitOrderButton = document.getElementById("submitOrderButton")

const emailToDeleteText = document.getElementById("emailToDeleteText")
const deleteOrderButton = document.getElementById("deleteOrderButton")

const emailToSearchText = document.getElementById("emailToSearchText")
const searchOrderButton = document.getElementById("deleteOrderButton")

// addEventListener for submit order button
submitOrderButton.addEventListener('click', function() {
    const email = emailTextBox.value 
    const type = typeTextBox.value 
    const size = sizeSelection.value
    const price = parseFloat(priceInput.value)

    // create JSON object
    const order = {
        email: email, 
        type: type,
        size: size,
        price: price 
    }

    // create and send request to POST to API
    let addRequest = new XMLHttpRequest()
    addRequest.open('POST', "https://troubled-peaceful-hell.glitch.me/orders")
    addRequest.setRequestHeader('Content-Type', 'application/json')
   
    //convert object into string
    addRequest.send(JSON.stringify(order))

    // display all orders with the new order added
    addRequest.addEventListener('load', function() {
        getAllOrders(function(orders) {
            displayOrders(orders)
        })
    })

})

// function to get all orders
function getAllOrders(ordersLoaded) {
    // create and send a request to GET coffee orders
    let orderRequest = new XMLHttpRequest()
    orderRequest.open('GET', "https://troubled-peaceful-hell.glitch.me/orders")
    orderRequest.send()

    // addEventListener to populate orders array with data from request
    orderRequest.addEventListener('load', function() {
        const orders = JSON.parse(this.responseText)
        ordersLoaded(orders)
    })
    
}

// function to display orders
function displayOrders(orders) {
    const orderItems = orders.map(function(order) {
        return `<li>
                    <label><b>Email: </b>${order.email}</label>
                    <label><b>Type: </b>${order.type}</label>
                    <label><b>Size: </b>${order.size}</label>
                    <label><b>Price: </b>${order.price}</label>
                </li>`
    })
    ordersUL.innerHTML = orderItems.join("")
}

// create function to delete order
function deleteOrder() {
    const emailToDelete = emailToDeleteText.value
    const orderToDeleteURL = `https://troubled-peaceful-hell.glitch.me/orders/${emailToDelete}`
    let deleteRequest = new XMLHttpRequest()
    deleteRequest.open('DELETE', orderToDeleteURL)
    deleteRequest.send()
    deleteRequest.addEventListener('load', function() {
        getAllOrders(function(orders) {
            displayOrders(orders)
        })
    })
}

// addEventListener to delete order button that will call the deleteOrder function
deleteOrderButton.addEventListener('click', function() {
    deleteOrder()
})

// create function to search orders by email
function searchOrder() {
    const emailToSearch = emailToSearchText.value
    const orderToSearchURL = `https://troubled-peaceful-hell.glitch.me/orders/${emailToSearch}`
    let searchRequest = new XMLHttpRequest()
    searchRequest.open('GET', orderToSearchURL)
    searchRequest.send()
    searchRequest.addEventListener('load', function() {
        getAllOrders(function(orders) {
            displayOrders(orders)
        })
    })
}

// addEventListener to search order button that will call the searchOrder function
searchOrderButton.addEventListener('click', function() {
    searchOrder()
})

// display all orders when the page loads
getAllOrders(function(orders) {
    displayOrders(orders)
})