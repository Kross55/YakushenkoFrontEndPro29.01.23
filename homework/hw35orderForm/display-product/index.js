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
          <div class="card-body">
            <button data-purchase="${product.id}" class="btn btn-primary">Purchase</button> 
          </div>
          
          <form id="order-form" style='display:none'>
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" required>
        
            <label for="city">City:</label>
            <select id="city" name="city" required>
              <option value="">Select a city</option>
              <option value="Kiev">Kiev</option>
              <option value="Lviv">Lviv</option>
              <option value="Odessa">Odessa</option>
            </select>
        
            <label for="mail-composition">Composition of New Mail:</label>
            <input type="text" id="mail-composition" name="mail-composition" required>
        
            <label for="payment-method">Payment Method:</label>
            <input type="radio" id="postpaid" name="payment-method" value="postpaid" required>
            <label for="postpaid">Postpaid</label>
            <input type="radio" id="bank-card" name="payment-method" value="bank-card" required>
            <label for="bank-card">Bank Card</label>
        
            <label for="quantity">Quantity:</label>
            <input type="number" id="quantity" name="quantity" required>
        
            <label for="comment">Comment:</label>
            <textarea id="comment" name="comment"></textarea>
        
            <!-- Button trigger modal -->
            <button type="submit" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
              Launch demo modal
            </button>

            <!-- Modal -->
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
                            <button type="button" data-finishOrder= data-purchase="${product.id}" class="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
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
        // const candidateProduct = event.target.getAttribute("data-purchase");
        const product = productsById[selectedProduct];
        const orderForm = document.querySelector('#order-form');

        orderForm.style.display = 'block';
        
        //alert(`Product ${product.title} has been bought successfully.`);
      }
    }

    const orderForm = document.querySelector('#order-form');

    orderForm.addEventListener('submit', verifyUserData);

    function verifyUserData(event) {
      const nameInput = document.querySelector('#name');
      const citySelect = document.querySelector('#city');
      const mailCompositionInput = document.querySelector('#mail-composition');
      const paymentMethodRadio = document.querySelector('input[name="payment-method"]:checked');
      const quantityInput = document.querySelector('#quantity');

      if (!nameInput.value || !citySelect.value || !mailCompositionInput.value || !paymentMethodRadio || !quantityInput.value) {
        event.preventDefault();
        alert('Please fill in all mandatory fields');
      }
    }

    function displayOrderInformation() {
      const nameInput = document.querySelector('#name');
      const citySelect = document.querySelector('#city');
      const mailCompositionInput = document.querySelector('#mail-composition');
    }
  });
