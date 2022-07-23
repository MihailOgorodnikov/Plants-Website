const showMore = document.querySelector('.show-more');

let items = 6;

showMore.addEventListener('click', () => {
 const productsLength = document.querySelectorAll('.product__card').length;
 items += 3;
 const array = Array.from(document.querySelector('.product__container').children);
 const visItems = array.slice(0, items);

 visItems.forEach( el => el.classList.add('is-visible'));
 console.log(visItems);
 console.log(productsLength);
 if (visItems.length === productsLength){
    showMore.style.display = 'none';
 }
});