/**
 * https://dummyjson.com/docs/products */

fetch("./products.json")
    .then((res) => res.json())
    .then((data) => {
        const productsById = data.products.reduce((indexedBy, item) => {
            indexedBy[item.id] = item;

            return indexedBy;
        }, {});
        const productsByCategory = data.products.reduce((indexedBy, item) => {
            if (!Array.isArray(indexedBy[item.category])) {
                indexedBy[item.category] = [];
            }

            indexedBy[item.category].push(item);

            return indexedBy;
        }, {});
        const categoriesList = Object.keys(productsByCategory);
        //console.log(categoriesList);
        let selectedCategory = categoriesList[0];
        let selectedProduct = productsByCategory[selectedCategory][0].id;

        const purchaseListBtn = document.querySelector('#myPurchase');
        const backToPageBtn = document.querySelector('#backToPage')
        const containerCategories = document.querySelector(
            '[data-component="categories"]'
        );
        const containerProducts = document.querySelector(
            '[data-component="products"]'
        );
        const containerDetails = document.querySelector(
            '[data-component="details"]'
        );
        const containerImages = document.querySelector('[data-component="images"]');

        containerCategories.addEventListener("click", handleCategory);
        containerProducts.addEventListener("click", handleProduct);
        containerDetails.addEventListener("click", handlePurchase);

        renderCategories();
        renderProducts();
        renderDetails();
        renderImages();

        /**
        * Render categories list */
        function renderCategories() {
            containerCategories.innerHTML = "";

            categoriesList.forEach((category) => {
                const link = document.createElement("button");

                link.setAttribute("class", "nav-link");
                link.setAttribute("data-category", category);
                link.textContent = category;

                if (category === selectedCategory) {
                    link.classList.add("active");
                }

                containerCategories.append(link);
            });
        }

        /**
        * Render products list */
        function renderProducts() {
            containerProducts.innerHTML = "";

            productsByCategory[selectedCategory].forEach((product) => {
                const link = document.createElement("button");

                link.setAttribute("class", "nav-link");
                link.setAttribute("data-product", product.id);
                link.textContent = product.title;

                if (product.id === selectedProduct) {
                    link.classList.add("active");
                }

                containerProducts.append(link);
            });
        }

        function renderDetails() {
            const product = productsById[selectedProduct];

            containerDetails.innerHTML = `
                <div class="card">
                    <img src="${product.thumbnail}" class="card-img-top p-3" alt="${product.title}">
                    <div class="card-body">
                        <h5 class="card-title">${product.title}</h5>
                        <p class="card-text">${product.description}</p>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item"><strong>Price:</strong> ${product.price}EUR</li>
                        <li class="list-group-item"><strong>Discount:</strong> ${product.discountPercentage}%</li>
                        <li class="list-group-item"><strong>Rating:</strong> ${product.rating}⭐</li>
                        <li class="list-group-item"><strong>Brand:</strong> ${product.brand}🏢</li>
                    </ul>
                    <div class="form" style="display:none">
                        <h3>Form body</h3>
                    </div>
                    <div id="order-confirmation" style="display:none">
                        <h2>Order confirmation</h2>
                        <p id="product-info"></p>
                        <p id="delivery-info"></p>
                    </div>
                    <div class="card-body">
                        <button data-purchase="${product.id}" class="btn btn-primary">Order product</button>


                        <!-- Button trigger modal
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            Launch demo modal
                        </button>  -->

                        <!-- Modal
                        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        ...
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button type="button" data-purchase="${product.id}" class="btn btn-primary">Save changes</button>
                                    </div>
                                </div>
                            </div>
                        </div>  -->


                    </div>
                </div>
            `;
        }

        function renderImages() {
            const product = productsById[selectedProduct];

            const images = product.images.map(
                (image) =>
                    `<img src="${image}" class="img-thumbnail p-3 mb-3" alt="${product.title}">`
            );

            containerImages.innerHTML = images.join("\n");
        }

        function handleCategory(event) {
            if (event.target.hasAttribute("data-category")) {
                const candidateCategory = event.target.getAttribute("data-category");

                if (candidateCategory === selectedCategory) {
                    return;
                }

                document
                    .querySelector(`[data-category="${selectedCategory}"]`)
                    .classList.remove("active");

                document
                    .querySelector(`[data-category="${candidateCategory}"]`)
                    .classList.add("active");

                selectedCategory = candidateCategory;
                selectedProduct = productsByCategory[selectedCategory][0].id;

                renderProducts();
                renderDetails();
                renderImages();
            }
        }

        function handleProduct(event) {
            if (event.target.hasAttribute("data-product")) {
                const candidateProduct = event.target.getAttribute("data-product");

                if (candidateProduct === selectedProduct) {
                    return;
                }

                document
                    .querySelector(`[data-product="${selectedProduct}"]`)
                    .classList.remove("active");

                document
                    .querySelector(`[data-product="${candidateProduct}"]`)
                    .classList.add("active");

                selectedProduct = candidateProduct;

                renderDetails();
                renderImages();
            }
        }

        
        function handlePurchase(event) {
            if (event.target.hasAttribute("data-purchase")) {
                const product = productsById[selectedProduct];

                const formBody = document.querySelector(".form");
                formBody.innerHTML = `
                    <form>
                        <label>Name:</label>
                        <input type="text" id="name-input" required><br>

                        <label>City:</label>
                        <select id="city-select" required>
                            <option value="">Select city</option>
                            <option value="Odesa">Odesa</option>
                            <option value="Reni">Reni</option>
                            <option value="Izmail">Izmail</option>
                        </select><br>

                        <label>Post office for sending:</label>
                        <input type="text" id="post-office-input" required><br>

                        <label>Payment method:</label><br>
                        <input type="radio" id="postpaid-radio" name="payment" value="postpaid" required>
                        <label for="postpaid-radio">Postpaid</label><br>
                        <input type="radio" id="card-radio" name="payment" value="card" required>
                        <label for="card-radio">Bank card</label><br>

                        <label>Quantity:</label>
                        <input type="number" id="quantity-input" min="1" required><br>

                        <label>Comment:</label>
                        <textarea id="comment-input"></textarea><br>

                        <button data-order="${product.id}" id="buy-btn" class="btn btn-primary" type="button">Buy product</button>
                    </form>
                `;

                event.target.style.display = "none";
                formBody.style.display = "block";

                const buyBtn = document.querySelector("#buy-btn");
                buyBtn.addEventListener("click", handleOrder);                
            }

            function handleOrder(event) {
                if (event.target.hasAttribute("data-order") && validateForm()) {
                    const formBody = document.querySelector(".form");
                    const orderConfirmation = document.querySelector("#order-confirmation");

                    formBody.style.display = "none";
                    orderConfirmation.style.display = "block";
                    displayOrderConfirmation();
                } 
            }

            function validateForm() {
                const name = document.getElementById("name-input").value.trim();
                const city = document.getElementById("city-select").value.trim();
                const postOffice = document.getElementById("post-office-input").value.trim();
                const payment = document.querySelector('input[name="payment"]:checked');
                const quantity = document.getElementById("quantity-input").value.trim();
          
                if (!name || !city || !postOffice || !payment || !quantity) {
                    const errorDiv = document.createElement("div");
                    errorDiv.style.color = "red";
                    errorDiv.textContent = "Please fill in all required fields.";
                    document.querySelector("form").appendChild(errorDiv);
                    return false;
                }
          
                return true;
            }
          
            function displayOrderConfirmation() {
                const product = productsById[selectedProduct];
              
                //to varify 'name' value
                function normalize(rawValue) {
                    if (rawValue == null) {
                        return null;
                    }
              
                    const value = (
                        typeof rawValue === 'string'
                            ? rawValue.trim()
                            : rawValue
                    );
              
                    return value === '' ? null : value;
                }
          
                const name = normalize(document.getElementById("name-input").value);
                const city = document.getElementById("city-select").value.trim();
                const postOffice = document.getElementById("post-office-input").value.trim();
                const payment = document.querySelector('input[name="payment"]:checked').value;
                const quantity = document.getElementById("quantity-input").value.trim();
                const comment = document.getElementById("comment-input").value.trim();
          
                const productInfoText = `
                    Product: ${product.title},
                    Quantity: ${quantity}`;
                const deliveryInfoText = `
                    Delivery to: ${name}, 
                    ${city}, Post Office Nr: ${postOffice}, 
                    Payment method: ${payment},
                    Comment: ${comment}
                   `;
          
                const productInfo = document.getElementById("product-info");
                const deliveryInfo = document.getElementById("delivery-info");
                productInfo.textContent = productInfoText;
                deliveryInfo.textContent = deliveryInfoText;
          
                product.date = new Date();
                product.quantity = +quantity;
                product.price *= product.quantity
          
                localStorage.setItem(`${product['id']}`, JSON.stringify(product));

                console.log(localStorage);
          
                /*
                // Get products from LS, maybe saved before
                const rawFromLS = localStorage.getItem(SOME_STORAGE_KEY);
                const productsFromLS = rawFromLS == null ? {} : JSON.parse(rawFromLS);
          
                productsFromLS[product.id] = product;
          
                localStorage.setItem(SOME_STORAGE_KEY, JSON.stringify(productsFromLS));
                */
            }
        }

        purchaseListBtn.addEventListener('click', showPurchaseList);
        const purchaseList = document.querySelector('.purchaseList');
          
        function showPurchaseList() {
            const orderList = document.querySelector('#order-list');
            const totalPriceDiv = document.querySelector('#totalPrice');
      
            const orders = [];
      
            /*
            // Get products from LS, maybe saved before
            const rawFromLS = localStorage.getItem(SOME_STORAGE_KEY);
            const productsFromLS = rawFromLS == null ? {} : JSON.parse(rawFromLS);
      
            const keys = Object.keys(productsFromLS);
            */
      
            let keys = Object.keys(localStorage);
            for(let key of keys) {
                orders.push( JSON.parse(localStorage.getItem(key)) );
            }
        
            // Clear the current order list
            orderList.innerHTML = '';
            totalPriceDiv.innerHTML = '';
        
            // Loop through the orders and add them to the order list
            orders.forEach(order => {
                const li = document.createElement('li');
                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'X';
      
                li.textContent = `${order.title} - ${order.quantity} item. Price: $ ${order.price} `;
                li.append(deleteBtn);
                orderList.appendChild(li);
      
                deleteBtn.addEventListener('click', removeProductFromList);
      
                function removeProductFromList() {
                    localStorage.removeItem(`${order.id}`);
                    showPurchaseList();
                }
            });
      
            const today = new Date();
            const day = today.getDate();
            const month = today.getMonth() + 1; 
            const year = today.getFullYear();
      
            const currentDate = `${day}/${month}/${year}`;
      
            const totalPrice = orders.reduce( (sum, current) => {
                return sum + current.price
            }, 0)
            
            console.log(localStorage);
            console.log(totalPrice);

            if(totalPrice === 0) {
                totalPriceDiv.innerHTML = '';
            } else {
                totalPriceDiv.innerHTML = `${currentDate} Total price: $ ${totalPrice}`;
            } 
            
            containerCategories.style.display = 'none';
            containerProducts.style.display = 'none';
            containerDetails.style.display = 'none';
            containerImages.style.display = 'none';
            purchaseListBtn.style.display = 'none';
            purchaseList.style.display = 'block';
        }

        backToPageBtn.addEventListener('click', showPage);

        function showPage() {
            containerCategories.style.display = 'flex';
            containerProducts.style.display = 'flex';
            containerDetails.style.display = 'flex';
            containerImages.style.display = 'flex';
            purchaseListBtn.style.display = 'block';
            purchaseList.style.display = 'none';
        }

    });





    
