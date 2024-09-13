// document.getElementById('loginForm').addEventListener('submit', function (event) { authUser(event) })

function authUser(event) {
    event.preventDefault();

    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    console.log('Username:', isExist(username));
    console.log('Password:', isExist(password));


    if (isExist(username) && isExist(password)) {
        // console.log('Both fields filled:', isExist(username) && isExist(password));
        getToken(username, password);
    }
    else {
        console.log('Both fields filled: False');
        if (!isExist(username)) {
            console.log('Username is empty');
        }
        if (!isExist(password)) {
            console.log('Password is empty');
        }

    }
};


async function getToken(username, password) {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/v1/auth/token/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });

        // Проверяем, был ли запрос успешным
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        // Извлекаем JSON-данные из ответа
        const data = await response.json();

        // Обрабатываем данные
        if (data.auth_token) {
            localStorage.setItem('token', data.auth_token);
        } else {
            alert('Ошибка авторизации');
        }
    } catch (error) {
        console.log('Ошибка:', error);
    }
}


function isExist(value) {
    return !(value === null || value === undefined || value === '');
}


document.getElementById('countryForm').addEventListener('submit', function (event) {
    event.preventDefault();

    let country = document.getElementById('countryName').value;
    console.log(country);
    let token = localStorage.getItem('token');
    if (token) {
        console.log(token);
    }

    fetch('http://127.0.0.1:8000/api/v1/countries/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Token ${token}`
        },
        body: JSON.stringify({
            name: country,
        })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка сети');
            }
            console.log(response.status);
            return response.json();
        })
        .then(result => {
            console.log(result);
        })
        .catch(error => {
            console.log('Ошибка:', error);
        });
})


document.addEventListener('DOMContentLoaded', function () {
    main();
})


// Главная страница
function main() {
    drawContainer('Здравствуйте! Это главная страница.');
    let contentBody = document.querySelector('.content__body');
    let par1 = document.createElement('p');
    let par2 = document.createElement('p');
    let par3 = document.createElement('p');
    par1.innerHTML = 'На данной странице могла бы размещаться новостная лента, слайдер и много еще чего... ';
    par2.innerHTML = 'Lorem ipsum, Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facilis autem porro corporis cupiditate earum quae voluptates possimus. ';
    par3.innerHTML = 'Lorem ipsum, Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facilis autem porro corporis cupiditate earum quae voluptates possimus. Accusantium omnis voluptatum tenetur, voluptas quidem praesentium facilis sequi incidunt consequuntur ipsa voluptate.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facilis autem porro corporis cupiditate earum quae voluptates possimus. Accusantium omnis voluptatum tenetur, voluptas quidem praesentium facilis sequi incidunt consequuntur ipsa voluptate.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facilis autem porro corporis cupiditate earum quae voluptates possimus. Accusantium omnis voluptatum tenetur, voluptas quidem praesentium facilis sequi incidunt consequuntur ipsa voluptate.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facilis autem porro corporis cupiditate earum quae voluptates possimus. Accusantium omnis voluptatum tenetur, voluptas quidem praesentium facilis sequi incidunt consequuntur ipsa voluptate.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facilis autem porro corporis cupiditate earum quae voluptates possimus. Accusantium omnis voluptatum tenetur, voluptas quidem praesentium facilis sequi incidunt consequuntur ipsa voluptate.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facilis autem porro corporis cupiditate earum quae voluptates possimus. Accusantium omnis voluptatum tenetur, voluptas quidem praesentium facilis sequi incidunt consequuntur ipsa voluptate.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facilis autem porro corporis cupiditate earum quae voluptates possimus. Accusantium omnis voluptatum tenetur, voluptas quidem praesentium facilis sequi incidunt consequuntur ipsa voluptate.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facilis autem porro corporis cupiditate earum quae voluptates possimus. Accusantium omnis voluptatum tenetur, voluptas quidem praesentium facilis sequi incidunt consequuntur ipsa voluptate.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facilis autem porro corporis cupiditate earum quae voluptates possimus. Accusantium omnis voluptatum tenetur, voluptas quidem praesentium facilis sequi incidunt consequuntur ipsa voluptate.';

    contentBody.append(par1);
    contentBody.append(par2);
    contentBody.append(par3);
}


