const productsContainer = document.querySelector('#products-container');

// Запускаем getProducts
getProducts();

// Асинхронная функция получения данных из файла products.json
async function getProducts() {
	// Получаем данные из products.json
    const response = await fetch('./js/products.json');
    // Парсим данные из JSON формата в JS
    const productsArray = await response.json();
    // Запускаем ф-ю рендера (отображения товаров)
	renderProducts(productsArray);
}

function renderProducts(productsArray) {
    productsArray.forEach(function (item) {
        const productHTML = `<article class="product__card" data-id="${item.id}">
								<div class="product__circle"></div>

								<img src="img/${item.imgSrc}" alt="" class="product__img">
									
								<h3 class="product__title">${item.title}</h3>
								<span class="product__price">${item.price} $</span>
								<div class="product__none" data-counter>1</div>
								<button data-cart type="button" class="button--flex product__button">
										<i data-cart class="ri-shopping-bag-line"></i>
								</button>
							</article>`;
        productsContainer.insertAdjacentHTML('beforeend', productHTML);
    });
}