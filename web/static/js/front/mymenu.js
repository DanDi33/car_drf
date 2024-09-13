document.addEventListener('DOMContentLoaded', function() {
    // Получаем все элементы меню
    const menuItems = document.querySelectorAll('.navbar ul li a');
    // Получаем чекбокс
    const menuCheckbox = document.getElementById('menu__checkbox');

    // Добавляем обработчик событий для каждого элемента меню
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            // Сбрасываем состояние чекбокса
            menuCheckbox.checked = false;
        });
    });
});