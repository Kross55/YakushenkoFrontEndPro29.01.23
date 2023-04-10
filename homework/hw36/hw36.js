/* 
 Завдання 36 (на основі завдання 34)
Дано 3 блоки
1. В лівій частині сторінки - перелік категорій. Кнопка - "мої замовлення"
2. При натисканні на категорію в середній блок виводиться список товарів цієї категорії.
3. Клік на товар - інформацію про товар у правому блоці.
4. В інформації товару - кнопка “замовити”.
5. При натисканні на кнопку “замовити” з'являється форма для замовлення:
    -ПІБ покупця
    -Місто (вибір зі списку)
    -Склад Нової пошти для надсилання
    -Післяплати або оплати банківської картки
    -Кількість продукції, що купується
    -Коментар до замовлення.
6. Реалізувати перевірку всіх даних користувача під час підтвердження замовлення - обов'язкові поля заповнені.
Інакше - виводити помилку на сторінку
7. Виводити інформацію про замовлення на сторінку (інформація про товар та про доставку).
*8. Модифікувати інтернет-магазин таким чином, щоб була можливість переглянути всі збережені
 замовлення навіть після оновлення сторінки (використовувати localStorage).
*9. На сторінці спочатку крім списку категорій відображається також кнопка “мої замовлення”.
*10. При кліку на “мої замовлення” - пропадають категорії та відображається список усіх замовлень користувача
(дата та ціна) - при кліку на замовлення - “розгортаються” деталі замовлення.
*11. Реалізувати можливість видалення замовлення зі списку.

*/

//const SOME_STORAGE_KEY = "STORAGE_KEY";

const categories = document.querySelectorAll('.category');
const products = document.querySelector('.products ul');
const productInfo = document.querySelector('.product-info');

/*const categoryProducts = {
    'Apple': [
        {'name': 'iPhone 13', 'price': 11}, 
        {'name': 'iPad', 'price': 12}, 
        {'name': 'MacBook', 'price': 13}
    ],
    'Samsung': [
        {'name': 'Galaxy12', 'price': 14}, 
        {'name': 'SamsungLED', 'price': 15}, 
        {'name': 'Samsung LapTop', 'price': 16}
    ],
    'Xiomi': [
        {'name': 'phone1', 'price': 17}, 
        {'name': 'monitor1', 'price': 18}, 
        {'name': 'laptop1', 'price': 19}
    ]
};
*/

const productsArr = [
    {'id': 1, 'name': 'iPhone13', 'price': 11, 'category': 'Apple'}, 
    {'id': 2, 'name': 'iPad', 'price': 12, 'category': 'Apple'}, 
    {'id': 3, 'name': 'MacBook', 'price': 13, 'category': 'Apple'},
    {'id': 4, 'name': 'Galaxy12', 'price': 14, 'category': 'Samsung'}, 
    {'id': 5, 'name': 'SamsungLED', 'price': 15, 'category': 'Samsung'}, 
    {'id': 6, 'name': 'SamsungLapTop', 'price': 16, 'category': 'Samsung'},
    {'id': 7, 'name': 'phone1', 'price': 17, 'category': 'Xiomi'}, 
    {'id': 8, 'name': 'monitor1', 'price': 18, 'category': 'Xiomi'}, 
    {'id': 9, 'name': 'laptop1', 'price': 19, 'category': 'Xiomi'},
];

const productsById = productsArr.reduce((indexedBy, item) => {
    indexedBy[item.id] = item;

    return indexedBy;
}, {});

const productsByCategory = productsArr.reduce((indexedBy, item) => {
    if (!Array.isArray(indexedBy[item.category])) {
        indexedBy[item.category] = [];
    }

    indexedBy[item.category].push(item);

    return indexedBy;
}, {});

const productsByName = productsArr.reduce((indexedBy, item) => {
    indexedBy[item.name] = item;

    return indexedBy;
}, {});

console.log(productsById);
console.log(productsByCategory);
console.log(productsByName);

// show products of the selected category
categories.forEach(category => {
    category.addEventListener('click', () => {
        products.innerHTML = '';
        const categoryName = category.textContent;
        const categoryProductsList = productsByCategory[categoryName];
        categoryProductsList.forEach(product => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = '#';
            a.textContent = product['name'];
            li.appendChild(a);
            products.appendChild(li);
        });
    });
});

//const currentProduct 

// show product information on click
products.addEventListener('click', event => {
    if (event.target.tagName === 'A') {
        const productName = event.target.textContent;
        const productDescription = `This is ${productName}.`;
        productInfo.querySelector('p').textContent = productDescription;
        productInfo.classList.add('show');
        orderBtn.style.display = "block";
        orderConfirmation.style.display = "none";
    }
});


const orderBtn = document.querySelector('.order-btn');
const orderForm = document.querySelector("#order-form");

orderBtn.addEventListener("click", showOrderForm);

function showOrderForm() {
    orderBtn.style.display = "none";
    orderForm.style.display = "block";
}

const buyBtn = document.querySelector("#buy-btn");
buyBtn.addEventListener("click", submitOrder);

const orderConfirmation = document.querySelector("#order-confirmation")

function submitOrder(event) {
    event.preventDefault();
    if (validateForm()) {
        orderForm.style.display = "none";
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
    const p = document.getElementById("product-name");
    const productName = p.innerHTML.slice(8, -1);
    const product = productsByName[productName];
    
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
        Product: ${productName},
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
    console.log(product);

    localStorage.setItem(`${product['id']}`, JSON.stringify(product));

    /*
    // Get products from LS, maybe saved before
    const rawFromLS = localStorage.getItem(SOME_STORAGE_KEY);
    const productsFromLS = rawFromLS == null ? {} : JSON.parse(rawFromLS);

    productsFromLS[product.id] = product;

    localStorage.setItem(SOME_STORAGE_KEY, JSON.stringify(productsFromLS));
    */
}

const purchaseListBtn = document.querySelector('#myPurchase');
const purchaseList = document.querySelector('.purchaseList');
const categoriesContainer = document.querySelector('.container');
const orderList = document.querySelector('#order-list');
const totalPriceDiv = document.querySelector('#totalPrice')

purchaseListBtn.addEventListener('click', showPurchaseList);

function showPurchaseList() {
    categoriesContainer.classList.add('hidden');
    purchaseListBtn.style.display = 'none';
    purchaseList.style.display = 'block';

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

    console.log(localStorage);
    console.log(orders);
  
    // Clear the current order list
    orderList.innerHTML = '';
    totalPriceDiv.innerHTML = '';
  
    // Loop through the orders and add them to the order list
    orders.forEach(order => {
        const li = document.createElement('li');
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'X';

        li.textContent = `${order.name} - ${order.quantity} item. Price: $ ${order.price} `;
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

    console.log(totalPrice);
    if(totalPrice === 0) {
        totalPriceDiv.innerHTML = '';
    } else {
        totalPriceDiv.innerHTML = `${currentDate} Total $ ${totalPrice}`;
    }  

}

