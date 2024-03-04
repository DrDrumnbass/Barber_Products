class Accordion {
    constructor(target, config) {
        // Инициализация аккордеона с указанным целевым элементом и конфигурацией
        this._el = typeof target === 'string' ? document.querySelector(target) : target;
        const defaultConfig = {
            alwaysOpen: true,
            duration: 350
        };
        this._config = Object.assign(defaultConfig, config);
        this.addEventListener(); // Добавляем обработчики событий
    }

    addEventListener() {
        // Добавление обработчика события 'click' к целевому элементу
        this._el.addEventListener('click', this.handleClick.bind(this));
    }

    handleClick(e) {
        // Обработка события 'click' по заголовку аккордеона
        const elHeader = e.target.closest('.accordion__header');
        if (!elHeader) return; // Если заголовок не найден, выходим
        const elParent = elHeader.parentElement;
        // Проверяем, нужно ли закрывать предыдущий открытый элемент
        if (!this._config.alwaysOpen) {
            const elOpenItem = this._el.querySelector('.accordion__item_show');
            if (elOpenItem && elOpenItem !== elParent) {
                this.hide(elOpenItem); // Закрываем предыдущий открытый элемент
            }
        }
        this.toggle(elParent); // Переключаем текущий элемент аккордеона
    }

    show(el) {
        // Отображение содержимого элемента аккордеона
        const elBody = el.querySelector('.accordion__body');
        if (elBody.classList.contains('collapsing') || el.classList.contains('accordion__item_show')) return;
        
        // Устанавливаем стили для анимации раскрытия
        elBody.style.display = 'block';
        const height = elBody.offsetHeight;
        elBody.style.height = 0;
        elBody.style.overflow = 'hidden';
        elBody.style.transition = `height ${this._config.duration}ms ease`;
        elBody.classList.add('collapsing');
        el.classList.add('accordion__item_slidedown');
        elBody.offsetHeight;
        elBody.style.height = `${height}px`;

        // Завершение анимации и установка финальных стилей
        window.setTimeout(() => {
            elBody.classList.remove('collapsing');
            el.classList.remove('accordion__item_slidedown');
            elBody.classList.add('collapse');
            el.classList.add('accordion__item_show');
            elBody.style.display = '';
            elBody.style.height = '';
            elBody.style.transition = '';
            elBody.style.overflow = '';
        }, this._config.duration);
    }

    hide(el) {
        // Скрытие содержимого элемента аккордеона
        const elBody = el.querySelector('.accordion__body');
        if (elBody.classList.contains('collapsing') || !el.classList.contains('accordion__item_show')) return;
        
        // Устанавливаем стили для анимации скрытия
        elBody.style.height = `${elBody.offsetHeight}px`;
        elBody.offsetHeight;
        elBody.style.display = 'block';
        elBody.style.height = 0;
        elBody.style.overflow = 'hidden';
        elBody.style.transition = `height ${this._config.duration}ms ease`;
        elBody.classList.remove('collapse');
        el.classList.remove('accordion__item_show');
        elBody.classList.add('collapsing');
        
        // Завершение анимации и установка финальных стилей
        window.setTimeout(() => {
            elBody.classList.remove('collapsing');
            elBody.classList.add('collapse');
            elBody.style.display = '';
            elBody.style.height = '';
            elBody.style.transition = '';
            elBody.style.overflow = '';
        }, this._config.duration);
    }

    toggle(el) {
        // Переключение состояния элемента аккордеона
        el.classList.contains('accordion__item_show') ? this.hide(el) : this.show(el);
    }
}