// Слушатель на кнопку "Страны"
document.getElementById('countries').addEventListener('click', function () {
    showCountries()
})


// Функция "Покажи страны"
async function showCountries() {

    localStorage.removeItem('prevPage');

    let arr = await fetch('http://127.0.0.1:8000/api/v1/countries/', {
        method: 'GET'
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка сети');
            }
            console.log(response.status)
            return response.json();
        })
        .catch(error => {
            console.log('Ошибка:', error);
        });

    drawContainer("Страны - автопроизводители.");
    listToDraw(arr);

    document.querySelectorAll('.js__open__elem').forEach(function (item) {
        item.addEventListener('click', function (e) {
            e.preventDefault();

            localStorage.prevPage = JSON.stringify([{ 'name': "countries" }]);

            let countryId = this.getAttribute('data');
            countryDetail(countryId)
        });
    });
    buttonOfAdd('add__country', 'Добавить страну', 1);
    buttonBack();
}


// Функция получения данных конкретной страны
async function countryDetail(id) {
    let obj = await fetch('http://127.0.0.1:8000/api/v1/countries/' + id + '/', {
        method: 'GET'
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка сети');
            }
            console.log(response.status);
            return response.json();
        })
        .catch(error => {
            console.log('Ошибка:', error);
        });

    drawContainer("Производители (" + obj.name + ").");
    listToDraw(obj.producers);


    if (document.querySelectorAll('.container ul li').length === 0) {

        console.log('Список "' + obj.name + '" - пуст.');
        comeBack('производителей')
    }
    else {
        document.querySelectorAll('.js__open__elem').forEach(function (item) {
            item.addEventListener('click', function (e) {
                e.preventDefault();
                let prev = JSON.parse(localStorage.prevPage)
                console.log(prev)
                prev.push({ 'name': 'country', 'id': obj.id })
                console.log(prev)
                localStorage.prevPage = JSON.stringify(prev);

                let itemId = this.getAttribute('data');
                producerDetail(itemId)
            });
        });
    }
    buttonOfAdd('add__producer', 'Добавить производителя', 2);
    buttonBack();
}


// Слушатель на кнопку "Производители"
document.getElementById('producers').addEventListener('click', function () {
    showProducers()
})


// Функция "Покажи производителей авто"
async function showProducers() {

    localStorage.removeItem('prevPage');

    let arr = await fetch('http://127.0.0.1:8000/api/v1/producers/', {
        method: 'GET'
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка сети');
            }
            console.log(response.status)
            return response.json();
        })
        .catch(error => {
            console.log('Ошибка:', error);
        });

    drawContainer("Автопроизводители.");
    listToDraw(arr);

    document.querySelectorAll('.js__open__elem').forEach(function (item) {
        item.addEventListener('click', function (e) {
            e.preventDefault();

            localStorage.prevPage = JSON.stringify([{ 'name': 'producers' }]);

            let itemId = this.getAttribute('data');

            producerDetail(itemId);
        });
    });

    buttonOfAdd('add__producer', 'Добавить производителя', 2);
    buttonBack();
}


// Функция получения данных конкретного производителя
async function producerDetail(id) {

    let obj = await fetch('http://127.0.0.1:8000/api/v1/producers/' + id + '/', {
        method: 'GET'
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка сети');
            }
            console.log(response.status);
            return response.json();
        })
        .catch(error => {
            console.log('Ошибка:', error);
        });

    drawContainer("Производитель - " + obj.name + ".");
    listToDraw(obj.cars);

    if (document.querySelectorAll('.container ul li').length === 0) {

        comeBack('моделей (' + obj.name + ')');
    }
}


// Функция отрисовки контейнера 
//1ый аргумент - текст заголовка
function drawContainer(textOfTitle) {

    if (document.querySelector('.js__empty__elem')) {
        document.querySelector('.js__empty__elem').remove();
    };
    if (document.querySelector('.container .buttons-row')) {
        document.querySelector('.container .buttons-row').remove();
    };
    if (!document.querySelector('.container')) {
        let parant = document.querySelector('.content');
        let container = document.createElement('div');
        let title = document.createElement('h1');
        let contentBody = document.createElement('div');
        contentBody.className = 'content__body';

        title.className = 'title-1 title-center';
        container.className = 'container';

        container.append(title);
        container.append(contentBody);

        parant.append(container);
        title.innerHTML = textOfTitle;
    }
    else {
        listOfElems = document.querySelector('.container ul');
        document.querySelector('.container .title-1').innerHTML = textOfTitle;
        document.querySelector('.content__body').innerHTML = '';
    }
}


