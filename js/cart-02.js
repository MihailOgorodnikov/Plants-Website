// Div внутри корзины, в который мы добавляем товары
 const cartWrapper =  document.querySelector('.cart-wrapper');
	  
 function printQuantity () {
	const cartQuantity = document.querySelector('.cart_quantity');
	const cartChange = document.querySelector('.change-theme-item');
	const priceElements = cartWrapper.querySelectorAll('.items__current');
	let priceTotal = 0;

	// Обходим все блоки с ценами в корзине
	priceElements.forEach(function (item) {
		// Находим количество товара
		const amountEl = item.closest('.cart-item').querySelector('[data-counter]');
		// Добавляем стоимость товара в общую стоимость (кол-во * цену)
		priceTotal += parseInt(amountEl.innerText);
	});
	// Отображаем цену на странице
	cartQuantity.innerText = priceTotal;
	cartChange.innerText = priceTotal;

}
// Отслеживаем клик на странице
window.addEventListener('click', function (event) {
	// Проверяем что клик был совершен по кнопке "Добавить в корзину"
	if (event.target.hasAttribute('data-cart')) {

		// Находим карточку с товаром, внутри котрой был совершен клик
		const card = event.target.closest('.product__card');
		
		// Собираем данные с этого товара и записываем их в единый объект productInfo
		const productInfo = {
			id: card.dataset.id,
			imgSrc: card.querySelector('.product__img').getAttribute('src'),
			price: card.querySelector('.product__price').innerText,
			title: card.querySelector('.product__title').innerText,
			counter: card.querySelector('[data-counter]').innerText,
		};
		
		// Проверять если ли уже такой товар в корзине
		const itemInCart = cartWrapper.querySelector(`[data-id="${productInfo.id}"]`);
		// Если товар есть в корзине
		if (itemInCart) {
			const counterElement = itemInCart.querySelector('[data-counter]');
			counterElement.innerText = parseInt(counterElement.innerText) + parseInt(productInfo.counter);
			
		} else {
			// Если товара нет в корзине

			// Собранные данные подставим в шаблон для товара в корзине
			const cartItemHTML = `<div class="cart-item" data-id="${productInfo.id}">
										<div class="cart-item__top">
											<div class="cart-item__img">
												<img src="${productInfo.imgSrc}" alt="">
											</div>
											<div class="cart-item__desc">
												<div class="cart-item__title">${productInfo.title}</div>
												<!-- cart-item__details -->
												<div class="cart-item__details">

													<div class="items items--small counter-wrapper">
														<div class="items__control" data-action="minus">-</div>
														<div class="items__current" data-counter>${productInfo.counter}</div>
														<div class="items__control" data-action="plus">+</div>
													</div>

													<div class="price">
														<div class="price__currency">${productInfo.price}</div>
													</div>

													<button class="cart-product_delit" aria-label="delit">Delete</button>
												</div>
												<!-- // cart-item__details -->

											</div>
										</div>
									</div>
									`;

			cartWrapper.insertAdjacentHTML('beforeend', cartItemHTML);
		}
		// Сбрасываем счетчик добавленного товара на "1"
		card.querySelector('[data-counter]').innerText = '1';
		// Отображение статуса корзины Пустая / Полная
		toggleCartStatus();

		// Пересчет общей стоимости товаров в корзине
		calcCartPriceAndDelivery();
		
		printQuantity ();
	}
});

