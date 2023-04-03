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
        let selectedCategory = categoriesList[0];
        let selectedProduct = productsByCategory[selectedCategory][0].id;

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
        //containerDetails.addEventListener("click", handleOrder);

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
                    <div class="card-body">
                        <button id="order-btn" class="btn btn-primary">Order product</button>
                    </div>

                    <div id="order-form" style="display:none">
                        <h2 id="form-title">Order registration</h2>
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

                            <button id="buy-btn" type="submit"  data-purchase="${product.id}" 
                            class="btn btn-primary">Buy product</button>
                        </form>
                    </div>

                    <div id="order-confirmation" style="display:none">
                        <h2>Order confirmation</h2>
                        <p id="product-info">A</p>
                        <p id="delivery-info">B</p>
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

        const orderBtn = document.querySelector("#order-btn");
        const orderForm = document.querySelector("#order-form");
        const buyBtn = document.querySelector("#buy-btn");
        const orderInformation = document.querySelector("#order-confirmation");

        orderBtn.addEventListener("click", handleOrder);
        buyBtn.addEventListener("click", handlePurchase);

        function handleOrder() {
            //const product = productsById[selectedProduct];

            const formTitle = document.querySelector("#form-title");
            formTitle.innerHTML = "Order form for ${product.title}";

            //alert(`Product ${product.title} has been bought successfully.`);
            orderForm.style.display = "block";  
            
        }

        function handlePurchase(event) {
            event.preventDefault();
            if (event.target.hasAttribute("data-purchase") && validateForm()) {
            // const candidateProduct = event.target.getAttribute("data-purchase");
                //const product = productsById[selectedProduct];

                //alert(`Product ${product.title} has been bought successfully.`);
                orderForm.style.display = "none";
                orderInformation.style.display = "block"; 
                //displayOrderConfirmation();  
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
    });
