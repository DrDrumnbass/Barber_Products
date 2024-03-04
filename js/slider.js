// Конфигурация слайдера
const sliderConfig = {
    slider: document.getElementById('slider'), // Элемент слайдера
    slides: document.querySelectorAll('#slide'), // Слайды
    buttons: document.querySelectorAll('#btn'), // Кнопки
    isDragging: false, // Флаг перетаскивания слайдера
    startPosition: 0, // Позиция начала перетаскивания
    currentTranslate: 0, // Текущий сдвиг слайдов
    prevTranslate: 0, // Предыдущий сдвиг слайдов
    animationID: 0, // Идентификатор анимации
    currentIndex: 0, // Индекс текущего слайда
    sliderWidth: document.getElementById('slider').offsetWidth // Ширина слайдера
};

// Функция для установки позиции слайдера
const setSliderPosition = () => {
    sliderConfig.slides.forEach((slide, index) => {
        slide.style.transform = `translateX(${sliderConfig.currentTranslate}px)`;
    });
};

// Функция для перехода к указанному слайду
const goToSlide = (index) => {
    sliderConfig.currentIndex = (index + sliderConfig.slides.length) % sliderConfig.slides.length;
    sliderConfig.currentTranslate = -sliderConfig.currentIndex * sliderConfig.sliderWidth;
    sliderConfig.prevTranslate = sliderConfig.currentTranslate;
    setSliderPosition();
    updateButtons();
};

// Обработчик нажатия кнопки мыши на слайде
const slideMouseDown = (e) => {
    sliderConfig.startPosition = e.clientX;
    sliderConfig.isDragging = true;
    sliderConfig.animationID = requestAnimationFrame(animation);
};

// Обработчик движения мыши при удерживании кнопки
const slideMouseMove = (e) => {
    if (!sliderConfig.isDragging) return;
    const currentPosition = e.clientX;
    sliderConfig.currentTranslate = sliderConfig.prevTranslate + currentPosition - sliderConfig.startPosition;
};

// Обработчик отпускания кнопки мыши
const slideMouseUp = () => {
    sliderConfig.isDragging = false;
    cancelAnimationFrame(sliderConfig.animationID);
    const threshold = sliderConfig.sliderWidth / 4;
    if (Math.abs(sliderConfig.currentTranslate - sliderConfig.prevTranslate) > threshold) {
        goToSlide(sliderConfig.currentTranslate < sliderConfig.prevTranslate ? sliderConfig.currentIndex + 1 : sliderConfig.currentIndex - 1);
    } else {
        goToSlide(sliderConfig.currentIndex);
    }
};

// Функция анимации слайдера
const animation = () => {
    setSliderPosition();
    if (sliderConfig.isDragging) requestAnimationFrame(animation);
};

// Обработчик касания слайда
const slideTouchStart = (e) => {
    sliderConfig.startPosition = e.touches[0].clientX;
    sliderConfig.isDragging = true;
    sliderConfig.animationID = requestAnimationFrame(animation);
};

// Обработчик движения пальца при удерживании на слайде
const slideTouchMove = (e) => {
    if (!sliderConfig.isDragging) return;
    const currentPosition = e.touches[0].clientX;
    sliderConfig.currentTranslate = sliderConfig.prevTranslate + currentPosition - sliderConfig.startPosition;
};

// Обработчик отпускания пальца
const slideTouchEnd = () => {
    sliderConfig.isDragging = false;
    cancelAnimationFrame(sliderConfig.animationID);
    const threshold = sliderConfig.sliderWidth / 4;
    if (Math.abs(sliderConfig.currentTranslate - sliderConfig.prevTranslate) > threshold) {
        goToSlide(sliderConfig.currentTranslate < sliderConfig.prevTranslate ? sliderConfig.currentIndex + 1 : sliderConfig.currentIndex - 1);
    } else {
        goToSlide(sliderConfig.currentIndex);
    }
};

// Функция для обновления состояния кнопок
const updateButtons = () => {
    sliderConfig.buttons.forEach((button, index) => {
        // Устанавливаем активное состояние для текущей кнопки
        button.classList.toggle('buttons__btn_active', index === sliderConfig.currentIndex);
    });
};

// Добавляем обработчики событий к слайдам
sliderConfig.slides.forEach((slide) => {
    slide.addEventListener('mousedown', slideMouseDown);
    slide.addEventListener('mousemove', slideMouseMove);
    slide.addEventListener('mouseup', slideMouseUp);
    slide.addEventListener('mouseleave', slideMouseUp);
    slide.addEventListener('touchstart', slideTouchStart);
    slide.addEventListener('touchmove', slideTouchMove);
    slide.addEventListener('touchend', slideTouchEnd);
});

// Добавляем обработчики событий к кнопкам
sliderConfig.buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
        goToSlide(index);
    });
});