//Функция отрисовывает список эементов из массива
function listToDraw(arr) {
    let contentBody = document.querySelector('.content__body');
    let listOfElems = document.createElement('ul');

    contentBody.append(listOfElems);

    for (const elem of arr) {

        let elemOfList = document.createElement('li');
        let linkOfElem = document.createElement('a');

        linkOfElem.className = 'js__open__elem';
        linkOfElem.innerHTML = elem.name;
        linkOfElem.setAttribute('data', elem.id);
        linkOfElem.setAttribute('href', '#');

        elemOfList.append(linkOfElem);
        listOfElems.append(elemOfList);
    }
}


//функция добавляет кнопку "добавление элемента"
//1ый атрибут устанавливает id кнопки
//2ой - текст в кнопке
//3ий - атрибут устанавливает id модального окна в атрибут modal-data кнопки
function buttonOfAdd(btnId, text, modalId) {
    let container = document.querySelector('.container');
    let buttonsRow = document.createElement('div');
    let button = document.createElement('button');

    button.setAttribute('id', btnId);
    button.setAttribute('data-modal', modalId);
    button.className = 'button button--primary js__open__modal'
    button.innerHTML = text;

    buttonsRow.className = 'buttons-row buttons-right';
    buttonsRow.append(button);

    container.append(buttonsRow);
    button.addEventListener('click', function (event) {
        event.preventDefault();
        let modalElem = document.querySelector('.modal[data-modal="' + modalId + '"]');
        let overlay = document.querySelector('#overlay__modal');

        modalElem.classList.add('active');
        overlay.classList.add('active');
    });
}


//Функция добавляет фразу "Список {past} - пуст" и ссылку возврата на уровень выше
//1ый атрибут слово для фразы - "Список (кого-то) - пуст" 
function comeBack(past) {
    let arr = JSON.parse(localStorage.prevPage)
    let condition = arr.pop()
    console.log(condition)
    console.log(arr)
    let emptyElem = document.createElement('p');
    let contentBody = document.querySelector('.content__body');
    contentBody.innerHTML = ''
    let linkOfBack = document.createElement('a');

    contentBody.append(emptyElem);

    emptyElem.className = 'js__empty__elem';
    emptyElem.innerHTML = 'Список ' + past + ' - пуст.';
    emptyElem.append(linkOfBack);

    linkOfBack.setAttribute('href', '#');
    linkOfBack.className = 'js__link__back';
    linkOfBack.innerHTML = 'Вернуться назад.';

    linkOfBack.addEventListener('click', function (event) {

        localStorage.prevPage = JSON.stringify(arr)
        redirect(condition);
    })
}


//Функция кнопка "Назад"
function buttonBack() {
    let arr = [];
    let condition = '';
    if (localStorage.prevPage) {
        arr = JSON.parse(localStorage.prevPage);
        condition = arr.pop();
    }

    let buttonRow = document.querySelector('.buttons-row.buttons-right');
    let buttonBack = document.createElement('button');

    buttonBack.className = 'button';
    if (condition) {
        buttonBack.innerHTML = 'Назад';
    }
    else {
        buttonBack.innerHTML = 'На главную';
    }

    buttonRow.prepend(buttonBack);
    buttonBack.addEventListener('click', function () {

        localStorage.prevPage = JSON.stringify(arr);
        redirect(condition);
    })
}


//Функция перенаправляет на соответствующую страницу по условию
function redirect(condition) {
    if (condition.name === 'countries') {
        showCountries();
    }
    else if (condition.name === 'country') {
        countryDetail(condition.id);
    }
    else if (condition.name === 'producers') {
        showProducers();
    }
    // else if (condition.name === 'producer') {
    //     producerDetail(condition.id);
    // }
    else {
        main();
    };
}

// callback
// function rowOfButtons(a,b,c,callback) {
//     buttonOfAdd(a,b,c)
//     callback();
//   }