/* 
 Завдання 34 (на основі завдання 31)
Дано 3 блоки
1. В лівій частині сторінки - перелік категорій.
2. При натисканні на категорію в середній блок виводиться список товарів цієї категорії.
3. Клік на товар - інформацію про товар у правому блоці.
4. В інформації товару - кнопка “замовити”.
*5. При натисканні на кнопку “замовити” з'являється форма для замовлення:
    -ПІБ покупця
    -Місто (вибір зі списку)
    -Склад Нової пошти для надсилання
    -Післяплати або оплати банківської картки
    -Кількість продукції, що купується
    -Коментар до замовлення.
*6. Реалізувати перевірку всіх даних користувача під час підтвердження замовлення - обов'язкові поля заповнені.
Інакше - виводити помилку на сторінку
*7. Виводити інформацію про замовлення на сторінку (інформація про товар та про доставку).

*/

const categories = document.querySelectorAll('.category');
const products = document.querySelector('.products ul');
const productInfo = document.querySelector('.product-info');

const categoryProducts = {
    'Category 1': ['Product 1', 'Product 2', 'Product 3'],
    'Category 2': ['Product 4', 'Product 5', 'Product 6'],
    'Category 3': ['Product 7', 'Product 8', 'Product 9']
};

// show products of the selected category
categories.forEach(category => {
    category.addEventListener('click', () => {
        products.innerHTML = '';
        const categoryName = category.textContent;
        const categoryProductsList = categoryProducts[categoryName];
        categoryProductsList.forEach(product => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = '#';
            a.textContent = product;
            li.appendChild(a);
            products.appendChild(li);
        });
    });
});

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
    const productName = p.innerHTML.slice(8, -1)

    const name = document.getElementById("name-input").value.trim();
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

}
