// 33
//Написати слайдер
const sliderItems = document.querySelectorAll('#slider img');
            
const btnPrev = document.querySelector('#btnPrev');
const btnNext = document.querySelector('#btnNext');

sliderItems.forEach( (slide, index) => {
    if(index !== 0) slide.classList.add('hidden');

    slide.dataset.index = index;

})

sliderItems[0].setAttribute('data-active', '');

btnPrev.classList.add('hidden');

//btnHidden

btnNext.addEventListener('click', function () {

    const currentSlideIndex = +currentSlide.dataset.index;
    const currentSlide = sliderItems[currentSlideIndex];

    currentSlide.classList.add('hidden');
    currentSlide.removeAttribute('data-active');

    const nextSlideIndex = currentSlideIndex + 1 === sliderItems.length 
        ? currentSlideIndex 
        : currentSlideIndex + 1;

    const nextSlide = sliderItems[nextSlideIndex];
    nextSlide.classList.remove('hidden');
    nextSlide.setAttribute('data-active', '');

    if(nextSlideIndex === sliderItems.length - 1) btnNext.classList.add('hidden');

    btnPrev.classList.remove('hidden');
})
            
btnPrev.addEventListener('click', function () {

    btnNext.classList.remove('hidden');

    const currentSlideIndex = +currentSlide.dataset.index;
    const currentSlide = sliderItems[currentSlideIndex];
                
    //if (currentSlide === 0) btnPrev.classList.add('hidden');

    currentSlide.classList.add('hidden');
    currentSlide.removeAttribute('data-active');

    const nextSlideIndex = currentSlideIndex - 1 < 0 
        ? 0 
        : currentSlideIndex - 1;

    const nextSlide = sliderItems[nextSlideIndex];
    nextSlide.classList.remove('hidden');
    nextSlide.setAttribute('data-active', '');
    if(nextSlideIndex === 0) btnPrev.classList.add('hidden');

})